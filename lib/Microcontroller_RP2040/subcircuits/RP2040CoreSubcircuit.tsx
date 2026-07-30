import { RP2040 } from "../imports/RP2040"
import { schSections } from "./schematicSections"

export const RP2040CoreSubcircuit = ({
  parentName,
}: {
  parentName: string
}) => (
  <subcircuit
    name="RP2040_CORE"
    pcbX={0}
    pcbY={0}
    exposedNets={["RUN_SIGNAL", "QSPI_SS"]}
  >
    <RP2040
      name="U1"
      showPinAliases
      schSectionName={schSections.rp2040(parentName)}
      pcbX={0}
      pcbY={0}
      schX={-0.08}
      schY={-2.5}
      schWidth={2.8}
      schHeight={5.8}
    />
    {[
      ["C_IOVDD1", -5, -5, -11.3],
      ["C_IOVDD2", -3, -5, -9.6],
      ["C_IOVDD3", -1, -5, -7.9],
      ["C_IOVDD4", 1, -5, -6.2],
      ["C_IOVDD5", 3, -5, -4.5],
      ["C_IOVDD6", 5, -5, -2.8],
    ].map(([capName, pcbX, pcbY, schX]) => (
      <capacitor
        key={capName}
        name={capName as string}
        capacitance="100nF"
        footprint="0402"
        schSectionName={schSections.rp2040(parentName)}
        schOrientation="vertical"
        pcbX={pcbX as number}
        pcbY={pcbY as number}
        schX={schX as number}
        schY={-6.4}
      />
    ))}
    <capacitor
      name="C_CORE"
      capacitance="1uF"
      footprint="0402"
      schSectionName={schSections.rp2040(parentName)}
      schOrientation="vertical"
      pcbX={6}
      pcbY={0}
      schX={-3.65}
      schY={-3.7}
    />
    <trace from=".U1 > .RUN" to="net.RUN_SIGNAL" />
    <trace from=".U1 > .QSPI_SS" to="net.QSPI_SS" />
  </subcircuit>
)
