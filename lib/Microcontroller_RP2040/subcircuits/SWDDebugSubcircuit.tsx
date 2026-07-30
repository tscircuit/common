import { schSections } from "./schematicSections"

export const SWDDebugSubcircuit = ({ parentName }: { parentName: string }) => (
  <subcircuit name="SWD_DEBUG" pcbX={0} pcbY={-22}>
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
  </subcircuit>
)
