import { X322512MSB4SI } from "../imports/X322512MSB4SI"
import { schSections } from "./schematicSections"

const gndLabel = { displayName: "GND", schDisplayLabel: "GND" } as const

export const ClockSubcircuit = ({ parentName }: { parentName: string }) => (
  <subcircuit
    name="CLOCK"
    pcbX={-9}
    pcbY={-10}
    width={9.76}
    height={3.1}
    exposedNets={["GND"]}
  >
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
    <trace name="Y1_G1" from=".Y1 > .pin2" to="net.GND" {...gndLabel} />
    <trace name="Y1_G2" from=".Y1 > .pin4" to="net.GND" {...gndLabel} />
    <trace name="CXIN" from=".C_XIN > .pin1" to=".Y1 > .pin1" />
    <trace name="CXIN_G" from=".C_XIN > .pin2" to="net.GND" {...gndLabel} />
    <trace name="CXOUT" from=".C_XOUT > .pin1" to=".Y1 > .pin3" />
    <trace name="CXOUT_G" from=".C_XOUT > .pin2" to="net.GND" {...gndLabel} />
  </subcircuit>
)
