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
  props: ChipProps<typeof PIN_LABELS> & { children?: any, throughHole?: boolean }
) => {
  const { children, throughHole , ...rest } = props

  return (
    <chip
      {...rest}
      footprint={<XiaoBoardFootprint variant="Receiver" withPlatedHoles={throughHole} />}
      pinLabels={PIN_LABELS}
      schPinArrangement={PIN_ARRANGEMENT}
      schWidth={1.5}
      doNotPlace
    >
      <silkscreenpath
        route={[
          { x: -9.1166, y: -8.5345 },
          { x: -9.1166, y: 8.6105 },
        ]}
      />
      <silkscreenpath
        route={[
          { x: -7.2116, y: -10.4395 },
          { x: 6.7584, y: -10.4395 },
        ]}
      />
      <silkscreenpath
        route={[
          { x: -4.7216, y: 10.5155 },
          { x: -4.717872, y: 11.525772 },
        ]}
      />
      <silkscreenpath
        route={[
          { x: -4.217872, y: 12.0255 },
          { x: 3.7774, y: 12.0255 },
        ]}
      />
      <silkscreenpath
        route={[
          { x: 4.2774, y: 11.5255 },
          { x: 4.2774, y: 10.5155 },
        ]}
      />
      <silkscreenpath
        route={[
          { x: 6.7584, y: 10.5155 },
          { x: -7.2116, y: 10.5155 },
        ]}
      />
      <silkscreenpath
        route={[
          { x: 8.6634, y: -8.5345 },
          { x: 8.6634, y: 8.6105 },
        ]}
      />
      <silkscreenpath
        route={[
          { x: -9.1166, y: 8.6145 },
          { x: -8.86137796498721, y: 9.566999698293817 },
          { x: -8.164099698293818, y: 10.26427796498721 },
          { x: -7.2116, y: 10.5195 },
        ]}
      />
      <silkscreenpath
        route={[
          { x: -7.2116, y: -10.4395 },
          { x: -8.164099698293818, y: -10.18427796498721 },
          { x: -8.861377964987211, y: -9.486999698293818 },
          { x: -9.116600000000002, y: -8.5345 },
        ]}
      />
      <silkscreenpath
        route={[
          { x: -4.717872, y: 11.525772 },
          { x: -4.217872, y: 12.025499999999997 },
        ]}
      />
      <silkscreenpath
        route={[
          { x: 3.7774, y: 12.0255 },
          { x: 4.277400000000001, y: 11.5255 },
        ]}
      />
      <silkscreenpath
        route={[
          { x: 6.7584, y: 10.5155 },
          { x: 7.710899698293817, y: 10.26027796498721 },
          { x: 8.408177964987209, y: 9.562999698293817 },
          { x: 8.663399999999998, y: 8.6105 },
        ]}
      />
      <silkscreenpath
        route={[
          { x: 8.6634, y: -8.5345 },
          { x: 8.40817796498721, y: -9.486999698293818 },
          { x: 7.710899698293818, y: -10.184277964987212 },
          { x: 6.7584, y: -10.4395 },
        ]}
      />
      {children}
    </chip>
  )
}
