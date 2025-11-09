import type { ChipProps } from "@tscircuit/props"
import { StampBoardFootprint } from "./StampBoardFootprint"
import {
  buildSchematicPinArrangement,
  generateStampBoardGeometry,
  type StampBoardOptions,
} from "./stampGeometry"

export type StampReceiverProps = ChipProps &
  StampBoardOptions & {
    includeOutline?: boolean
    includeTriangle?: boolean
    includeReference?: boolean
    includeLabels?: boolean
  }

export const StampReceiver = ({
  includeOutline = false,
  includeTriangle = false,
  includeReference = false,
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
  ...chipProps
}: StampReceiverProps) => {
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

  return (
    <chip
      {...chipProps}
      pinLabels={geometry.padLabelMap}
      schPinArrangement={schematicArrangement}
      schWidth={2.5}
      footprint={
        <StampBoardFootprint
          geometry={geometry}
          includeOutline={includeOutline}
          includeTriangle={includeTriangle}
          includeReference={includeReference}
          includeLabels={includeLabels}
        />
      }
    />
  )
}
