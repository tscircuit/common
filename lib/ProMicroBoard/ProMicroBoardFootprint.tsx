import React, { ReactElement } from "react"
import { SmtPadProps, PlatedHoleProps, HoleProps } from "@tscircuit/props"

const createSmtPad = (props: SmtPadProps): ReactElement =>
  React.createElement("smtpad", props as any)
const createPlatedHole = (props: PlatedHoleProps): ReactElement =>
  React.createElement("platedhole", props as any)
const createHole = (props: HoleProps): ReactElement =>
  React.createElement("hole", props as any)

interface ProMicroBoardFootprintProps {
  left?: number
  right?: number
  pitch?: number
  padLength?: number
  padWidth?: number
  variant?: "5V" | "3V3"
  withPlatedHoles?: boolean
}

export const ProMicroBoardFootprint: React.FC<ProMicroBoardFootprintProps> = ({
  left = 12,
  right = 12,
  pitch = 2.54,
  padLength = 1.8,
  padWidth = 1.2,
  variant,
  withPlatedHoles = false,
}) => {
  const leftRowX = -7.6
  const rightRowX = 7.6

  const pads: ReactElement[] = []
  let pinNumber = 1

  const yOffset = ((left - 1) / 2) * pitch
  for (let i = 0; i < left; i++) {
    if (withPlatedHoles) {
      pads.push(
        createPlatedHole({
          portHints: [`pin${pinNumber++}`],
          holeDiameter: 0.85,
          rectPadWidth: padWidth,
          rectPadHeight: padLength,
          pcbX: leftRowX,
          pcbY: yOffset - i * pitch,
          shape: "circular_hole_with_rect_pad",
        }),
      )
    } else {
      pads.push(
        createSmtPad({
          portHints: [`pin${pinNumber++}`],
          width: padWidth,
          height: padLength,
          pcbX: leftRowX,
          pcbY: yOffset - i * pitch,
          layer: "top",
          shape: "rect",
        }),
      )
    }
  }

  const yOffsetRight = ((right - 1) / 2) * pitch
  for (let i = 0; i < right; i++) {
    if (withPlatedHoles) {
      pads.push(
        createPlatedHole({
          portHints: [`${pinNumber++}`],
          holeDiameter: 0.85,
          rectPadWidth: padWidth,
          rectPadHeight: padLength,
          pcbX: rightRowX,
          pcbY: yOffsetRight - i * pitch,
          shape: "circular_hole_with_rect_pad",
        }),
      )
    } else {
      pads.push(
        createSmtPad({
          portHints: [`${pinNumber++}`],
          width: padWidth,
          height: padLength,
          pcbX: rightRowX,
          pcbY: yOffsetRight - i * pitch,
          layer: "top",
          shape: "rect",
        }),
      )
    }
  }

  return <footprint>{pads}</footprint>
}
