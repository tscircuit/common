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

The MT3608 power-boost subcircuit includes its battery connector, cutoff
MOSFET, USB-present shutdown, boost converter, feedback divider, and
input/output filtering. Place the power switch on the parent board between
`BAT_POS` and `BAT_SWITCHED`, or connect them to the same net for always-on
operation:

```tsx
import { PowerBoost_MT3608 } from "@tscircuit/common"

return (
  <>
    <PowerBoost_MT3608
      name="POWER"
      exposedNets={["BAT_POS", "BAT_SWITCHED", "VBUS", "VSYS", "GND"]}
    />
    <trace from="net.BAT_POS" to="net.BAT_SWITCHED" />
  </>
)
```

The trace above configures the battery input as always on. Replace it with a
switch between `BAT_POS` and `BAT_SWITCHED` when switched operation is needed.

The Game Boy PAM8403 3 W audio-amplifier subcircuit includes the PWM input
filter, input coupling, amplifier decoupling, speaker EMI filter, and speaker
connector:

```tsx
import { AudioAmplifier3W_PAM8403 } from "@tscircuit/common"

return (
  <AudioAmplifier3W_PAM8403
    name="AUDIO"
    exposedNets={["AUDIO_PWM", "V3V3", "VSYS", "GND"]}
  />
)
```

Internal nets remain private by default. Use `exposedNets` to expose a selected
set, or `exposeNets` when every internal net should be exposed.

Add a tscircuit logo and “Made by AI with tscircuit” to your board's silkscreen:

```tsx
import { MadeByAiSilkscreen } from "@tscircuit/common"

return (
  <board width="40mm" height="25mm">
    <MadeByAiSilkscreen pcbX={0} pcbY={-7} />
  </board>
)
```

The badge includes an embedded monochrome adaptation of the tscircuit ts/dot
logo, so it needs no network access. Use `scale` (default `1`) to resize the
approximately 16 × 6 mm badge uniformly, `pcbRotation` to rotate it in degrees,
and `layer="bottom"` for bottom silkscreen. `pcbX` and `pcbY` position the badge
relative to its parent. It adds no electrical components or copper.
