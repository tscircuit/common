import { ProMicroBoardFootprint } from "./ProMicroBoardFootprint"
import { outlineBuilder } from "../../util/outlineBuilder"
import { splitBoardAndChipProps } from "../../util/splitBoardAndChipProps"
import { ChipProps, BoardProps } from "@tscircuit/props"

type ProMicroBoardProps = ChipProps &
  BoardProps & {
    children?: any
    variant?: "5V" | "3V3"
  }

export const ProMicroBoard = ({
  variant,
  children,
  ...rest
}: ProMicroBoardProps) => {
  const { boardProps, chipProps = {} } = splitBoardAndChipProps({
    ...rest,
    variant,
  }) as {
    boardProps: any
    chipProps: Record<string, any>
  }

  const resolvedName = chipProps.name
  const { name: _, ...chipRest } = chipProps

  const DefaultPinLabels = {
    pin1: "RAW",
    pin2: "GND1",
    pin3: "RST",
    pin4: "VCC",
    pin5: "A3",
    pin6: "A2",
    pin7: "A1",
    pin8: "A0",
    pin9: "SCK",
    pin10: "MISO",
    pin11: "MOSI",
    pin12: "D10",
    pin13: "TXO",
    pin14: "RX1",
    pin15: "GND2",
    pin16: "GND3",
    pin17: "D2",
    pin18: "D3",
    pin19: "D4",
    pin20: "D5",
    pin21: "D6",
    pin22: "D7",
    pin23: "D8",
    pin24: "D9",
  }

  const defaultPinArrangement = {
    leftSide: {
      direction: "top-to-bottom" as const,
      pins: [
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
      ],
    },
    rightSide: {
      direction: "top-to-bottom" as const,
      pins: [
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
      ],
    },
  }

  const outline = outlineBuilder(0, 17.8)
    .lineTo(8.9, 17.8)
    .corner({ radius: 1.8, turn: "ccw" })
    .lineTo(8.9, -17.8)
    .corner({ radius: 1.8, turn: "ccw" })
    .lineTo(-8.9, -17.8)
    .corner({ radius: 1.8, turn: "ccw" })
    .lineTo(-8.9, 17.8)
    .corner({ radius: 1.8, turn: "ccw" })
    .lineTo(0, 17.8)
    .toArray()

  return (
    <board {...boardProps} outline={outline}>
      <chip
        {...chipRest}
        name={resolvedName}
        footprint={<ProMicroBoardFootprint />}
        doNotPlace
        pcbX={0}
        pcbY={0}
        pinLabels={DefaultPinLabels}
        schWidth={1.8}
        schPinArrangement={defaultPinArrangement}
      />
      {children}
    </board>
  )
}
