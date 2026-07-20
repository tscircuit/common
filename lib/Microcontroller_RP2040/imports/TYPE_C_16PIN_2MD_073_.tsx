import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin13: ["EH1"],
  pin14: ["EH2"],
  pin15: ["pin13_alt1"],
  pin16: ["pin14_alt1"],
  pin17: ["A1B12"],
  pin18: ["A4B9"],
  pin19: ["B8"],
  pin20: ["A5"],
  pin21: ["B7"],
  pin22: ["A6"],
  pin23: ["A7"],
  pin24: ["B6"],
  pin25: ["A8"],
  pin26: ["B5"],
  pin27: ["B4A9"],
  pin28: ["B1A12"],
} as const

export const TYPE_C_16PIN_2MD_073_ = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C2765186"],
      }}
      manufacturerPartNumber="TYPE_C_16PIN_2MD_073_"
      footprint="usbcmidmount16_pinstart13"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2765186.obj?uuid=4ee8413127e64716b804db03d4b340ae",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2765186.step?uuid=4ee8413127e64716b804db03d4b340ae",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 1.3249976000000152, z: -1.6800018 },
      }}
      {...props}
    />
  )
}
