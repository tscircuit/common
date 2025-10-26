import React, { ReactElement } from "react"
import { PlatedHoleProps } from "@tscircuit/props"

const createPlatedHole = (props: PlatedHoleProps): ReactElement =>
  React.createElement("platedhole", props as any)

interface ViaGridBoardFootprintProps {
  rows?: number
  cols?: number
  pitch?: number
}

export const ViaGridBoardFootprint: React.FC<ViaGridBoardFootprintProps> = ({
  rows = 10,
  cols = 10,
  pitch = 2.54,
}) => {
  const pads: ReactElement[] = []
  let pinNumber = 1

  const startX = -((cols - 1) * pitch) / 2
  const startY = ((rows - 1) * pitch) / 2

  const holeDiameter = 0.6
  const outerDiameter = 1.2

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      pads.push(
        createPlatedHole({
          portHints: [`${pinNumber}`],
          holeDiameter,
          outerDiameter,
          pcbX: startX + col * pitch,
          pcbY: startY - row * pitch,
          shape: "circle",
        }),
      )
      pinNumber++
    }
  }

  return <footprint>{pads}</footprint>
}
