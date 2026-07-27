import type { InductorProps } from "@tscircuit/props"

type SMMS0630_220MProps = Omit<InductorProps, "inductance">

export const SMMS0630_220M = (props: SMMS0630_220MProps) => {
  return (
    <inductor
      inductance="22uH"
      supplierPartNumbers={{
        jlcpcb: ["C128694"],
      }}
      manufacturerPartNumber="SMMS0630_220M"
      footprint="res_p6.16mm_pw2.52mm_ph3.12mm"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C128694.obj?uuid=fd41bc67ad4c4c5f978bcfd3746341ff",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C128694.step?uuid=fd41bc67ad4c4c5f978bcfd3746341ff",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0.000012700000070253736, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}
