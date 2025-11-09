import { splitBoardAndChipProps } from "../../util/splitBoardAndChipProps"
import type { BoardProps, ChipProps } from "@tscircuit/props"
import { StampBoardFootprint } from "./StampBoardFootprint"
import {
  buildSchematicPinArrangement,
  generateStampBoardGeometry,
  type StampBoardOptions,
} from "./stampGeometry"

export type StampBoardProps = ChipProps &
  BoardProps &
  StampBoardOptions & {
    children?: any
    boardName?: string
    includeOutline?: boolean
    includeTriangle?: boolean
    includeReference?: boolean
    includeLabels?: boolean
  }

export const StampBoard = ({
  children,
  includeOutline,
  includeTriangle,
  includeReference,
  includeLabels,
  boardWidth,
  boardHeight,
  leftPins,
  rightPins,
  topPins,
  bottomPins,
  pitch,
  padWidth,
  padLength,
  includeInnerHoles,
  innerHoleEdgeDistance,
  showSilkscreenLabels,
  silkscreenLabelMargin,
  labelFormatter,
  referenceText,
  ...componentProps
}: StampBoardProps) => {
  const { boardProps, chipProps = {} } = splitBoardAndChipProps({
    ...componentProps,
  }) as {
    boardProps: Record<string, any>
    chipProps: Record<string, any>
  }

  const geometry = generateStampBoardGeometry({
    boardWidth,
    boardHeight,
    leftPins,
    rightPins,
    topPins,
    bottomPins,
    pitch,
    padWidth,
    padLength,
    includeInnerHoles,
    innerHoleEdgeDistance,
    showSilkscreenLabels,
    silkscreenLabelMargin,
    labelFormatter,
    referenceText,
  })
  const schematicArrangement = buildSchematicPinArrangement(geometry)

  const boardOutlinePoints = geometry.outline.map((point) => ({
    x: point.x,
    y: point.y,
  }))

  const { name: chipName, ...chipRest } = chipProps
  const resolvedName = chipName ?? "STAMPBOARD"

  const { outline: customOutline, ...boardRest } = boardProps
  const outlineToUse = customOutline ?? boardOutlinePoints

  return (
    <board {...boardRest} outline={outlineToUse}>
      <chip
        {...chipRest}
        name={resolvedName}
        doNotPlace
        pinLabels={geometry.padLabelMap}
        footprint={
          <StampBoardFootprint
            geometry={geometry}
            includeOutline={includeOutline}
            includeTriangle={includeTriangle}
            includeReference={includeReference}
            includeLabels={includeLabels}
          />
        }
        schWidth={2.5}
        schPinArrangement={schematicArrangement}
      />
      {children}
    </board>
  )
}
