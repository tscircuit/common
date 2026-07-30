import { SKRPACE010 } from "../imports/SKRPACE010"
import { W25Q16JVUXIQ } from "../imports/W25Q16JVUXIQ"
import { schSections } from "./schematicSections"

const gndLabel = { displayName: "GND", schDisplayLabel: "GND" } as const
const v3v3Label = { displayName: "V3V3", schDisplayLabel: "V3V3" } as const

export const QSPIFlashBootSubcircuit = ({
  parentName,
}: {
  parentName: string
}) => (
  <subcircuit
    name="QSPI_FLASH_BOOT"
    pcbX={9.04}
    pcbY={17.1875}
    width={7.3}
    height={6.675}
    schY={-2}
    exposedNets={["GND", "V3V3"]}
  >
    <W25Q16JVUXIQ
      name="U2"
      schSectionName={schSections.flash(parentName)}
      pcbX={0.23}
      pcbY={-2.1875}
      pcbRotation={90}
      schX={17.5}
      schY={-4.16}
      schHeight={1.6}
      schPinArrangement={{ leftSide: [8, 1, 2, 3, 5, 6, 7, 4, 9] }}
    />
    <capacitor
      name="C_FLASH"
      capacitance="100nF"
      footprint="0402"
      schSectionName={schSections.flash(parentName)}
      schOrientation="vertical"
      pcbX={-2.77}
      pcbY={-2.1875}
      pcbRotation={180}
    />
    <SKRPACE010
      name="SW_BOOT"
      schSectionName={schSections.controls(parentName)}
      pcbX={0.23}
      pcbY={1.8125}
      schX={10.6}
      schY={-9.4}
    />
    <resistor
      name="R_BOOT"
      resistance="10k"
      footprint="0402"
      schSectionName={schSections.controls(parentName)}
      pcbX={3.23}
      pcbY={-2.1875}
      pcbRotation={90}
      schX={10.6}
      schY={-11}
    />
    <trace name="BOOT_SW" from=".U2 > .CS" to=".SW_BOOT > .pin1" />
    <trace name="BOOT_R" from=".SW_BOOT > .pin1" to=".R_BOOT > .pin1" />
    <trace name="BOOT_G" from=".SW_BOOT > .pin3" to="net.GND" {...gndLabel} />
    <trace
      name="BOOT_3V3"
      from=".R_BOOT > .pin2"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      name="FLSH_3V3"
      from=".C_FLASH > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace name="FLSH_G" from=".C_FLASH > .pin2" to="net.GND" {...gndLabel} />
    <trace name="FLSH_GND" from=".U2 > .GND" to="net.GND" {...gndLabel} />
    <trace name="FLSH_VCC" from=".U2 > .VCC" to="net.V3V3" {...v3v3Label} />
    <trace name="FLSH_EP" from=".U2 > .EP" to="net.GND" {...gndLabel} />
  </subcircuit>
)
