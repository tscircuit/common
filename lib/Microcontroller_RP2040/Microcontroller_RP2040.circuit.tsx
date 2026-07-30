import type { ChipProps, SubcircuitProps } from "@tscircuit/props"
import { Fragment } from "react"
import {
  AnalogSupplySubcircuit,
  ClockSubcircuit,
  PowerRegulatorSubcircuit,
  QSPIFlashBootSubcircuit,
  RP2040CoreSubcircuit,
  RunControlSubcircuit,
  StatusLEDSubcircuit,
  SWDDebugSubcircuit,
  USBInterfaceSubcircuit,
} from "./subcircuits/index"
import { schSections } from "./subcircuits/schematicSections"

const denseTraceProps = { thickness: "0.1mm" } as const

export type MicrocontrollerRP2040Props = Omit<
  SubcircuitProps,
  "children" | "connections"
> & {
  connections?: ChipProps["connections"]
}

/**
 * Complete Pico-style RP2040 support circuit adapted from
 * https://tscircuit.com/abse/gameboy.
 */
export const Microcontroller_RP2040 = ({
  name = "Microcontroller_RP2040",
  connections,
  ...props
}: MicrocontrollerRP2040Props) => (
  <subcircuit name={name} {...props}>
    <schematicsection
      name={schSections.rp2040(name)}
      displayName="RP2040 & Power"
    />
    <schematicsection
      name={schSections.usb(name)}
      displayName="Programming USB-C & QSPI"
    />
    <schematicsection name={schSections.clock(name)} displayName="Clock" />
    <schematicsection
      name={schSections.status(name)}
      displayName="Status & SWD Debug"
    />

    {/*
     * Declaring shared parent nets before the children prevents two exposed
     * child nets from independently creating duplicate parent nets.
     */}
    <net name="GND" />
    <net name="V3V3" />
    <net name="VBUS" />
    <net name="ADC_VREF" />

    <RP2040CoreSubcircuit parentName={name} />
    <USBInterfaceSubcircuit parentName={name} />
    <QSPIFlashBootSubcircuit parentName={name} />
    <ClockSubcircuit parentName={name} />
    <PowerRegulatorSubcircuit parentName={name} />
    <AnalogSupplySubcircuit parentName={name} />
    <RunControlSubcircuit parentName={name} />
    <StatusLEDSubcircuit parentName={name} />
    <SWDDebugSubcircuit parentName={name} />

    {Object.entries(connections ?? {}).flatMap(([pinName, targets]) =>
      (Array.isArray(targets) ? targets : [targets]).map((target, index) => (
        <Fragment key={`public_${pinName}_${index}`}>
          <trace
            name={`PUBLIC_${pinName}_${index}`}
            from={`.RP2040_CORE > .U1 > .${pinName}`}
            to={target as string}
          />
        </Fragment>
      )),
    )}

    {/* True cross-subcircuit signals remain owned and routed by the parent. */}
    <trace
      {...denseTraceProps}
      name="QSPI_SS"
      from=".RP2040_CORE > .U1 > .QSPI_SS"
      to=".QSPI_FLASH_BOOT > .U2 > .CS"
      schDisplayLabel="QSPI_SS"
    />
    <trace
      {...denseTraceProps}
      name="QSPI_SD0"
      from=".RP2040_CORE > .U1 > .QSPI_SD0"
      to=".QSPI_FLASH_BOOT > .U2 > .pin5"
      schDisplayLabel="QSPI_SD0"
    />
    <trace
      {...denseTraceProps}
      name="QSPI_SD1"
      from=".RP2040_CORE > .U1 > .QSPI_SD1"
      to=".QSPI_FLASH_BOOT > .U2 > .pin2"
      schDisplayLabel="QSPI_SD1"
    />
    <trace
      {...denseTraceProps}
      name="QSPI_SD2"
      from=".RP2040_CORE > .U1 > .QSPI_SD2"
      to=".QSPI_FLASH_BOOT > .U2 > .pin3"
      schDisplayLabel="QSPI_SD2"
    />
    <trace
      {...denseTraceProps}
      name="QSPI_SD3"
      from=".RP2040_CORE > .U1 > .QSPI_SD3"
      to=".QSPI_FLASH_BOOT > .U2 > .pin7"
      schDisplayLabel="QSPI_SD3"
    />
    <trace
      {...denseTraceProps}
      name="QSPI_SCLK"
      from=".RP2040_CORE > .U1 > .QSPI_SCLK"
      to=".QSPI_FLASH_BOOT > .U2 > .CLK"
      schDisplayLabel="QSPI_SCLK"
    />

    <trace
      {...denseTraceProps}
      name="USB_DN"
      from=".USB_INTERFACE > .R_USB1 > .pin2"
      to=".RP2040_CORE > .U1 > .USB_DM"
    />
    <trace
      {...denseTraceProps}
      name="USB_DP"
      from=".USB_INTERFACE > .R_USB2 > .pin2"
      to=".RP2040_CORE > .U1 > .USB_DP"
    />

    <trace
      name="XIN"
      from=".CLOCK > .Y1 > .pin1"
      to=".RP2040_CORE > .U1 > .XIN"
    />
    <trace
      name="XOUT"
      from=".CLOCK > .Y1 > .pin3"
      to=".RP2040_CORE > .U1 > .XOUT"
    />

    <trace
      {...denseTraceProps}
      name="RUN_R"
      from=".RUN_CONTROL > .R_RUN > .pin1"
      to=".RP2040_CORE > .U1 > .RUN"
    />
    <trace
      name="LED_GP25"
      from=".RP2040_CORE > .U1 > .GPIO25"
      to=".STATUS_LED > .R_LED > .pin1"
    />
    <trace
      name="SWCLK"
      from=".RP2040_CORE > .U1 > .SWCLK"
      to=".SWD_DEBUG > .TP_SWCLK > .pin1"
    />
    <trace
      name="SWD"
      from=".RP2040_CORE > .U1 > .SWD"
      to=".SWD_DEBUG > .TP_SWDIO > .pin1"
    />

    <silkscreentext text="BOOT" fontSize="0.8mm" pcbX={12} pcbY={14} />
    <silkscreentext text="RUN" fontSize="0.8mm" pcbX={-12} pcbY={-30} />
    <silkscreentext text="PWR" fontSize="0.8mm" pcbX={-9.8} pcbY={27.4} />
    <silkscreentext text="USB-C" fontSize="0.9mm" pcbX={0} pcbY={25} />
  </subcircuit>
)

/**
 * Keep the standalone component snapshot deterministic across Bun versions.
 * Routed integration coverage lives in the USB-C example snapshot.
 */
export default function MicrocontrollerRP2040Snapshot() {
  return (
    <board width="30mm" height="70mm">
      <Microcontroller_RP2040 />
    </board>
  )
}
