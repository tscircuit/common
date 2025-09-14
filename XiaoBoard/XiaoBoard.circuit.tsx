import type { ChipProps } from "@tscircuit/props"
import { XiaoBoardFootprint } from "./XiaoBoardFootprint"

export const XiaoBoard = (props: ChipProps) => (
  <chip
    {...props}
    footprint={<XiaoBoardFootprint />}
    pinLabels={{
      pin1: "D0_A0",
      pin2: "D1_A1",
      pin3: "D2_A2",
      pin4: "D3_A3",
      pin5: "D4_SDA",
      pin6: "D5_SDA",
      pin7: "D6_TX",
      pin8: "D7_RX_55",
      pin9: "D8_5CK",
      pin10: "D9_MOSI",
      pin11: "D10_MISO",
      pin12: "3V3",
      pin13: "GND",
      pin14: "VUSB",
    }}
    schPinArrangement={{
      leftSide: {
        direction: "top-to-bottom",
        pins: ["D0_A0", "D1_A1", "D2_A2", "D3_A3", "D4_SDA", "D5_SDA", "D6_TX"],
      },
      rightSide: {
        direction: "top-to-bottom",
        pins: [
          "VUSB",
          "GND",
          "3V3",
          "D10_MISO",
          "D9_MOSI",
          "D8_5CK",
          "D7_RX_55",
        ],
      },
    }}
  />
)
