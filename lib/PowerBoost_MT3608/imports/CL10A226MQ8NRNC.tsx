import type { CapacitorProps } from "@tscircuit/props"

type CL10A226MQ8NRNCProps = Omit<CapacitorProps, "capacitance">

export const CL10A226MQ8NRNC = (props: CL10A226MQ8NRNCProps) => {
  return (
    <capacitor
      capacitance="22uF"
      supplierPartNumbers={{
        jlcpcb: ["C59461"],
      }}
      manufacturerPartNumber="CL10A226MQ8NRNC"
      footprint="res_p1.4mm_pw0.8mm_ph0.9mm"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C59461.obj?uuid=ac9b32e974bc448eab36b1293f859dcb",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C59461.step?uuid=ac9b32e974bc448eab36b1293f859dcb",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: -0.4 },
      }}
      {...props}
    />
  )
}
