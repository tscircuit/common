import type { CapacitorProps } from "@tscircuit/props"

type CL10A106KP8NNNCProps = Omit<CapacitorProps, "capacitance">

export const CL10A106KP8NNNC = (props: CL10A106KP8NNNCProps) => {
  return (
    <capacitor
      capacitance="10uF"
      supplierPartNumbers={{
        jlcpcb: ["C19702"],
      }}
      manufacturerPartNumber="CL10A106KP8NNNC"
      footprint="res_p1.4mm_pw0.8mm_ph0.9mm"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C19702.obj?uuid=ac9b32e974bc448eab36b1293f859dcb",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C19702.step?uuid=ac9b32e974bc448eab36b1293f859dcb",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: -0.4 },
      }}
      {...props}
    />
  )
}
