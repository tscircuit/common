import type { SchematicPinArrangement } from "@tscircuit/props"

export type StampBoardSide = "left" | "right" | "top" | "bottom"

export interface StampBoardOptions {
  boardWidth?: number | string
  boardHeight?: number | string
  leftPins?: number
  rightPins?: number
  topPins?: number
  bottomPins?: number
  pitch?: number | string
  padWidth?: number | string
  padLength?: number | string
  includeInnerHoles?: boolean
  innerHoleEdgeDistance?: number | string
  showSilkscreenLabels?: boolean
  silkscreenLabelMargin?: number | string
  labelFormatter?: (pinIndex: number) => string
  referenceText?: string
}

export interface StampPad {
  index: number
  side: StampBoardSide
  pcbX: number
  pcbY: number
}

export interface StampHole {
  pcbX: number
  pcbY: number
}

export interface StampLabelPlacement {
  index: number
  text: string
  pcbX: number
  pcbY: number
  rotation?: number
}

export interface StampBoardGeometry {
  boardWidth: number
  boardHeight: number
  pads: StampPad[]
  innerHoles: StampHole[]
  labels: StampLabelPlacement[]
  outline: { x: number; y: number }[]
  triangleRoutePoints: { x: number; y: number }[] | null
  padLabelMap: Record<string, string>
  sidePinOrder: Record<StampBoardSide, string[]>
  labelFontSize: number
  labelMargin: number
  referenceText: string
  totalPins: number
  padWidth: number
  padLength: number
  showSilkscreenLabels: boolean
  includeInnerHoles: boolean
}

const DEFAULTS = {
  boardWidth: 22.58,
  leftPins: 20,
  rightPins: 20,
  topPins: 2,
  bottomPins: 2,
  pitch: 2.54,
  padWidth: 1.6,
  padLength: 2.4,
  includeInnerHoles: false,
  innerHoleEdgeDistance: 1.61,
  showSilkscreenLabels: false,
  silkscreenLabelMargin: 0.1,
  referenceText: "REF**",
} satisfies Required<Omit<StampBoardOptions, "boardHeight" | "labelFormatter">>

const parseDimension = (
  value: number | string | undefined,
  fallback: number,
) => {
  if (value === undefined) return fallback
  if (typeof value === "number") return value
  const trimmed = value.trim().toLowerCase()
  if (trimmed.endsWith("mm")) {
    const parsed = Number(trimmed.replace("mm", ""))
    return Number.isFinite(parsed) ? parsed : fallback
  }
  const parsed = Number(trimmed)
  return Number.isFinite(parsed) ? parsed : fallback
}

const getTriangleRoute = (
  x: number,
  y: number,
  side: StampBoardSide,
): { x: number; y: number }[] => {
  const triangleHeight = 1
  const triangleWidth = 0.6

  switch (side) {
    case "right":
      return [
        { x: x + triangleHeight / 2, y },
        { x: x - triangleHeight / 2, y: y + triangleWidth / 2 },
        { x: x - triangleHeight / 2, y: y - triangleWidth / 2 },
        { x: x + triangleHeight / 2, y },
      ]
    case "left":
      return [
        { x: x - triangleHeight / 2, y },
        { x: x + triangleHeight / 2, y: y + triangleWidth / 2 },
        { x: x + triangleHeight / 2, y: y - triangleWidth / 2 },
        { x: x - triangleHeight / 2, y },
      ]
    case "top":
      return [
        { x, y: y + triangleHeight / 2 },
        { x: x - triangleWidth / 2, y: y - triangleHeight / 2 },
        { x: x + triangleWidth / 2, y: y - triangleHeight / 2 },
        { x, y: y + triangleHeight / 2 },
      ]
    case "bottom":
      return [
        { x, y: y - triangleHeight / 2 },
        { x: x - triangleWidth / 2, y: y + triangleHeight / 2 },
        { x: x + triangleWidth / 2, y: y + triangleHeight / 2 },
        { x, y: y - triangleHeight / 2 },
      ]
    default:
      return []
  }
}

const resolveBoardHeight = (
  maybeHeight: number | string | undefined,
  leftPins: number,
  rightPins: number,
  pitch: number,
) => {
  if (maybeHeight !== undefined) {
    return parseDimension(maybeHeight, DEFAULTS.boardWidth)
  }
  if (leftPins && rightPins) {
    return Math.max(leftPins, rightPins) * pitch
  }
  if (leftPins) {
    return leftPins * pitch
  }
  if (rightPins) {
    return rightPins * pitch
  }
  return 51
}

const determineFirstPadSide = (
  left: number,
  bottom: number,
  right: number,
  top: number,
): StampBoardSide | undefined => {
  if (left > 0) return "left"
  if (bottom > 0) return "bottom"
  if (right > 0) return "right"
  if (top > 0) return "top"
  return undefined
}

export const generateStampBoardGeometry = (
  options: StampBoardOptions = {},
): StampBoardGeometry => {
  const boardWidth = parseDimension(options.boardWidth, DEFAULTS.boardWidth)
  const leftPins = options.leftPins ?? DEFAULTS.leftPins
  const rightPins = options.rightPins ?? DEFAULTS.rightPins
  const topPins = options.topPins ?? DEFAULTS.topPins
  const bottomPins = options.bottomPins ?? DEFAULTS.bottomPins
  const pitch = parseDimension(options.pitch, DEFAULTS.pitch)
  const padWidth = parseDimension(options.padWidth, DEFAULTS.padWidth)
  const padLength = parseDimension(options.padLength, DEFAULTS.padLength)
  const includeInnerHoles =
    options.includeInnerHoles ?? DEFAULTS.includeInnerHoles
  const innerHoleEdgeDistance = parseDimension(
    options.innerHoleEdgeDistance,
    DEFAULTS.innerHoleEdgeDistance,
  )
  const showSilkscreenLabels =
    options.showSilkscreenLabels ?? DEFAULTS.showSilkscreenLabels
  const silkscreenLabelMargin = parseDimension(
    options.silkscreenLabelMargin,
    DEFAULTS.silkscreenLabelMargin,
  )
  const labelFormatter = options.labelFormatter ?? ((i: number) => `pin${i}`)
  const referenceText = options.referenceText ?? DEFAULTS.referenceText

  const boardHeight = resolveBoardHeight(
    options.boardHeight,
    leftPins,
    rightPins,
    pitch,
  )

  const totalPins = leftPins + rightPins + topPins + bottomPins
  const labels = Array.from({ length: totalPins }, (_, index) =>
    labelFormatter(index + 1),
  )
  const maxLabelLength = labels.reduce(
    (max, label) => Math.max(max, label.length),
    0,
  )
  const labelFontSize = 0.7
  const approxCharWidth = 0.7
  const textHalf = (maxLabelLength * approxCharWidth) / 2

  const pads: StampPad[] = []
  const innerHolesAcc: StampHole[] = []
  const labelPlacements: StampLabelPlacement[] = []
  const sidePinOrder: Record<StampBoardSide, string[]> = {
    left: [],
    right: [],
    top: [],
    bottom: [],
  }
  const padLabelMap: Record<string, string> = {}

  let triangleRoutePoints: { x: number; y: number }[] | null = null
  const firstPadSide = determineFirstPadSide(
    leftPins,
    bottomPins,
    rightPins,
    topPins,
  )

  const pushPad = (
    index: number,
    side: StampBoardSide,
    pcbX: number,
    pcbY: number,
  ) => {
    pads.push({ index, side, pcbX, pcbY })
    const label = labels[index - 1]
    padLabelMap[`pin${index}`] = label
    sidePinOrder[side].push(label)
  }

  let currentIndex = 1

  if (leftPins > 0) {
    const yOffset = ((leftPins - 1) / 2) * pitch
    for (let i = 0; i < leftPins; i++) {
      const pcbY = yOffset - i * pitch
      const pcbX = -boardWidth / 2 + padLength / 2
      pushPad(currentIndex, "left", pcbX, pcbY)

      if (showSilkscreenLabels) {
        labelPlacements.push({
          index: currentIndex,
          text: labels[currentIndex - 1],
          pcbX:
            -boardWidth / 2 + padLength + (textHalf + silkscreenLabelMargin),
          pcbY,
        })
      } else if (!triangleRoutePoints && firstPadSide === "left") {
        triangleRoutePoints = getTriangleRoute(
          -boardWidth / 2 + padLength * 1.4,
          pcbY,
          "left",
        )
      }

      if (includeInnerHoles) {
        innerHolesAcc.push(
          { pcbX: -boardWidth / 2, pcbY },
          {
            pcbX: -boardWidth / 2 + innerHoleEdgeDistance,
            pcbY,
          },
        )
      }
      currentIndex += 1
    }
  }

  if (bottomPins > 0) {
    const xOffset = -((bottomPins - 1) / 2) * pitch
    for (let i = 0; i < bottomPins; i++) {
      const pcbX = xOffset + i * pitch
      const pcbY = -boardHeight / 2 + padLength / 2
      pushPad(currentIndex, "bottom", pcbX, pcbY)

      if (showSilkscreenLabels) {
        labelPlacements.push({
          index: currentIndex,
          text: labels[currentIndex - 1],
          pcbX,
          pcbY:
            -boardHeight / 2 + padLength + (textHalf + silkscreenLabelMargin),
          rotation: 90,
        })
      } else if (!triangleRoutePoints && firstPadSide === "bottom") {
        triangleRoutePoints = getTriangleRoute(
          pcbX,
          -boardHeight / 2 + padLength * 1.4,
          "bottom",
        )
      }

      if (includeInnerHoles) {
        innerHolesAcc.push(
          { pcbX, pcbY: -boardHeight / 2 },
          {
            pcbX,
            pcbY: -boardHeight / 2 + innerHoleEdgeDistance,
          },
        )
      }
      currentIndex += 1
    }
  }

  if (rightPins > 0) {
    const yOffset = -((rightPins - 1) / 2) * pitch
    for (let i = 0; i < rightPins; i++) {
      const pcbY = yOffset + i * pitch
      const pcbX = boardWidth / 2 - padLength / 2
      pushPad(currentIndex, "right", pcbX, pcbY)

      if (showSilkscreenLabels) {
        labelPlacements.push({
          index: currentIndex,
          text: labels[currentIndex - 1],
          pcbX: boardWidth / 2 - padLength - (textHalf + silkscreenLabelMargin),
          pcbY,
        })
      } else if (!triangleRoutePoints && firstPadSide === "right") {
        triangleRoutePoints = getTriangleRoute(
          boardWidth / 2 - padLength * 1.4,
          pcbY,
          "right",
        )
      }

      if (includeInnerHoles) {
        innerHolesAcc.push(
          { pcbX: boardWidth / 2, pcbY },
          {
            pcbX: boardWidth / 2 - innerHoleEdgeDistance,
            pcbY,
          },
        )
      }
      currentIndex += 1
    }
  }

  if (topPins > 0) {
    const xOffset = ((topPins - 1) / 2) * pitch
    for (let i = 0; i < topPins; i++) {
      const pcbX = xOffset - i * pitch
      const pcbY = boardHeight / 2 - padLength / 2
      pushPad(currentIndex, "top", pcbX, pcbY)

      if (showSilkscreenLabels) {
        labelPlacements.push({
          index: currentIndex,
          text: labels[currentIndex - 1],
          pcbX,
          pcbY:
            boardHeight / 2 - padLength - (textHalf + silkscreenLabelMargin),
          rotation: 270,
        })
      } else if (!triangleRoutePoints && firstPadSide === "top") {
        triangleRoutePoints = getTriangleRoute(
          pcbX,
          boardHeight / 2 - padLength * 1.4,
          "top",
        )
      }

      if (includeInnerHoles) {
        innerHolesAcc.push(
          { pcbX, pcbY: boardHeight / 2 },
          {
            pcbX,
            pcbY: boardHeight / 2 - innerHoleEdgeDistance,
          },
        )
      }
      currentIndex += 1
    }
  }

  const outline = [
    { x: -boardWidth / 2, y: boardHeight / 2 },
    { x: boardWidth / 2, y: boardHeight / 2 },
    { x: boardWidth / 2, y: -boardHeight / 2 },
    { x: -boardWidth / 2, y: -boardHeight / 2 },
    { x: -boardWidth / 2, y: boardHeight / 2 },
  ]

  return {
    boardWidth,
    boardHeight,
    pads,
    innerHoles: innerHolesAcc,
    labels: labelPlacements,
    outline,
    triangleRoutePoints,
    padLabelMap,
    sidePinOrder,
    labelFontSize,
    labelMargin: silkscreenLabelMargin,
    referenceText,
    totalPins,
    padWidth,
    padLength,
    showSilkscreenLabels,
    includeInnerHoles,
  }
}

export const buildSchematicPinArrangement = (
  geometry: StampBoardGeometry,
): SchematicPinArrangement | undefined => {
  const { sidePinOrder } = geometry

  return {
    leftSide: sidePinOrder.left.length
      ? { direction: "top-to-bottom", pins: sidePinOrder.left }
      : undefined,
    rightSide: sidePinOrder.right.length
      ? { direction: "top-to-bottom", pins: sidePinOrder.right }
      : undefined,
    topSide: sidePinOrder.top.length
      ? { direction: "left-to-right", pins: sidePinOrder.top }
      : undefined,
    bottomSide: sidePinOrder.bottom.length
      ? { direction: "left-to-right", pins: sidePinOrder.bottom }
      : undefined,
  } as SchematicPinArrangement
}
