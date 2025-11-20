import type { ChipProps } from "@tscircuit/props"
import { XiaoBoardFootprint } from "./XiaoBoardFootprint"

const PIN_LABELS = {
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
} as const satisfies Record<string, string>

const PIN_ARRANGEMENT = {
  leftSide: {
    direction: "top-to-bottom" as const,
    pins: ["A0", "A1", "A2", "A3", "SDA", "SCL", "TX"],
  },
  rightSide: {
    direction: "top-to-bottom" as const,
    pins: ["RX", "SCK", "MISO", "MOSI", "V3_3", "GND1", "VBUS"],
  },
}

export const XiaoReceiver = (
  props: ChipProps<typeof PIN_LABELS> & { children?: any },
) => {
  const { children, ...rest } = props

  return (
    <chip
      {...rest}
      footprint={<XiaoBoardFootprint variant="Receiver" />}
      pinLabels={PIN_LABELS}
      schPinArrangement={PIN_ARRANGEMENT}
      schWidth={1.5}
      pcbX={0}
      pcbY={0}
      doNotPlace
    >
      {children}
    </chip>
  )
}
