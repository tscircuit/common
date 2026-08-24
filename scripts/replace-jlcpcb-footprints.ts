import { readdir, readFile, writeFile } from "node:fs/promises"
import { basename, relative, resolve } from "node:path"
import { pathToFileURL } from "node:url"
import {
  circuitJsonToFootprinter,
  circuitJsonToFootprint,
  summarizeCopperComparison,
} from "circuit-json-to-footprinter"
import ts from "typescript"
import { Circuit } from "tscircuit"

const DEFAULT_MATCH_THRESHOLD = 0.95
const DEFAULT_SCAN_ROOT = "lib"

type ReactElementLike = {
  props?: Record<string, unknown> & {
    children?: unknown
    manufacturerPartNumber?: string
    supplierPartNumbers?: {
      jlcpcb?: string[]
    }
  }
  type?: unknown
}

type SourceCandidate = {
  filePath: string
  footprintEnd: number
  footprintIsString: boolean
  footprintStart: number
  jlcpcbPartNumbers: string[]
  line: number
  manufacturerPartNumber?: string
  originalFootprintInitializer: string
}

type Replacement = {
  candidate: SourceCandidate
  footprinterString: string
}

type CliOptions = {
  roots: string[]
  threshold: number
  write: boolean
}

const getPropertyName = (name: ts.PropertyName): string | undefined => {
  if (
    ts.isIdentifier(name) ||
    ts.isStringLiteral(name) ||
    ts.isNumericLiteral(name)
  ) {
    return name.text
  }

  return undefined
}

const getJsxAttribute = (
  openingElement: ts.JsxOpeningLikeElement,
  attributeName: string,
): ts.JsxAttribute | undefined => {
  for (const property of openingElement.attributes.properties) {
    if (
      ts.isJsxAttribute(property) &&
      property.name.getText() === attributeName
    ) {
      return property
    }
  }

  return undefined
}

const getAttributeExpression = (
  attribute: ts.JsxAttribute,
): ts.Expression | undefined => {
  const initializer = attribute.initializer

  if (!initializer) return undefined
  if (ts.isJsxExpression(initializer)) return initializer.expression
  if (ts.isStringLiteral(initializer)) return initializer

  return undefined
}

const getStringAttributeValue = (
  attribute: ts.JsxAttribute | undefined,
): string | undefined => {
  if (!attribute) return undefined

  const expression = getAttributeExpression(attribute)
  return expression && ts.isStringLiteralLike(expression)
    ? expression.text
    : undefined
}

const getJlcpcbPartNumbers = (
  attribute: ts.JsxAttribute,
): string[] | undefined => {
  const expression = getAttributeExpression(attribute)
  if (!expression || !ts.isObjectLiteralExpression(expression)) return undefined

  for (const property of expression.properties) {
    if (
      !ts.isPropertyAssignment(property) ||
      getPropertyName(property.name) !== "jlcpcb"
    ) {
      continue
    }

    const value = property.initializer
    const partNumbers = ts.isArrayLiteralExpression(value)
      ? value.elements
          .filter(ts.isStringLiteralLike)
          .map((element) => element.text)
      : ts.isStringLiteralLike(value)
        ? [value.text]
        : []

    return partNumbers.filter((partNumber) => /^C\d+$/.test(partNumber))
  }

  return undefined
}

export const findJlcpcbFootprintCandidates = (
  filePath: string,
  sourceText: string,
): SourceCandidate[] => {
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )
  const candidates: SourceCandidate[] = []

  const visit = (node: ts.Node) => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const supplierAttribute = getJsxAttribute(node, "supplierPartNumbers")
      const footprintAttribute = getJsxAttribute(node, "footprint")

      if (supplierAttribute && footprintAttribute?.initializer) {
        const jlcpcbPartNumbers = getJlcpcbPartNumbers(supplierAttribute)

        if (jlcpcbPartNumbers?.length) {
          const initializer = footprintAttribute.initializer
          const position = sourceFile.getLineAndCharacterOfPosition(
            footprintAttribute.getStart(sourceFile),
          )

          candidates.push({
            filePath,
            footprintEnd: initializer.getEnd(),
            footprintIsString:
              ts.isStringLiteral(initializer) ||
              (ts.isJsxExpression(initializer) &&
                !!initializer.expression &&
                ts.isStringLiteralLike(initializer.expression)),
            footprintStart: initializer.getStart(sourceFile),
            jlcpcbPartNumbers,
            line: position.line + 1,
            manufacturerPartNumber: getStringAttributeValue(
              getJsxAttribute(node, "manufacturerPartNumber"),
            ),
            originalFootprintInitializer: sourceText.slice(
              initializer.getStart(sourceFile),
              initializer.getEnd(),
            ),
          })
        }
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return candidates
}

const listTsxFiles = async (directory: string): Promise<string[]> => {
  const entries = await readdir(directory, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    if (
      entry.name === "node_modules" ||
      entry.name === "dist" ||
      entry.name === "__snapshots__"
    ) {
      continue
    }

    const entryPath = resolve(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await listTsxFiles(entryPath)))
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      files.push(entryPath)
    }
  }

  return files.sort()
}

const isReactElementLike = (value: unknown): value is ReactElementLike =>
  typeof value === "object" && value !== null && "type" in value

const collectJlcpcbElements = (
  value: unknown,
  elements: ReactElementLike[],
  depth = 0,
) => {
  if (depth > 20 || value === null || value === undefined) return

  if (Array.isArray(value)) {
    for (const child of value) collectJlcpcbElements(child, elements, depth + 1)
    return
  }

  if (!isReactElementLike(value)) return

  const partNumbers = value.props?.supplierPartNumbers?.jlcpcb
  if (partNumbers?.some((partNumber) => /^C\d+$/.test(partNumber))) {
    elements.push(value)
  }

  if (typeof value.type === "function") {
    try {
      collectJlcpcbElements(value.type(value.props ?? {}), elements, depth + 1)
    } catch {
      // Some exported React components require context or specialized props.
    }
  }

  collectJlcpcbElements(value.props?.children, elements, depth + 1)
}

const loadJlcpcbElements = async (
  filePath: string,
): Promise<ReactElementLike[]> => {
  const moduleUrl = `${pathToFileURL(filePath).href}?footprint-check=${Date.now()}`
  const moduleExports = await import(moduleUrl)
  const elements: ReactElementLike[] = []

  for (const exportedValue of Object.values(moduleExports)) {
    if (typeof exportedValue !== "function") continue

    try {
      collectJlcpcbElements(
        exportedValue({ name: "__JLCPCB_FOOTPRINT_CHECK__" }),
        elements,
      )
    } catch {
      // Non-component exports and components with required custom props are
      // ignored here; a missing runtime component is reported to the caller.
    }
  }

  return elements
}

const findElementForCandidate = (
  elements: ReactElementLike[],
  candidate: SourceCandidate,
): ReactElementLike | undefined =>
  elements.find((element) =>
    element.props?.supplierPartNumbers?.jlcpcb?.some((partNumber) =>
      candidate.jlcpcbPartNumbers.includes(partNumber),
    ),
  )

const getCircuitJsonForElement = async (element: ReactElementLike) => {
  const circuit = new Circuit()
  circuit.add(element as any)
  await circuit.renderUntilSettled()
  return circuit.getCircuitJson()
}

const withFootprinterString = (
  element: ReactElementLike,
  footprinterString: string,
): ReactElementLike => ({
  ...element,
  props: {
    ...element.props,
    footprint: footprinterString,
  },
})

const getCircuitErrors = (circuitJson: readonly { type: string }[]) =>
  circuitJson.filter(
    (element) =>
      typeof element.type === "string" && element.type.endsWith("_error"),
  )

const getPadCount = (circuitJson: readonly { type: string }[]) =>
  circuitJson.filter(
    (element) =>
      element.type === "pcb_smtpad" || element.type === "pcb_plated_hole",
  ).length

const asFootprinterCircuitJson = (
  circuitJson: unknown,
): Parameters<typeof circuitJsonToFootprinter>[0] =>
  circuitJson as Parameters<typeof circuitJsonToFootprinter>[0]

export const getFootprintMatchScore = (candidate: {
  copperIntersectionOverUnion: number
  holeIntersectionOverUnion: number
}): number =>
  Math.min(
    candidate.copperIntersectionOverUnion,
    candidate.holeIntersectionOverUnion,
  )

const percentage = (score: number) => `${(score * 100).toFixed(2)}%`

const parseCliOptions = (args: string[]): CliOptions => {
  let threshold = DEFAULT_MATCH_THRESHOLD
  let write = false
  const roots: string[] = []

  for (const argument of args) {
    if (argument === "--write") {
      write = true
    } else if (argument.startsWith("--threshold=")) {
      threshold = Number(argument.slice("--threshold=".length))
    } else if (!argument.startsWith("--")) {
      roots.push(argument)
    }
  }

  if (!Number.isFinite(threshold) || threshold < 0 || threshold > 1) {
    throw new Error("--threshold must be a number from 0 to 1")
  }

  return {
    roots: roots.length ? roots : [DEFAULT_SCAN_ROOT],
    threshold,
    write,
  }
}

const applyReplacements = async (replacements: Replacement[]) => {
  const replacementsByFile = new Map<string, Replacement[]>()

  for (const replacement of replacements) {
    const fileReplacements =
      replacementsByFile.get(replacement.candidate.filePath) ?? []
    fileReplacements.push(replacement)
    replacementsByFile.set(replacement.candidate.filePath, fileReplacements)
  }

  for (const [filePath, fileReplacements] of replacementsByFile) {
    let sourceText = await readFile(filePath, "utf8")

    for (const replacement of fileReplacements.sort(
      (left, right) =>
        right.candidate.footprintStart - left.candidate.footprintStart,
    )) {
      const { candidate, footprinterString } = replacement
      const currentInitializer = sourceText.slice(
        candidate.footprintStart,
        candidate.footprintEnd,
      )

      if (currentInitializer !== candidate.originalFootprintInitializer) {
        throw new Error(
          `Refusing to rewrite ${filePath}:${candidate.line}; the source changed during the scan`,
        )
      }

      sourceText =
        sourceText.slice(0, candidate.footprintStart) +
        JSON.stringify(footprinterString) +
        sourceText.slice(candidate.footprintEnd)
    }

    await writeFile(filePath, sourceText)
  }
}

export const run = async (args = process.argv.slice(2)) => {
  const options = parseCliOptions(args)
  const cwd = process.cwd()
  const sourceCandidates: SourceCandidate[] = []

  for (const root of options.roots) {
    for (const filePath of await listTsxFiles(resolve(cwd, root))) {
      const sourceText = await readFile(filePath, "utf8")
      sourceCandidates.push(
        ...findJlcpcbFootprintCandidates(filePath, sourceText),
      )
    }
  }

  const candidatesByFile = new Map<string, SourceCandidate[]>()
  for (const candidate of sourceCandidates) {
    const fileCandidates = candidatesByFile.get(candidate.filePath) ?? []
    fileCandidates.push(candidate)
    candidatesByFile.set(candidate.filePath, fileCandidates)
  }

  const replacements: Replacement[] = []
  let errors = 0
  let customFootprints = 0

  for (const [filePath, fileCandidates] of candidatesByFile) {
    let elements: ReactElementLike[]

    try {
      elements = await loadJlcpcbElements(filePath)
    } catch (error) {
      console.error(
        `ERROR ${relative(cwd, filePath)}: failed to import component module`,
        error,
      )
      errors += fileCandidates.length
      continue
    }

    for (const candidate of fileCandidates) {
      const location = `${relative(cwd, candidate.filePath)}:${candidate.line}`
      const partLabel = candidate.jlcpcbPartNumbers.join(",")
      const element = findElementForCandidate(elements, candidate)

      if (!element) {
        console.error(
          `ERROR ${partLabel} ${location}: could not resolve the component at runtime`,
        )
        errors += 1
        continue
      }

      try {
        const circuitJson = await getCircuitJsonForElement(element)
        const originalPadCount = getPadCount(circuitJson)
        const originalErrorCount = getCircuitErrors(circuitJson).length

        if (originalPadCount === 0) {
          console.error(
            `ERROR ${partLabel} ${location}: the current footprint renders no PCB pads or plated holes`,
          )
          errors += 1
          continue
        }

        if (candidate.footprintIsString && originalErrorCount > 0) {
          console.error(
            `ERROR ${partLabel} ${location}: the current footprint renders ${originalErrorCount} circuit error${originalErrorCount === 1 ? "" : "s"}`,
          )
          errors += 1
          continue
        }

        const result = circuitJsonToFootprinter(
          asFootprinterCircuitJson(circuitJson),
          {
            maxCandidates: 5,
            sourceHints: [
              ...(candidate.manufacturerPartNumber
                ? [candidate.manufacturerPartNumber]
                : []),
              ...candidate.jlcpcbPartNumbers,
              basename(candidate.filePath, ".tsx"),
            ],
          },
        )
        const best = result.best

        if (!best) {
          console.log(`KEEP  ${partLabel} ${location}: no footprinter match`)
          continue
        }

        const matchScore = getFootprintMatchScore(best)
        const scoreDetails = `match=${percentage(matchScore)} copper=${percentage(best.copperIntersectionOverUnion)} holes=${percentage(best.holeIntersectionOverUnion)}`

        if (candidate.footprintIsString) {
          console.log(
            `OK    ${partLabel} ${location}: already a string; ${scoreDetails}`,
          )
          continue
        }

        customFootprints += 1

        if (matchScore < options.threshold) {
          console.log(
            `KEEP  ${partLabel} ${location}: ${scoreDetails}; best="${best.footprinterString}"`,
          )
          continue
        }

        const replacementCircuitJson = await getCircuitJsonForElement(
          withFootprinterString(element, best.footprinterString),
        )
        const replacementPadCount = getPadCount(replacementCircuitJson)
        const addedErrorCount = Math.max(
          0,
          getCircuitErrors(replacementCircuitJson).length - originalErrorCount,
        )

        if (replacementPadCount === 0 || addedErrorCount > 0) {
          console.log(
            `KEEP  ${partLabel} ${location}: generated string is not supported cleanly by this repo's tscircuit runtime (${replacementPadCount} pads, ${addedErrorCount} added errors); best="${best.footprinterString}"`,
          )
          continue
        }

        const runtimeComparison = summarizeCopperComparison(
          result.target,
          circuitJsonToFootprint(
            asFootprinterCircuitJson(replacementCircuitJson),
          ),
        )
        const runtimeMatchScore = getFootprintMatchScore(runtimeComparison)
        const runtimeScoreDetails = `runtime-match=${percentage(runtimeMatchScore)} copper=${percentage(runtimeComparison.copperIntersectionOverUnion)} holes=${percentage(runtimeComparison.holeIntersectionOverUnion)}`

        if (runtimeMatchScore < options.threshold) {
          console.log(
            `KEEP  ${partLabel} ${location}: ${runtimeScoreDetails}; generated string differs under this repo's tscircuit runtime; best="${best.footprinterString}"`,
          )
          continue
        }

        replacements.push({
          candidate,
          footprinterString: best.footprinterString,
        })
        console.log(
          `${options.write ? "WRITE" : "MATCH"} ${partLabel} ${location}: ${runtimeScoreDetails}; footprint="${best.footprinterString}"`,
        )
      } catch (error) {
        console.error(`ERROR ${partLabel} ${location}:`, error)
        errors += 1
      }
    }
  }

  if (options.write) await applyReplacements(replacements)

  console.log("")
  console.log(
    `Scanned ${sourceCandidates.length} JLCPCB component${sourceCandidates.length === 1 ? "" : "s"}; ` +
      `${customFootprints} custom footprint${customFootprints === 1 ? "" : "s"}; ` +
      `${replacements.length} ${options.write ? "replaced" : "eligible at or above"} ${percentage(options.threshold)}; ` +
      `${errors} error${errors === 1 ? "" : "s"}.`,
  )

  if (!options.write && replacements.length) {
    console.log("Run again with --write to apply the eligible replacements.")
  }

  if (errors) process.exitCode = 1
}

if (import.meta.main) {
  run().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}
