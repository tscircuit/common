import type { SubcircuitProps } from "@tscircuit/props"
import { W25Q128JVSIQ } from "../chips/W25Q128JVSIQ.circuit"

export const FlashMemory_W25Q128JVSIQ = (props: SubcircuitProps) => (
  <subcircuit {...props}>
    <W25Q128JVSIQ
      name="U1"
      pcbX={0}
      pcbY={0}
      schX={0}
      schY={-1.5}
      schWidth={4.2}
      schHeight={1.8}
      schPinArrangement={{
        leftSide: {
          direction: "top-to-bottom",
          pins: ["VCC", "CS", "CLK", "DI_IO0"],
        },
        rightSide: {
          direction: "top-to-bottom",
          pins: ["DO_IO1", "WP_IO2", "HOLD_IO3", "VSS"],
        },
      }}
      schPinStyle={{
        VCC: { marginBottom: 0.25 },
        CS: { marginBottom: 0.25 },
        CLK: { marginBottom: 0.25 },
        DO_IO1: { marginBottom: 0.25 },
        WP_IO2: { marginBottom: 0.25 },
        HOLD_IO3: { marginBottom: 0.25 },
      }}
      connections={{
        VCC: "net.VCC",
        CS: "net.QSPI_SS",
        CLK: "net.QSPI_CLK",
        DI_IO0: "net.QSPI_SD0",
        DO_IO1: "net.QSPI_SD1",
        WP_IO2: "net.QSPI_SD2",
        HOLD_IO3: "net.QSPI_SD3",
        VSS: "net.GND",
      }}
    />

    <capacitor
      name="C1"
      capacitance="100nF"
      footprint="0402"
      pcbX={-4.5}
      pcbY={2.5}
      schX={-0.7}
      schY={3.1}
      schRotation={270}
      connections={{
        pin1: "net.VCC",
        pin2: "net.GND",
      }}
    />
    <capacitor
      name="C2"
      capacitance="4.7uF"
      footprint="0603"
      pcbX={-4.5}
      pcbY={0.8}
      schX={0.7}
      schY={3.1}
      schRotation={270}
      connections={{
        pin1: "net.VCC",
        pin2: "net.GND",
      }}
    />
  </subcircuit>
)

export default FlashMemory_W25Q128JVSIQ
