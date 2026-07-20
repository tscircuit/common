import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["CS"],
  pin2: ["pin2"],
  pin3: ["pin3"],
  pin4: ["GND"],
  pin5: ["pin5"],
  pin6: ["CLK"],
  pin7: ["pin7"],
  pin8: ["VCC"],
  pin9: ["EP"],
} as const

export const W25Q16JVUXIQ = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C2843335"],
      }}
      manufacturerPartNumber="W25Q16JVUXIQ"
      footprint="wson"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2843335.obj?uuid=2b35e1c3dcc44b77887d4f445b51370a",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C2843335.step?uuid=2b35e1c3dcc44b77887d4f445b51370a",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}
