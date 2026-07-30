import { XL_1608SURC_06 } from "../imports/XL_1608SURC_06"
import { schSections } from "./schematicSections"

const gndLabel = { displayName: "GND", schDisplayLabel: "GND" } as const

export const StatusLEDSubcircuit = ({ parentName }: { parentName: string }) => (
  <subcircuit
    name="STATUS_LED"
    pcbX={10.46}
    pcbY={5}
    width={2.92}
    height={2.498}
    exposedNets={["GND"]}
  >
    <XL_1608SURC_06
      name="D1"
      color="green"
      schSectionName={schSections.status(parentName)}
      pcbX={-0.96}
      pcbY={0}
      pcbRotation={90}
      schX={9.66}
      schY={-12}
    />
    <resistor
      name="R_LED"
      resistance="330"
      footprint="0402"
      schSectionName={schSections.status(parentName)}
      pcbX={1.04}
      pcbY={0}
      pcbRotation={90}
      schX={8.06}
      schY={-12}
    />
    <trace name="LED_D1" from=".R_LED > .pin2" to=".D1 > .anode" />
    <trace name="LED_G" from=".D1 > .cathode" to="net.GND" {...gndLabel} />
  </subcircuit>
)
