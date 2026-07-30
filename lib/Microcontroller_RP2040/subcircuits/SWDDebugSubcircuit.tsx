import { schSections } from "./schematicSections"

const gndLabel = { displayName: "GND", schDisplayLabel: "GND" } as const
const v3v3Label = { displayName: "V3V3", schDisplayLabel: "V3V3" } as const

export const SWDDebugSubcircuit = ({ parentName }: { parentName: string }) => (
  <subcircuit
    name="SWD_DEBUG"
    pcbX={0}
    pcbY={-22}
    width={7.3}
    height={1.3}
    exposedNets={["GND", "V3V3"]}
  >
    {[
      ["TP_SWCLK", -3, 6],
      ["TP_GND", -1, 7.5],
      ["TP_SWDIO", 1, 9],
      ["TP_3V3", 3, 10.5],
    ].map(([testpointName, pcbX, schX]) => (
      <testpoint
        key={testpointName}
        name={testpointName as string}
        footprintVariant="pad"
        padShape="circle"
        padDiameter="1.1mm"
        schSectionName={schSections.debug(parentName)}
        pcbX={pcbX as number}
        pcbY={0}
        schX={schX as number}
        schY={-15.5}
      />
    ))}
    <trace name="TP_G" from=".TP_GND > .pin1" to="net.GND" {...gndLabel} />
    <trace name="TP3V3_T" from=".TP_3V3 > .pin1" to="net.V3V3" {...v3v3Label} />
  </subcircuit>
)
