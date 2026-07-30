import { XL_1608SURC_06 } from "../imports/XL_1608SURC_06"
import { schSections } from "./schematicSections"

export const StatusLEDSubcircuit = ({ parentName }: { parentName: string }) => (
  <subcircuit name="STATUS_LED" pcbX={10.5} pcbY={5}>
    <XL_1608SURC_06
      name="D1"
      color="green"
      schSectionName={schSections.status(parentName)}
      pcbX={-1}
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
      pcbX={1}
      pcbY={0}
      pcbRotation={90}
      schX={8.06}
      schY={-12}
    />
  </subcircuit>
)
