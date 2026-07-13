# @tscircuit/common

These are community-contributed "common" boards or components distributed with [tscircuit](https://github.com/tscircuit/tscircuit)

```tsx
import { ArduinoShield } from "tscircuit/common"

return (
  <ArduinoShield
    chipProps={{ connections: { GND1: "net.GND" } }}
    boardProps={{ solderMaskColor: "blue", autorouter: "auto" }}
  >
    {/* ... */}
  </ArduinoShield>
)
```

The RP2040 subcircuit includes the microcontroller, QSPI flash, crystal, USB-C,
power regulation, decoupling, boot/run controls, and SWD test points:

```tsx
import { Microcontroller_RP2040 } from "@tscircuit/common"

return <Microcontroller_RP2040 name="MCU" pcbX={0} pcbY={0} />
```
