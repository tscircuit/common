# Motor-controller support-circuit reproduction

Reduced from [imrishabh18/rp2040-motor-controller v1.0.48](https://tscircuit.com/imrishabh18/rp2040-motor-controller): `index.circuit.tsx`, `schematic/ControllerSections.tsx`, `vendor/rp2040.js`, and `patches/@tscircuit%2Fcommon@0.0.48.patch`.

The native TSX fixture keeps the four-layer board, controller sheet, MCU/group placement and STEP/DIR GPIO connections. It imports the upstream module directly, removing the downstream vendor replacement, motor stages and saved routing plan. Routing is disabled so the electrical regressions do not depend on the unrelated motor layout.

Run:

```sh
bun install --frozen-lockfile
bun test tests/rp2040-motor-controller.test.tsx
bunx tsci snapshot tests/fixtures/rp2040-motor-controller.circuit.tsx --test
```

Before the fix, the tests expose three differences that the downstream patch repairs:

- Neither 100 nF DVDD bypass exists; physical RP2040 pins 50 and 23 have no dedicated bypass capacitor.
- Y1 selects X322512MSB4SI, both load capacitors are 18 pF, and XOUT directly connects to the crystal without R_XOUT. The downstream uses ABM8-272-T3, two 15 pF capacitors, and a 1 kΩ series resistor.
- L_AVDD selects C1002 without a manufacturer part number, rather than the declared 600 Ω at 100 MHz BLM18AG601SN1D/C19330.

After the fix, the tests inspect the rendered source circuit, check the dedicated bypass connections and returns, verify the oscillator values and physical-pin topology (including absence of a resistor bypass), and check the ferrite BOM entry. The fixture has PCB and schematic snapshots. These reproduce design/metadata defects; no physical oscillator or motor-board hardware failure is claimed.

The oscillator and bypass changes follow [Raspberry Pi's Hardware design with RP2040](https://datasheets.raspberrypi.com/rp2040/hardware-design-with-rp2040.pdf), sections 2.1.2 and 2.3. ABM8-272-T3's actual 10 pF load, 50 Ω ESR and 200 µW maximum drive are documented by [Abracon](https://abracon.com/datasheets/ABM8-272-T3.pdf). The two 15 pF capacitors and series resistor are the matching 3.3 V reference network, rather than merely changing the old crystal's declared specification. The new crystal wrapper uses the original project's imported C20625731 pad coordinates and model reference. [LCSC lists C19330](https://www.lcsc.com/product-detail/C19330.html) as BLM18AG601SN1D, a 0603 600 Ω at 100 MHz ferrite bead.

The downstream patch also includes board-specific placement, explicit saved-route paths, sheet-name special cases, a subcircuit-to-group conversion, and extra supplier choices. Those are not needed to reproduce these support-circuit defects and are not ported wholesale. The module retains its subcircuit boundary and existing schematic sections. The new series resistor is placed clear of the upstream crystal and load-capacitor lands rather than copying its downstream placement into a different layout. The complete downstream board has not been rerouted by this reproduction.
