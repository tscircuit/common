import React, { ReactElement } from "react"
import { PlatedHoleProps } from "@tscircuit/props"

const createPlatedHole = (props: PlatedHoleProps): ReactElement =>
  React.createElement("platedhole", props as any)

interface ProMicroBoardFootprintProps {
  left?: number
  right?: number
  pitch?: number
}

export const ProMicroBoardFootprint: React.FC<ProMicroBoardFootprintProps> = ({
  left = 12,
  right = 12,
  pitch = 2.54,
}) => {
  const leftRowX = -7.62
  const rightRowX = 7.62
  const boardHeight = 33.02
  const topMargin = 3.81
  const boardTop = boardHeight / 2
  const firstHoleY = boardTop - topMargin

  const llabels = [
    "TXO",
    "RX1",
    "GND2",
    "GND3",
    "D2",
    "D3",
    "D4",
    "D5",
    "D6",
    "D7",
    "D8",
    "D9",
  ]

  const Rlabels = [
    "RAW",
    "GND1",
    "RST",
    "VCC",
    "A3",
    "A2",
    "A1",
    "A0",
    "SCK",
    "MISO",
    "MOSI",
    "D10",
  ]

  const pads: ReactElement[] = []
  let pinNumber = 1

  for (let i = 0; i < left; i++) {
    pads.push(
      createPlatedHole({
        portHints: [`${pinNumber}++`],
        holeDiameter: 1.01,
        outerDiameter: 1.87,
        pcbX: leftRowX,
        pcbY: firstHoleY - i * pitch,
        shape: "circle",
      }),
    )
  }

  for (let i = 0; i < right; i++) {
    pads.push(
      createPlatedHole({
        portHints: [`${pinNumber}++`],
        holeDiameter: 1.01,
        outerDiameter: 1.87,
        pcbX: rightRowX,
        pcbY: firstHoleY - i * pitch,
        shape: "circle",
      }),
    )
  }

  return <footprint>{pads}</footprint>
}
