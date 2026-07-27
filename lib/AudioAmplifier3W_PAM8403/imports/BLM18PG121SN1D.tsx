import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
} as const

export const BLM18PG121SN1D = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C14709"],
      }}
      manufacturerPartNumber="BLM18PG121SN1D"
      footprint="res_p1.4mm_pw0.8mm_ph0.86mm"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C14709.obj?uuid=a7f84688c5004aa68dbcbddc99bd5473",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C14709.step?uuid=a7f84688c5004aa68dbcbddc99bd5473",
        pcbRotationOffset: 180,
        modelOriginPosition: {
          x: 0.0023875999999063424,
          y: 0.015976600000044527,
          z: -0.25,
        },
      }}
      {...props}
    />
  )
}
