import type { LedProps } from "@tscircuit/props"

export const XL_1608SURC_06 = (props: LedProps) => {
  const { name = "LED1", ...restProps } = props

  return (
    <led
      name={name}
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
