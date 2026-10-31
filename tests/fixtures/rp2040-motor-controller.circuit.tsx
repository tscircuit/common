import { Microcontroller_RP2040 } from "../../index"

// Reduced from imrishabh18/rp2040-motor-controller v1.0.48:
// index.circuit.tsx and schematic/ControllerSections.tsx. Keep the four-layer
// stack, MCU placement, GPIO use, and controller sheet; omit motor/power stages
// and the saved board-specific route plan to inspect the reusable module.
export default () => (
  <board width={60} height={90} layers={4} routingDisabled>
    <schematicsheet
      name="controller"
      displayName="RP2040 Controller"
      sheetIndex={1}
    />
    <net name="DRIVER_STEP" connectsTo=".MCU > .U1 > .GPIO18" />
    <net name="DRIVER_DIR" connectsTo=".MCU > .U1 > .GPIO19" />
    <group pcbX={-5.625} pcbY={-8.25}>
      <Microcontroller_RP2040
        name="MCU"
        schAutoLayoutEnabled
        schSheetName="controller"
        pcbX={-3.5}
        pcbY={2.5}
      />
    </group>
  </board>
)
