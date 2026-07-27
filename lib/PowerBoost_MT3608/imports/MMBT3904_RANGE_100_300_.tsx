import type { TransistorProps } from "@tscircuit/props"

type MMBT3904Props = Omit<TransistorProps, "type">

export const MMBT3904_RANGE_100_300_ = (props: MMBT3904Props) => {
  return (
    <transistor
      type="npn"
      supplierPartNumbers={{
        jlcpcb: ["C20526"],
      }}
      manufacturerPartNumber="MMBT3904_RANGE_100_300_"
      footprint="sot23w_p0.99mm_pw0.66mm_pin1location(rightside,bottom)"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C20526.obj?uuid=d777607a152f4f3aac9bb0d0c14ed6fd",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C20526.step?uuid=d777607a152f4f3aac9bb0d0c14ed6fd",
        pcbRotationOffset: 180,
        modelOriginPosition: {
          x: 0.000012700000070253736,
          y: -0.000012699999956566899,
          z: 0.050795,
        },
      }}
      {...props}
    />
  )
}
