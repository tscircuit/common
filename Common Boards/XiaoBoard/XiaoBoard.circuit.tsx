import type { ChipProps } from "@tscircuit/props"
import { StampBoardFootprint } from "./XiaoBoardFootprint"
import { outlineBuilder } from "../../util/outlineBuilder"

export const XiaoBoard = (props: ChipProps & { children?: any }) => {
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
    <board outline={outline}>
      <group>
        <chip
          name={props.name}
          footprint={<StampBoardFootprint />}
          pinLabels={{
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
          }}
          schWidth={1.5}
          schPinArrangement={{
            leftSide: {
              direction: "top-to-bottom",
              pins: [
                "SWDIO",
                "RUN",
                "A0",
                "A1",
                "A2",
                "A3",
                "SDA",
                "SCL",
                "TX",
                "VIN",
              ],
            },
            rightSide: {
              direction: "top-to-bottom",
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
          }}
          schPinStyle={{
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
          }}
        />
        {props.children}
      </group>
    </board>
  )
}
