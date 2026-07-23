import type { CrystalProps } from "@tscircuit/props"

type X322512MSB4SIProps = Omit<
  CrystalProps,
  "frequency" | "loadCapacitance" | "pinVariant"
>

export const X322512MSB4SI = (props: X322512MSB4SIProps) => {
  return (
    <crystal
      frequency="12MHz"
      loadCapacitance="12pF"
      pinVariant="four_pin"
      supplierPartNumbers={{
        jlcpcb: ["C9002"],
      }}
      manufacturerPartNumber="X322512MSB4SI"
      footprint="crystal"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C9002.obj?uuid=02485e56ba8d4732a26526d2983fc729",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C9002.step?uuid=02485e56ba8d4732a26526d2983fc729",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}
