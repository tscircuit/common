import { AP2112K_3_3TRG1 } from "../imports/AP2112K_3_3TRG1"
import { B5819W_SL } from "../imports/B5819W_SL"
import { XL_1608SURC_06 } from "../imports/XL_1608SURC_06"
import { schSections } from "./schematicSections"

const gndLabel = { displayName: "GND", schDisplayLabel: "GND" } as const
const vbusLabel = { displayName: "VBUS", schDisplayLabel: "VBUS" } as const
const vsysLabel = { displayName: "VSYS", schDisplayLabel: "VSYS" } as const
const v3v3Label = { displayName: "V3V3", schDisplayLabel: "V3V3" } as const

export const PowerRegulatorSubcircuit = ({
  parentName,
}: {
  parentName: string
}) => (
  <subcircuit
    name="POWER_REGULATOR"
    pcbX={-9.600025}
    pcbY={13.735}
    width={10.20005}
    height={7.33}
    exposedNets={["GND", "V3V3", "VBUS"]}
  >
    <B5819W_SL
      name="D_VBUS"
      schSectionName={schSections.power(parentName)}
      pcbX={0.600025}
      pcbY={1.265}
      pcbRotation={90}
      schX={7.8}
      schY={-4.6}
      schRotation={180}
    />
    <AP2112K_3_3TRG1
      name="U3"
      schSectionName={schSections.power(parentName)}
      pcbX={-3.399975}
      pcbY={1.265}
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
      pcbX={0.600025}
      pcbY={-2.735}
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
      pcbX={-3.399975}
      pcbY={-2.735}
    />
    <XL_1608SURC_06
      name="D_PWR"
      color="green"
      schSectionName={schSections.status(parentName)}
      pcbX={4.600025}
      pcbY={1.265}
      pcbRotation={90}
      schX={10.2}
      schY={-13.8}
    />
    <resistor
      name="R_PWR_LED"
      resistance="330"
      footprint="0402"
      schSectionName={schSections.status(parentName)}
      pcbX={4.600025}
      pcbY={-2.735}
      pcbRotation={90}
      schOrientation="horizontal"
      schX={8.6}
      schY={-13.8}
    />
    <trace name="VBUS_D" from="net.VBUS" to=".D_VBUS > .anode" {...vbusLabel} />
    <trace
      name="D_VSYS"
      from=".D_VBUS > .cathode"
      to="net.VSYS"
      {...vsysLabel}
    />
    <trace
      name="EN_VSYS"
      from=".R_3V3_EN > .pin1"
      to="net.VSYS"
      {...vsysLabel}
    />
    <trace name="EN_R" from=".R_3V3_EN > .pin2" to=".U3 > .EN" />
    <trace name="VSYS_IN" from="net.VSYS" to=".U3 > .VIN" {...vsysLabel} />
    <trace name="REG_3V3" from=".U3 > .VOUT" to="net.V3V3" {...v3v3Label} />
    <trace name="REG_G" from=".U3 > .GND" to="net.GND" {...gndLabel} />
    <trace name="C3V3_P" from=".C_3V3 > .pin1" to="net.V3V3" {...v3v3Label} />
    <trace name="C3V3_G" from=".C_3V3 > .pin2" to="net.GND" {...gndLabel} />
    <trace
      name="PLED_3V3"
      from="net.V3V3"
      to=".R_PWR_LED > .pin1"
      {...v3v3Label}
    />
    <trace name="PLED_D" from=".R_PWR_LED > .pin2" to=".D_PWR > .anode" />
    <trace name="PLED_G" from=".D_PWR > .cathode" to="net.GND" {...gndLabel} />
  </subcircuit>
)
