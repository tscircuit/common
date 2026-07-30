import { X322512MSB4SI } from "../imports/X322512MSB4SI"
import { schSections } from "./schematicSections"

export const ClockSubcircuit = ({ parentName }: { parentName: string }) => (
  <subcircuit name="CLOCK" pcbX={-9} pcbY={-10}>
    <X322512MSB4SI
      name="Y1"
      schSectionName={schSections.clock(parentName)}
      pcbX={0}
      pcbY={0}
      schX={1.025}
      schY={-12.5}
    />
    <capacitor
      name="C_XIN"
      capacitance="18pF"
      footprint="0402"
      schSectionName={schSections.clock(parentName)}
      schOrientation="vertical"
      pcbX={-4}
      pcbY={0}
    />
    <capacitor
      name="C_XOUT"
      capacitance="18pF"
      footprint="0402"
      schSectionName={schSections.clock(parentName)}
      schOrientation="vertical"
      pcbX={4}
      pcbY={0}
    />
  </subcircuit>
)
