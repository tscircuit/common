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
const gndLabel = { displayName: "GND", schDisplayLabel: "GND" } as const
const vbusLabel = { displayName: "VBUS", schDisplayLabel: "VBUS" } as const
const vsysLabel = { displayName: "VSYS", schDisplayLabel: "VSYS" } as const
const v3v3Label = { displayName: "V3V3", schDisplayLabel: "V3V3" } as const
const v1v1Label = { displayName: "V1V1", schDisplayLabel: "V1V1" } as const
const adcRefLabel = {
  displayName: "ADC_REF",
  schDisplayLabel: "ADC_REF",
} as const
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

    <trace
      name="Y1_G1"
      from=".CLOCK > .Y1 > .pin2"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      name="Y1_G2"
      from=".CLOCK > .Y1 > .pin4"
      to="net.GND"
      {...gndLabel}
    />

    <trace
      name="USB_DN_B"
      from=".USB_INTERFACE > .J_USB > .B7"
      to=".USB_INTERFACE > .R_USB1 > .pin1"
    />
    <trace
      name="USB_DP_B"
      from=".USB_INTERFACE > .J_USB > .B6"
      to=".USB_INTERFACE > .R_USB2 > .pin1"
    />

    <trace
      name="VBUS_D"
      from="net.VBUS"
      to=".POWER_REGULATOR > .D_VBUS > .anode"
      {...vbusLabel}
    />
    <trace
      name="D_VSYS"
      from=".POWER_REGULATOR > .D_VBUS > .cathode"
      to="net.VSYS"
      {...vsysLabel}
    />

    <trace
      name="EN_VSYS"
      from=".POWER_REGULATOR > .R_3V3_EN > .pin1"
      to="net.VSYS"
      {...vsysLabel}
    />
    <trace
      name="EN_R"
      from=".POWER_REGULATOR > .R_3V3_EN > .pin2"
      to=".POWER_REGULATOR > .U3 > .EN"
    />

    <trace
      name="IO5_3V3"
      from=".RP2040_CORE > .C_IOVDD5 > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      name="IO5_G"
      from=".RP2040_CORE > .C_IOVDD5 > .pin2"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      name="IO6_3V3"
      from=".RP2040_CORE > .C_IOVDD6 > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      name="IO6_G"
      from=".RP2040_CORE > .C_IOVDD6 > .pin2"
      to="net.GND"
      {...gndLabel}
    />

    <trace
      name="IO3_3V3"
      from=".RP2040_CORE > .C_IOVDD3 > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      name="IO3_G"
      from=".RP2040_CORE > .C_IOVDD3 > .pin2"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      name="IO4_3V3"
      from=".RP2040_CORE > .C_IOVDD4 > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      name="IO4_G"
      from=".RP2040_CORE > .C_IOVDD4 > .pin2"
      to="net.GND"
      {...gndLabel}
    />

    {/* RUN pullup */}
    <trace
      {...denseTraceProps}
      name="RUN_R"
      from=".RUN_CONTROL > .R_RUN > .pin1"
      to=".RP2040_CORE > .U1 > .RUN"
    />
    <trace
      name="RUN_3V3"
      from=".RUN_CONTROL > .R_RUN > .pin2"
      to="net.V3V3"
      {...v3v3Label}
    />

    {/* TESTEN */}
    <trace
      name="TEST_G"
      from=".RP2040_CORE > .U1 > .TESTEN"
      to="net.GND"
      {...gndLabel}
    />

    {/* Flash decoupling */}
    <trace
      name="FLSH_3V3"
      from=".QSPI_FLASH_BOOT > .C_FLASH > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      name="FLSH_G"
      from=".QSPI_FLASH_BOOT > .C_FLASH > .pin2"
      to="net.GND"
      {...gndLabel}
    />

    {/* IOVDD decoupling */}
    <trace
      name="IO1_3V3"
      from=".RP2040_CORE > .C_IOVDD1 > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      name="IO1_G"
      from=".RP2040_CORE > .C_IOVDD1 > .pin2"
      to="net.GND"
      {...gndLabel}
    />

    <trace
      name="IO2_3V3"
      from=".RP2040_CORE > .C_IOVDD2 > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      name="IO2_G"
      from=".RP2040_CORE > .C_IOVDD2 > .pin2"
      to="net.GND"
      {...gndLabel}
    />

    {/* USB_VDD decoupling */}
    <trace
      name="UVDD_3V3"
      from=".USB_INTERFACE > .C_USB_VDD > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      name="UVDD_G"
      from=".USB_INTERFACE > .C_USB_VDD > .pin2"
      to="net.GND"
      {...gndLabel}
    />

    {/* ADC decoupling */}
    <trace
      name="ADC_REF"
      from=".ANALOG_SUPPLY > .C_ADC > .pin1"
      to="net.ADC_VREF"
      {...adcRefLabel}
    />
    <trace
      name="ADC_G"
      from=".ANALOG_SUPPLY > .C_ADC > .pin2"
      to="net.GND"
      {...gndLabel}
    />

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
      name="IOVDD1_P"
      from=".RP2040_CORE > .U1 > .IOVDD1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      {...denseTraceProps}
      name="IOVDD2_P"
      from=".RP2040_CORE > .U1 > .IOVDD2"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      {...denseTraceProps}
      name="IOVDD3_P"
      from=".RP2040_CORE > .U1 > .IOVDD3"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      {...denseTraceProps}
      name="IOVDD4_P"
      from=".RP2040_CORE > .U1 > .IOVDD4"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      {...denseTraceProps}
      name="IOVDD5_P"
      from=".RP2040_CORE > .U1 > .IOVDD5"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      {...denseTraceProps}
      name="IOVDD6_P"
      from=".RP2040_CORE > .U1 > .IOVDD6"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      {...denseTraceProps}
      name="DVDD1_P"
      from=".RP2040_CORE > .U1 > .DVDD1"
      to="net.V1V1"
      {...v1v1Label}
    />
    <trace
      {...denseTraceProps}
      name="DVDD2_P"
      from=".RP2040_CORE > .U1 > .DVDD2"
      to="net.V1V1"
      {...v1v1Label}
    />
    <trace
      {...denseTraceProps}
      name="VREG_IN_P"
      from=".RP2040_CORE > .U1 > .VREG_IN"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      {...denseTraceProps}
      name="VREG_VOUT_P"
      from=".RP2040_CORE > .U1 > .VREG_VOUT"
      to="net.V1V1"
      {...v1v1Label}
    />
    <trace
      {...denseTraceProps}
      name="USB_VDD_P"
      from=".RP2040_CORE > .U1 > .USB_VDD"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      name="GND_G"
      from=".RP2040_CORE > .U1 > .GND"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      {...denseTraceProps}
      name="USBV_IO1"
      from=".RP2040_CORE > .U1 > .USB_VDD"
      to=".RP2040_CORE > .U1 > .IOVDD1"
    />
    <trace
      name="VBUS_A"
      from=".USB_INTERFACE > .J_USB > .A4B9"
      to="net.VBUS"
      {...vbusLabel}
    />
    <trace
      name="VBUS_B"
      from=".USB_INTERFACE > .J_USB > .B4A9"
      to="net.VBUS"
      {...vbusLabel}
    />
    <trace
      name="USB_DN_A"
      from=".USB_INTERFACE > .J_USB > .A7"
      to=".USB_INTERFACE > .R_USB1 > .pin1"
    />
    <trace
      {...denseTraceProps}
      name="USB_DN"
      from=".USB_INTERFACE > .R_USB1 > .pin2"
      to=".RP2040_CORE > .U1 > .USB_DM"
    />
    <trace
      name="USB_DP_A"
      from=".USB_INTERFACE > .J_USB > .A6"
      to=".USB_INTERFACE > .R_USB2 > .pin1"
    />
    <trace
      {...denseTraceProps}
      name="USB_DP"
      from=".USB_INTERFACE > .R_USB2 > .pin2"
      to=".RP2040_CORE > .U1 > .USB_DP"
    />
    <trace
      {...denseTraceProps}
      name="CC1"
      from=".USB_INTERFACE > .J_USB > .A5"
      to=".USB_INTERFACE > .R_CC1 > .pin1"
    />
    <trace
      {...denseTraceProps}
      name="CC2"
      from=".USB_INTERFACE > .J_USB > .B5"
      to=".USB_INTERFACE > .R_CC2 > .pin1"
    />
    <trace
      {...denseTraceProps}
      name="USB_G"
      from=".USB_INTERFACE > .J_USB > .A1B12"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      {...denseTraceProps}
      name="USB_G_B"
      from=".USB_INTERFACE > .J_USB > .B1A12"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      {...denseTraceProps}
      name="USB_EH1"
      from=".USB_INTERFACE > .J_USB > .EH1"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      {...denseTraceProps}
      name="USB_EH1_ALT"
      from=".USB_INTERFACE > .J_USB > .pin13_alt1"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      {...denseTraceProps}
      name="USB_EH2"
      from=".USB_INTERFACE > .J_USB > .EH2"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      {...denseTraceProps}
      name="USB_EH2_ALT"
      from=".USB_INTERFACE > .J_USB > .pin14_alt1"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      name="CC1_G"
      from=".USB_INTERFACE > .R_CC1 > .pin2"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      name="CC2_G"
      from=".USB_INTERFACE > .R_CC2 > .pin2"
      to="net.GND"
      {...gndLabel}
    />

    <trace
      name="VBUS_C"
      from="net.VBUS"
      to=".USB_INTERFACE > .C_VBUS > .pin1"
      {...vbusLabel}
    />
    <trace
      name="VBUS_G"
      from=".USB_INTERFACE > .C_VBUS > .pin2"
      to="net.GND"
      {...gndLabel}
    />

    <trace
      name="VSYS_IN"
      from="net.VSYS"
      to=".POWER_REGULATOR > .U3 > .VIN"
      {...vsysLabel}
    />

    <trace
      name="REG_3V3"
      from=".POWER_REGULATOR > .U3 > .VOUT"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      name="REG_G"
      from=".POWER_REGULATOR > .U3 > .GND"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      name="C3V3_P"
      from=".POWER_REGULATOR > .C_3V3 > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      name="C3V3_G"
      from=".POWER_REGULATOR > .C_3V3 > .pin2"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      name="CORE_P"
      from=".RP2040_CORE > .C_CORE > .pin1"
      to="net.V1V1"
      {...v1v1Label}
    />
    <trace
      name="CORE_G"
      from=".RP2040_CORE > .C_CORE > .pin2"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      name="CUSB_P"
      from=".USB_INTERFACE > .C_USB > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      name="CUSB_G"
      from=".USB_INTERFACE > .C_USB > .pin2"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      name="AVDD_IN"
      from=".ANALOG_SUPPLY > .L_AVDD > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      name="AVDD"
      from=".ANALOG_SUPPLY > .L_AVDD > .pin2"
      to="net.ADC_VREF"
      {...adcRefLabel}
    />
    <trace
      name="ADC_AVDD"
      from=".RP2040_CORE > .U1 > .ADC_AVDD"
      to="net.ADC_VREF"
      {...adcRefLabel}
    />
    <trace
      name="FLSH_GND"
      from=".QSPI_FLASH_BOOT > .U2 > .GND"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      name="FLSH_VCC"
      from=".QSPI_FLASH_BOOT > .U2 > .VCC"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      name="FLSH_EP"
      from=".QSPI_FLASH_BOOT > .U2 > .EP"
      to="net.GND"
      {...gndLabel}
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
      name="CXIN"
      from=".CLOCK > .C_XIN > .pin1"
      to=".CLOCK > .Y1 > .pin1"
    />
    <trace
      name="CXIN_G"
      from=".CLOCK > .C_XIN > .pin2"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      name="CXOUT"
      from=".CLOCK > .C_XOUT > .pin1"
      to=".CLOCK > .Y1 > .pin3"
    />
    <trace
      name="CXOUT_G"
      from=".CLOCK > .C_XOUT > .pin2"
      to="net.GND"
      {...gndLabel}
    />

    <trace
      name="BOOT_SW"
      from=".QSPI_FLASH_BOOT > .SW_BOOT > .pin1"
      to=".RP2040_CORE > .U1 > .QSPI_SS"
    />
    <trace
      name="BOOT_G"
      from=".QSPI_FLASH_BOOT > .SW_BOOT > .pin3"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      name="BOOT_R"
      from=".QSPI_FLASH_BOOT > .R_BOOT > .pin1"
      to=".RP2040_CORE > .U1 > .QSPI_SS"
    />
    <trace
      name="BOOT_3V3"
      from=".QSPI_FLASH_BOOT > .R_BOOT > .pin2"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      name="RUN_SW"
      from=".RUN_CONTROL > .SW_RUN > .pin1"
      to=".RP2040_CORE > .U1 > .RUN"
    />
    <trace
      name="RUN_G"
      from=".RUN_CONTROL > .SW_RUN > .pin4"
      to="net.GND"
      {...gndLabel}
    />

    <trace
      name="LED_GP25"
      from=".RP2040_CORE > .U1 > .GPIO25"
      to=".STATUS_LED > .R_LED > .pin1"
    />
    <trace
      name="LED_D1"
      from=".STATUS_LED > .R_LED > .pin2"
      to=".STATUS_LED > .D1 > .anode"
    />
    <trace
      name="LED_G"
      from=".STATUS_LED > .D1 > .cathode"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      name="PLED_3V3"
      from="net.V3V3"
      to=".POWER_REGULATOR > .R_PWR_LED > .pin1"
      {...v3v3Label}
    />
    <trace
      name="PLED_D"
      from=".POWER_REGULATOR > .R_PWR_LED > .pin2"
      to=".POWER_REGULATOR > .D_PWR > .anode"
    />
    <trace
      name="PLED_G"
      from=".POWER_REGULATOR > .D_PWR > .cathode"
      to="net.GND"
      {...gndLabel}
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
    <trace
      name="TP_G"
      from=".SWD_DEBUG > .TP_GND > .pin1"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      name="TP3V3_T"
      from=".SWD_DEBUG > .TP_3V3 > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />

    <silkscreentext text="BOOT" fontSize="0.8mm" pcbX={12} pcbY={14} />
    <silkscreentext text="RUN" fontSize="0.8mm" pcbX={-12} pcbY={-30} />
    <silkscreentext text="PWR" fontSize="0.8mm" pcbX={-9.8} pcbY={27.4} />
    <silkscreentext text="USB-C" fontSize="0.9mm" pcbX={0} pcbY={25} />
  </subcircuit>
)
