import type { ResistorProps } from "@tscircuit/props"

type A0603WAF9532T5EProps = Omit<ResistorProps, "resistance">

export const A_0603WAF9532T5E = (props: A0603WAF9532T5EProps) => {
  return (
    <resistor
      resistance="95.3k"
      supplierPartNumbers={{
        jlcpcb: ["C23267"],
      }}
      manufacturerPartNumber="A_0603WAF9532T5E"
      footprint="res_p1.51mm_pw0.81mm_ph0.86mm"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C23267.obj?uuid=6bd5cd867e9542ebae21caaf5d2d4c4d",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C23267.step?uuid=6bd5cd867e9542ebae21caaf5d2d4c4d",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: -0.004999999999999977, y: 0, z: -0.01 },
      }}
      {...props}
    />
  )
}
