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
    pcbX={9.91}
    pcbY={-10}
    width={7.58}
    height={5.45}
    exposedNets={["GND", "V3V3"]}
  >
    <resistor
      name="R_RUN"
      resistance="10k"
      footprint="0402"
      schSectionName={schSections.controls(parentName)}
      pcbX={-2.91}
      pcbY={0}
      schX={12.5}
      schY={-11}
    />
    <SKRPACE010
      name="SW_RUN"
      schSectionName={schSections.controls(parentName)}
      pcbX={2.09}
      pcbY={0}
      pcbRotation={90}
      schX={12.5}
      schY={-9.4}
    />
    <trace name="RUN_SW" from=".R_RUN > .pin1" to=".SW_RUN > .pin1" />
    <trace name="RUN_3V3" from=".R_RUN > .pin2" to="net.V3V3" {...v3v3Label} />
    <trace name="RUN_G" from=".SW_RUN > .pin4" to="net.GND" {...gndLabel} />
  </subcircuit>
)
