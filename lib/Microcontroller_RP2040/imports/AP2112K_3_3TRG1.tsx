import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["VIN"],
  pin2: ["GND"],
  pin3: ["EN"],
  pin4: ["NC"],
  pin5: ["VOUT"],
} as const

export const AP2112K_3_3TRG1 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C23380830"],
      }}
      manufacturerPartNumber="AP2112K_3_3TRG1"
      footprint="dfn6_missing(5)_p0.95mm_w3.2001mm"
      pcbRotation={180}
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C23380830.obj?uuid=8c971aea3af54c53b74baeb1f489d393",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C23380830.step?uuid=8c971aea3af54c53b74baeb1f489d393",
        pcbRotationOffset: -90,
        modelOriginPosition: { x: 0, y: 0, z: -0.7 },
      }}
      {...props}
    />
  )
}
