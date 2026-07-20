import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["OSC1"],
  pin2: ["GND1"],
  pin3: ["OSC2"],
  pin4: ["GND2"],
} as const

export const X322512MSB4SI = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C9002"],
      }}
      manufacturerPartNumber="X322512MSB4SI"
      footprint="crystal"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C9002.obj?uuid=02485e56ba8d4732a26526d2983fc729",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C9002.step?uuid=02485e56ba8d4732a26526d2983fc729",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}
