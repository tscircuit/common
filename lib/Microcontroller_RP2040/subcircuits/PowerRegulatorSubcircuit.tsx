import { AP2112K_3_3TRG1 } from "../imports/AP2112K_3_3TRG1"
import { B5819W_SL } from "../imports/B5819W_SL"
import { XL_1608SURC_06 } from "../imports/XL_1608SURC_06"
import { schSections } from "./schematicSections"

export const PowerRegulatorSubcircuit = ({
  parentName,
}: {
  parentName: string
}) => (
  <subcircuit name="POWER_REGULATOR" pcbX={-9} pcbY={15}>
    <B5819W_SL
      name="D_VBUS"
      schSectionName={schSections.power(parentName)}
      pcbX={0}
      pcbY={0}
      pcbRotation={90}
      schX={7.8}
      schY={-4.6}
      schRotation={180}
    />
    <AP2112K_3_3TRG1
      name="U3"
      schSectionName={schSections.power(parentName)}
      pcbX={-4}
      pcbY={0}
      pcbRotation={180}
      schX={8.8}
      schY={-6.3}
      schHeight={0.6}
    />
    <resistor
      name="R_3V3_EN"
      resistance="100k"
      footprint="0402"
      schSectionName={schSections.power(parentName)}
      pcbX={0}
      pcbY={-4}
      pcbRotation={90}
      schOrientation="horizontal"
      schX={9.4}
      schY={-4.6}
    />
    <capacitor
      name="C_3V3"
      capacitance="10uF"
      footprint="0603"
      schSectionName={schSections.power(parentName)}
      schOrientation="vertical"
      pcbX={-4}
      pcbY={-4}
    />
    <XL_1608SURC_06
      name="D_PWR"
      color="green"
      schSectionName={schSections.status(parentName)}
      pcbX={4}
      pcbY={0}
      pcbRotation={90}
      schX={10.2}
      schY={-13.8}
    />
    <resistor
      name="R_PWR_LED"
      resistance="330"
      footprint="0402"
      schSectionName={schSections.status(parentName)}
      pcbX={4}
      pcbY={-4}
      pcbRotation={90}
      schOrientation="horizontal"
      schX={8.6}
      schY={-13.8}
    />
  </subcircuit>
)
