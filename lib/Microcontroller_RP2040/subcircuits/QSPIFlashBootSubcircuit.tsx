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
    pcbX={9}
    pcbY={15}
    schY={-2}
    exposedNets={["QSPI_SS"]}
  >
    <W25Q16JVUXIQ
      name="U2"
      schSectionName={schSections.flash(parentName)}
      pcbX={0}
      pcbY={0}
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
      pcbX={-3}
      pcbY={0}
      pcbRotation={180}
    />
    <SKRPACE010
      name="SW_BOOT"
      schSectionName={schSections.controls(parentName)}
      pcbX={0}
      pcbY={4}
      schX={10.6}
      schY={-9.4}
    />
    <resistor
      name="R_BOOT"
      resistance="10k"
      footprint="0402"
      schSectionName={schSections.controls(parentName)}
      pcbX={3}
      pcbY={0}
      pcbRotation={90}
      schX={10.6}
      schY={-11}
    />
    <trace from=".U2 > .CS" to="net.QSPI_SS" />
    <trace from=".SW_BOOT > .pin1" to="net.QSPI_SS" />
    <trace from=".SW_BOOT > .pin1" to=".R_BOOT > .pin1" />
    <trace from=".SW_BOOT > .pin3" to="net.GND" {...gndLabel} />
    <trace from=".R_BOOT > .pin1" to="net.QSPI_SS" />
    <trace from=".R_BOOT > .pin2" to="net.V3V3" {...v3v3Label} />
  </subcircuit>
)
