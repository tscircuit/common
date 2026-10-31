import type { CrystalProps } from "@tscircuit/props"

type ABM8_272_T3Props = Omit<
  CrystalProps,
  "frequency" | "loadCapacitance" | "pinVariant"
>

export const ABM8_272_T3 = (props: ABM8_272_T3Props) => {
  return (
    <crystal
      frequency="12MHz"
      loadCapacitance="10pF"
      pinVariant="four_pin"
      supplierPartNumbers={{
        jlcpcb: ["C20625731"],
      }}
      manufacturerPartNumber="ABM8-272-T3"
      footprint={
        <footprint>
          <smtpad
            portHints={["pin1"]}
            pcbX={-1.100074}
            pcbY={-0.850011}
            width={1.3999972}
            height={1.1999976}
            shape="rect"
          />
          <smtpad
            portHints={["pin2"]}
            pcbX={1.100074}
            pcbY={-0.850011}
            width={1.3999972}
            height={1.1999976}
            shape="rect"
          />
          <smtpad
            portHints={["pin3"]}
            pcbX={1.100074}
            pcbY={0.850011}
            width={1.3999972}
            height={1.1999976}
            shape="rect"
          />
          <smtpad
            portHints={["pin4"]}
            pcbX={-1.100074}
            pcbY={0.850011}
            width={1.3999972}
            height={1.1999976}
            shape="rect"
          />
        </footprint>
      }
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C20625731.obj?uuid=02485e56ba8d4732a26526d2983fc729",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C20625731.step?uuid=02485e56ba8d4732a26526d2983fc729",
        pcbRotationOffset: 0,
        modelOriginPosition: { x: 0, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}
