import { schSections } from "./schematicSections"

export const AnalogSupplySubcircuit = ({
  parentName,
}: {
  parentName: string
}) => (
  <subcircuit name="ANALOG_SUPPLY" pcbX={10.5} pcbY={0}>
    <inductor
      name="L_AVDD"
      inductance="600ohm@100MHz"
      footprint="0603"
      schSectionName={schSections.power(parentName)}
      pcbX={-1}
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
      pcbX={1}
      pcbY={0}
    />
  </subcircuit>
)
