import React, { ReactElement } from "react"
import { PlatedHoleProps } from "@tscircuit/props"

const createPlatedHole = (props: PlatedHoleProps): ReactElement =>
  React.createElement("platedhole", props as any)

interface ProMicroBoardFootprintProps {
  left?: number
  right?: number
  pitch?: number
  variant?: "5V" | "3V3"
}

export const ProMicroBoardFootprint: React.FC<ProMicroBoardFootprintProps> = ({
  left = 12,
  right = 12,
  pitch = 2.54,
  variant,
}) => {
  const leftRowX = -7.6
  const rightRowX = 7.6

  const pads: ReactElement[] = []
  let pinNumber = 1

  const yOffset = ((left - 1) / 2) * pitch
  for (let i = 0; i < left; i++) {
    pads.push(
      createPlatedHole({
        portHints: [`${pinNumber++}`],
        holeDiameter: 0.85,
        outerDiameter: 1.8,
        pcbX: leftRowX,
        pcbY: yOffset - i * pitch,
        shape: "circle",
      }),
    )
  }

  const yOffsetRight = ((right - 1) / 2) * pitch
  for (let i = 0; i < right; i++) {
    pads.push(
      createPlatedHole({
        portHints: [`${pinNumber++}`],
        holeDiameter: 0.85,
        outerDiameter: 1.8,
        pcbX: rightRowX,
        pcbY: yOffsetRight - i * pitch,
        shape: "circle",
      }),
    )
  }

  return <footprint>{pads}</footprint>
}
