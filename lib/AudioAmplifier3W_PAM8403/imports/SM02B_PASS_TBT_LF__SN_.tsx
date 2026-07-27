import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["pin1"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["pin4"],
} as const

export const SM02B_PASS_TBT_LF__SN_ = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C265417"],
      }}
      manufacturerPartNumber="SM02B_PASS_TBT_LF__SN_"
      footprint="fpc2_p2mm_pw1mm_pl2.7mm_mpx6.7mm_mpy5.02mm_mpw1.8mm_mpl3.8mm"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C265417.obj?uuid=a4c72d7b3b9a4d589c0b8f983e3ecf9e",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C265417.step?uuid=a4c72d7b3b9a4d589c0b8f983e3ecf9e",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 2.33853485000011, z: -0.224893 },
      }}
      {...props}
    />
  )
}
