import React, { ReactElement } from "react"
import type {
  PlatedHoleProps,
  SmtPadProps,
  SilkscreenPathProps,
  SilkscreenTextProps,
} from "@tscircuit/props"
import type { StampBoardGeometry } from "./stampGeometry"

const createSmtPad = (props: SmtPadProps & { key?: React.Key }): ReactElement =>
  React.createElement("smtpad", props as any)

const createPlatedHole = (
  props: PlatedHoleProps & { key?: React.Key },
): ReactElement => React.createElement("platedhole", props as any)

const createSilkscreenPath = (
  props: SilkscreenPathProps & { key?: React.Key },
): ReactElement => React.createElement("silkscreenpath", props as any)

const createSilkscreenText = (
  props: SilkscreenTextProps & { key?: React.Key },
): ReactElement => React.createElement("silkscreentext", props as any)

export interface StampBoardFootprintProps {
  geometry: StampBoardGeometry
  includeOutline?: boolean
  includeTriangle?: boolean
  includeReference?: boolean
  includeLabels?: boolean
  innerHoleDiameter?: number
}

export const StampBoardFootprint: React.FC<StampBoardFootprintProps> = ({
  geometry,
  includeOutline = true,
  includeTriangle = true,
  includeReference = true,
  includeLabels,
  innerHoleDiameter = 1,
}) => {
  const {
    pads,
    innerHoles,
    labels,
    triangleRoutePoints,
    outline,
    boardHeight,
    labelFontSize,
    referenceText,
    padWidth: padWidthMm,
    padLength: padLengthMm,
    showSilkscreenLabels,
  } = geometry

  const footprintChildren: ReactElement[] = []

  for (const pad of pads) {
    const width =
      pad.side === "left" || pad.side === "right"
        ? `${padLengthMm}mm`
        : `${padWidthMm}mm`
    const height =
      pad.side === "left" || pad.side === "right"
        ? `${padWidthMm}mm`
        : `${padLengthMm}mm`

    footprintChildren.push(
      createSmtPad({
        key: `pad-${pad.index}`,
        portHints: [`pin${pad.index}`],
        pcbX: pad.pcbX,
        pcbY: pad.pcbY,
        width,
        height,
        shape: "rect",
        layer: "top",
      } as any),
    )
  }

  for (let i = 0; i < innerHoles.length; i++) {
    const hole = innerHoles[i]
    footprintChildren.push(
      createPlatedHole({
        key: `hole-${i}`,
        pcbX: hole.pcbX,
        pcbY: hole.pcbY,
        holeDiameter: `${innerHoleDiameter}mm`,
        outerDiameter: `${innerHoleDiameter}mm`,
        shape: "circle",
      } as any),
    )
  }

  const shouldIncludeLabels = includeLabels ?? showSilkscreenLabels

  if (shouldIncludeLabels) {
    for (const label of labels) {
      footprintChildren.push(
        createSilkscreenText({
          key: `label-${label.index}`,
          text: label.text,
          pcbX: label.pcbX,
          pcbY: label.pcbY,
          fontSize: labelFontSize,
          rotation: label.rotation,
          layer: "top",
        } as any),
      )
    }
  }

  if (includeOutline) {
    footprintChildren.push(
      createSilkscreenPath({
        key: "outline",
        route: outline,
        strokeWidth: 0.1,
        layer: "top",
      } as any),
    )
  }

  if (includeTriangle && triangleRoutePoints) {
    footprintChildren.push(
      createSilkscreenPath({
        key: "triangle",
        route: triangleRoutePoints,
        strokeWidth: 0.1,
        layer: "top",
      } as any),
    )
  }

  if (includeReference) {
    footprintChildren.push(
      createSilkscreenText({
        key: "reference",
        text: referenceText,
        pcbX: 0,
        pcbY: boardHeight / 2 - boardHeight / 10,
        fontSize: boardHeight / 25,
        layer: "top",
      } as any),
    )
  }

  return React.createElement("footprint", null, ...footprintChildren)
}
