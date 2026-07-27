import type { ResistorProps } from "@tscircuit/props"

type FRC0603F1302TSProps = Omit<ResistorProps, "resistance">

export const FRC0603F1302TS = (props: FRC0603F1302TSProps) => {
  return (
    <resistor
      resistance="13k"
      supplierPartNumbers={{
        jlcpcb: ["C2906992"],
      }}
      manufacturerPartNumber="FRC0603F1302TS"
      footprint="res_p1.51mm_pw0.81mm_ph0.86mm"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2906992.obj?uuid=6bd5cd867e9542ebae21caaf5d2d4c4d",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2906992.step?uuid=6bd5cd867e9542ebae21caaf5d2d4c4d",
        pcbRotationOffset: 90,
        modelOriginPosition: { x: -0.004999999999999977, y: 0, z: -0.01 },
      }}
      {...props}
    />
  )
}
