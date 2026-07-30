import { schSections } from "./schematicSections"

const gndLabel = { displayName: "GND", schDisplayLabel: "GND" } as const
const v3v3Label = { displayName: "V3V3", schDisplayLabel: "V3V3" } as const
const adcRefLabel = {
  displayName: "ADC_REF",
  schDisplayLabel: "ADC_REF",
} as const

export const AnalogSupplySubcircuit = ({
  parentName,
}: {
  parentName: string
}) => (
  <subcircuit
    name="ANALOG_SUPPLY"
    pcbX={10.6525}
    pcbY={0}
    width={3.455}
    height={2.8}
    exposedNets={["GND", "V3V3", "ADC_VREF"]}
  >
    <inductor
      name="L_AVDD"
      inductance="600ohm@100MHz"
      footprint="0603"
      schSectionName={schSections.power(parentName)}
      pcbX={-1.1525}
      pcbY={0}
      supplierPartNumbers={{ jlcpcb: ["C1002"] }}
      pcbRotation={90}
      schX={6.8}
      schY={-8.3}
    />
    <capacitor
      name="C_ADC"
      capacitance="100nF"
      footprint="0402"
      schSectionName={schSections.power(parentName)}
      schOrientation="vertical"
      pcbX={0.8475}
      pcbY={0}
    />
    <trace
      name="ADC_REF"
      from=".C_ADC > .pin1"
      to="net.ADC_VREF"
      {...adcRefLabel}
    />
    <trace name="ADC_G" from=".C_ADC > .pin2" to="net.GND" {...gndLabel} />
    <trace name="AVDD_IN" from=".L_AVDD > .pin1" to="net.V3V3" {...v3v3Label} />
    <trace
      name="AVDD"
      from=".L_AVDD > .pin2"
      to="net.ADC_VREF"
      {...adcRefLabel}
    />
  </subcircuit>
)
