import { SKRPACE010 } from "../imports/SKRPACE010"
import { schSections } from "./schematicSections"

const gndLabel = { displayName: "GND", schDisplayLabel: "GND" } as const
const v3v3Label = { displayName: "V3V3", schDisplayLabel: "V3V3" } as const

export const RunControlSubcircuit = ({
  parentName,
}: {
  parentName: string
}) => (
  <subcircuit
    name="RUN_CONTROL"
    pcbX={10}
    pcbY={-10}
    exposedNets={["RUN_SIGNAL"]}
  >
    <resistor
      name="R_RUN"
      resistance="10k"
      footprint="0402"
      schSectionName={schSections.controls(parentName)}
      pcbX={-3}
      pcbY={0}
      schX={12.5}
      schY={-11}
    />
    <SKRPACE010
      name="SW_RUN"
      schSectionName={schSections.controls(parentName)}
      pcbX={2}
      pcbY={0}
      pcbRotation={90}
      schX={12.5}
      schY={-9.4}
    />
    <trace from=".R_RUN > .pin1" to="net.RUN_SIGNAL" />
    <trace from=".R_RUN > .pin2" to="net.V3V3" {...v3v3Label} />
    <trace from=".SW_RUN > .pin1" to="net.RUN_SIGNAL" />
    <trace from=".SW_RUN > .pin1" to=".R_RUN > .pin1" />
    <trace from=".SW_RUN > .pin4" to="net.GND" {...gndLabel} />
  </subcircuit>
)
