import { XiaoBoardFootprint } from "./XiaoBoardFootprint"
import { outlineBuilder } from "../../util/outlineBuilder"
import { splitBoardAndChipProps } from "../../util/splitBoardAndChipProps"

import { ChipProps, BoardProps } from "@tscircuit/props"

type XiaoBoardProps = ChipProps &
  BoardProps & {
    children?: any
    boardName?: string
    variant?: "RP2040" | "Receiver"
    withPlatedHoles?: boolean
  }

export const XiaoBoard = ({
  variant,
  withPlatedHoles = false,
  children,
  ...rest
}: XiaoBoardProps) => {
  const { boardProps, chipProps = {} } = splitBoardAndChipProps({
    ...rest,
    variant,
    withPlatedHoles,
  }) as {
    boardProps: any
    chipProps: Record<string, any>
  }

  const resolvedName = chipProps.name
  const { name: _, ...chipRest } = chipProps

  const DefaultPinLabels = {
    pin1: "A0",
    pin2: "A1",
    pin3: "A2",
    pin4: "A3",
    pin5: "SDA",
    pin6: "SCL",
    pin7: "TX",
    pin8: "VBUS",
    pin9: "GND1",
    pin10: "V3_3",
    pin11: "MOSI",
    pin12: "MISO",
    pin13: "SCK",
    pin14: "RX",
  }

  const RP2040PinLabels = {
    pin1: "SWDIO",
    pin2: "SWCLK",
    pin3: "RUN",
    pin4: "GND1",
    pin5: "GND2",
    pin6: "VIN",
    pin7: "A0",
    pin8: "A1",
    pin9: "A2",
    pin10: "A3",
    pin11: "SDA",
    pin12: "SCL",
    pin13: "TX",
    pin14: "VBUS",
    pin15: "GND3",
    pin16: "V3_3",
    pin17: "MOSI",
    pin18: "MISO",
    pin19: "SCK",
    pin20: "RX",
  }

  const defaultPinArrangement = {
    leftSide: {
      direction: "top-to-bottom" as const,
      pins: ["A0", "A1", "A2", "A3", "SDA", "SCL", "TX"],
    },
    rightSide: {
      direction: "top-to-bottom" as const,
      pins: ["RX", "SCK", "MISO", "MOSI", "V3_3", "GND1", "VBUS"],
    },
  }

  const rp2040PinArrangement = {
    leftSide: {
      direction: "top-to-bottom" as const,
      pins: ["SWDIO", "RUN", "A0", "A1", "A2", "A3", "SDA", "SCL", "TX", "VIN"],
    },
    rightSide: {
      direction: "top-to-bottom" as const,
      pins: [
        "SWCLK",
        "RX",
        "SCK",
        "MISO",
        "MOSI",
        "V3_3",
        "GND1",
        "GND2",
        "GND3",
        "VBUS",
      ],
    },
  }
  const outline = outlineBuilder(0, 10.55)
    .lineTo(8.89, 10.55)
    .corner({ radius: 1.8, turn: "ccw" })
    .lineTo(8.89, -10.55)
    .corner({ radius: 1.8, turn: "ccw" })
    .lineTo(-8.89, -10.55)
    .corner({ radius: 1.8, turn: "ccw" })
    .lineTo(-8.89, 10.55)
    .corner({ radius: 1.8, turn: "ccw" })
    .lineTo(0, 10.55)
    .toArray()

  return (
    <board {...boardProps} outline={outline}>
      <group>
        <chip
          {...chipRest}
          name={resolvedName}
          footprint={
            <XiaoBoardFootprint
              variant={variant}
              withPlatedHoles={withPlatedHoles}
            />
          }
          pinLabels={variant === "RP2040" ? RP2040PinLabels : DefaultPinLabels}
          schWidth={1.5}
          schPinArrangement={
            variant === "RP2040" ? rp2040PinArrangement : defaultPinArrangement
          }
          {...(variant === "RP2040" && {
            schPinStyle: {
              pin2: {
                marginBottom: 0.2,
              },
              pin3: {
                marginBottom: 0.3,
              },
              pin15: {
                marginBottom: 0.2,
              },
              pin16: {
                marginBottom: 0.2,
              },
              pin13: {
                marginBottom: 0.3,
              },
            },
          })}
        />
        {children}
      </group>
    </board>
  )
}
