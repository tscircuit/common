import type { LedProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["cathode", "neg"],
  pin2: ["anode", "pos"],
} as const

export const XL_1608SURC_06 = (props: LedProps) => {
  const { name = "LED1", ...restProps } = props

  return (
    <diode
      name={name}
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C965799"],
      }}
      manufacturerPartNumber="XL_1608SURC_06"
      footprint="led_p1.498mm_pw0.8mm_ph0.8mm"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C965799.obj?uuid=d0740cb8891c49a88b6949cb978926f3",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C965799.step?uuid=d0740cb8891c49a88b6949cb978926f3",
        pcbRotationOffset: 0,
        modelOriginPosition: {
          x: -0.000012700000070253736,
          y: 0.00005079999993995443,
          z: -0.01,
        },
      }}
      {...restProps}
    />
  )
}
