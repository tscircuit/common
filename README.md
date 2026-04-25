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
