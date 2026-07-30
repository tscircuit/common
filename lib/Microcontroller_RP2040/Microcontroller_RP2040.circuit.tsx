import type { ChipProps, SubcircuitProps } from "@tscircuit/props"
import { RP2040 } from "./imports/RP2040"
import { TYPE_C_16PIN_2MD_073_ } from "./imports/TYPE_C_16PIN_2MD_073_"
import { W25Q16JVUXIQ } from "./imports/W25Q16JVUXIQ"
import { AP2112K_3_3TRG1 } from "./imports/AP2112K_3_3TRG1"
import { X322512MSB4SI } from "./imports/X322512MSB4SI"
import { SKRPACE010 } from "./imports/SKRPACE010"
import { B5819W_SL } from "./imports/B5819W_SL"
import { XL_1608SURC_06 } from "./imports/XL_1608SURC_06"

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
// Keep every functional subset attached to one of the four visible sections so
// section bounds and dividers account for all schematic components.
const schSections = {
  rp2040: (name: string) => `${name}__rp2040`,
  usb: (name: string) => `${name}__usb`,
  power: (name: string) => `${name}__rp2040`,
  flash: (name: string) => `${name}__usb`,
  clock: (name: string) => `${name}__clock`,
  controls: (name: string) => `${name}__status`,
  display: (name: string) => `${name}__status`,
  status: (name: string) => `${name}__status`,
  debug: (name: string) => `${name}__status`,
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

    <trace name="Y1_G1" from=".Y1 > .pin2" to="net.GND" {...gndLabel} />
    <trace name="Y1_G2" from=".Y1 > .pin4" to="net.GND" {...gndLabel} />

    <trace name="USB_DN_B" from=".J_USB > .B7" to=".R_USB1 > .pin1" />
    <trace name="USB_DP_B" from=".J_USB > .B6" to=".R_USB2 > .pin1" />

    <B5819W_SL
      name="D_VBUS"
      schSectionName={schSections.power(name)}
      pcbX={-2}
      pcbY={21}
      pcbRotation={90}
      schX={3}
      schY={-5.8}
      schRotation={90}
    />
    <trace name="VBUS_D" from="net.VBUS" to=".D_VBUS > .anode" {...vbusLabel} />
    <trace
      name="D_VSYS"
      from=".D_VBUS > .cathode"
      to="net.VSYS"
      {...vsysLabel}
    />

    <resistor
      name="R_3V3_EN"
      resistance="100k"
      footprint="0402"
      schSectionName={schSections.power(name)}
      pcbX={-4.7}
      pcbY={17.3}
      pcbRotation={90}
      schX={3}
      schY={-7}
      schRotation={270}
    />

    <trace
      name="EN_VSYS"
      from=".R_3V3_EN > .pin1"
      to="net.VSYS"
      {...vsysLabel}
    />
    <trace name="EN_R" from=".R_3V3_EN > .pin2" to=".U3 > .EN" />

    <capacitor
      name="C_IOVDD1"
      capacitance="100nF"
      footprint="0402"
      schSectionName={schSections.rp2040(name)}
      schOrientation="vertical"
      pcbX={-4}
      pcbY={-5}
      schX={-11.3}
      schY={-6.4}
    />
    <capacitor
      name="C_IOVDD2"
      capacitance="100nF"
      footprint="0402"
      schSectionName={schSections.rp2040(name)}
      schOrientation="vertical"
      pcbX={-3}
      pcbY={6}
      schX={-9.6}
      schY={-6.4}
    />
    <capacitor
      name="C_IOVDD3"
      capacitance="100nF"
      footprint="0402"
      schSectionName={schSections.rp2040(name)}
      schOrientation="vertical"
      pcbRotation={-90}
      pcbX={-8}
      pcbY={-1}
      schX={-7.9}
      schY={-6.4}
    />
    <capacitor
      name="C_IOVDD4"
      capacitance="100nF"
      footprint="0402"
      schSectionName={schSections.rp2040(name)}
      schOrientation="vertical"
      pcbX={-4}
      pcbY={-6}
      schX={-6.2}
      schY={-6.4}
    />
    <capacitor
      name="C_IOVDD5"
      capacitance="100nF"
      footprint="0402"
      schSectionName={schSections.rp2040(name)}
      schOrientation="vertical"
      pcbRotation={-90}
      pcbX={-6}
      pcbY={-10}
      schX={-4.5}
      schY={-6.4}
    />
    <capacitor
      name="C_IOVDD6"
      capacitance="100nF"
      footprint="0402"
      schSectionName={schSections.rp2040(name)}
      schOrientation="vertical"
      pcbX={-8}
      pcbY={1.6}
      schX={-2.8}
      schY={-6.4}
    />

    <trace
      name="IO5_3V3"
      from=".C_IOVDD5 > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace name="IO5_G" from=".C_IOVDD5 > .pin2" to="net.GND" {...gndLabel} />
    <trace
      name="IO6_3V3"
      from=".C_IOVDD6 > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace name="IO6_G" from=".C_IOVDD6 > .pin2" to="net.GND" {...gndLabel} />

    <trace
      name="IO3_3V3"
      from=".C_IOVDD3 > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace name="IO3_G" from=".C_IOVDD3 > .pin2" to="net.GND" {...gndLabel} />
    <trace
      name="IO4_3V3"
      from=".C_IOVDD4 > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace name="IO4_G" from=".C_IOVDD4 > .pin2" to="net.GND" {...gndLabel} />

    <resistor
      name="R_RUN"
      resistance="10k"
      footprint="0402"
      schSectionName={schSections.controls(name)}
      pcbX={10.4}
      pcbY={-5.5}
      schX={12.8}
      schY={-13.5}
      schRotation={90}
    />

    <capacitor
      name="C_FLASH"
      capacitance="100nF"
      footprint="0402"
      schSectionName={schSections.flash(name)}
      schOrientation="vertical"
      pcbX={-5.5}
      pcbY={10.8}
      pcbRotation={180}
      schX={16.8}
      schY={-1.7}
    />

    <capacitor
      name="C_USB_VDD"
      capacitance="100nF"
      footprint="0402"
      schSectionName={schSections.usb(name)}
      schOrientation="vertical"
      pcbX={7.2}
      pcbY={14.5}
      schX={7.2}
      schY={-2.2}
    />

    <capacitor
      name="C_ADC"
      capacitance="100nF"
      footprint="0402"
      schSectionName={schSections.power(name)}
      schOrientation="vertical"
      pcbX={8}
      pcbY={-4.4}
      schX={1.3}
      schY={-9.2}
    />
    {/* RUN pullup */}
    <trace
      {...denseTraceProps}
      name="RUN_R"
      from=".R_RUN > .pin1"
      to=".U1 > .RUN"
    />
    <trace name="RUN_3V3" from=".R_RUN > .pin2" to="net.V3V3" {...v3v3Label} />

    {/* TESTEN */}
    <trace name="TEST_G" from=".U1 > .TESTEN" to="net.GND" {...gndLabel} />

    {/* Flash decoupling */}
    <trace
      name="FLSH_3V3"
      from=".C_FLASH > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace name="FLSH_G" from=".C_FLASH > .pin2" to="net.GND" {...gndLabel} />

    {/* IOVDD decoupling */}
    <trace
      name="IO1_3V3"
      from=".C_IOVDD1 > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace name="IO1_G" from=".C_IOVDD1 > .pin2" to="net.GND" {...gndLabel} />

    <trace
      name="IO2_3V3"
      from=".C_IOVDD2 > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace name="IO2_G" from=".C_IOVDD2 > .pin2" to="net.GND" {...gndLabel} />

    {/* USB_VDD decoupling */}
    <trace
      name="UVDD_3V3"
      from=".C_USB_VDD > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace name="UVDD_G" from=".C_USB_VDD > .pin2" to="net.GND" {...gndLabel} />

    {/* ADC decoupling */}
    <trace
      name="ADC_REF"
      from=".C_ADC > .pin1"
      to="net.ADC_VREF"
      {...adcRefLabel}
    />
    <trace name="ADC_G" from=".C_ADC > .pin2" to="net.GND" {...gndLabel} />

    <TYPE_C_16PIN_2MD_073_
      name="J_USB"
      schSectionName={schSections.usb(name)}
      pcbX={0}
      pcbY={31.0}
      pcbRotation={180}
      schX={10.5}
      schY={-5.3}
      schWidth={2.6}
      schHeight={1.8}
      schPinArrangement={{
        leftSide: [13, 15, 17, 18, 20, 22, 23, 25],
        rightSide: [14, 16, 28, 27, 26, 24, 21, 19],
      }}
    />

    <RP2040
      name="U1"
      connections={connections}
      showPinAliases
      schSectionName={schSections.rp2040(name)}
      pcbX={0}
      pcbY={0.5}
      schX={-0.08}
      schY={-2.5}
      schWidth={2.8}
      schHeight={5.8}
    />
    <W25Q16JVUXIQ
      name="U2"
      schSectionName={schSections.flash(name)}
      pcbX={3.4}
      pcbY={9.5}
      pcbRotation={90}
      schX={17}
      schY={-4}
      schHeight={2}
      schPinArrangement={{
        leftSide: [8, 1, 2, 3, 5, 6, 7, 4, 9],
      }}
    />
    <AP2112K_3_3TRG1
      name="U3"
      schSectionName={schSections.power(name)}
      pcbX={-7.2}
      pcbY={20.2}
      pcbRotation={180}
      schX={1.3}
      schY={-7.8}
      schHeight={0.6}
    />

    <X322512MSB4SI
      name="Y1"
      schSectionName={schSections.clock(name)}
      pcbX={-0.5}
      pcbY={-6}
      schX={1.2}
      schY={-12.5}
    />
    <SKRPACE010
      name="SW_BOOT"
      schSectionName={schSections.controls(name)}
      pcbX={8.6}
      pcbY={21.8}
      schX={8.6}
      schY={-12}
    />
    <SKRPACE010
      name="SW_RUN"
      schSectionName={schSections.controls(name)}
      pcbX={5.5}
      pcbY={-12.5}
      pcbRotation={90}
      schX={12.8}
      schY={-12}
    />
    <XL_1608SURC_06
      name="D1"
      color="green"
      schSectionName={schSections.status(name)}
      pcbX={10}
      pcbY={4.2}
      pcbRotation={90}
      schX={10.4}
      schY={-13.2}
      schRotation={270}
    />
    <XL_1608SURC_06
      name="D_PWR"
      color="green"
      schSectionName={schSections.status(name)}
      pcbX={-9.8}
      pcbY={24.8}
      pcbRotation={90}
      schX={14.5}
      schY={-13.4}
      schRotation={270}
    />

    <resistor
      name="R_BOOT"
      resistance="10k"
      footprint="0402"
      schSectionName={schSections.controls(name)}
      pcbX={12}
      pcbY={17.8}
      pcbRotation={90}
      schX={8.6}
      schY={-13.5}
      schRotation={90}
    />
    <resistor
      name="R_LED"
      resistance="330"
      footprint="0402"
      schSectionName={schSections.status(name)}
      pcbX={7.2}
      pcbY={1.2}
      pcbRotation={90}
      schX={10.4}
      schY={-12.2}
      schRotation={270}
    />
    <resistor
      name="R_PWR_LED"
      resistance="330"
      footprint="0402"
      schSectionName={schSections.status(name)}
      pcbX={-6.2}
      pcbY={24.8}
      pcbRotation={90}
      schX={14.5}
      schY={-12.2}
      schRotation={270}
    />
    <resistor
      name="R_CC1"
      resistance="5.1k"
      footprint="0402"
      schSectionName={schSections.usb(name)}
      pcbX={-0.2}
      pcbY={25.6}
      schX={7.2}
      schY={-7.5}
      schRotation={270}
    />
    <resistor
      name="R_CC2"
      resistance="5.1k"
      footprint="0402"
      schSectionName={schSections.usb(name)}
      pcbX={3.6}
      pcbY={26.5}
      schX={14.8}
      schY={-6.5}
      schRotation={270}
    />
    <resistor
      name="R_USB1"
      resistance="27"
      footprint="0402"
      schSectionName={schSections.usb(name)}
      pcbX={3.4}
      pcbY={22.5}
      pcbRotation={90}
      schX={13.3}
      schY={-7.7}
    />
    <resistor
      name="R_USB2"
      resistance="27"
      footprint="0402"
      schSectionName={schSections.usb(name)}
      pcbX={2.4}
      pcbY={16.5}
      pcbRotation={-90}
      schX={13.3}
      schY={-6.6}
    />

    <capacitor
      name="C_VBUS"
      capacitance="10uF"
      footprint="0603"
      schSectionName={schSections.usb(name)}
      schOrientation="vertical"
      pcbX={-2.8}
      pcbY={26.3}
      pcbRotation={90}
      schX={9}
      schY={-2.2}
    />
    <capacitor
      name="C_3V3"
      capacitance="10uF"
      footprint="0603"
      schSectionName={schSections.power(name)}
      schOrientation="vertical"
      pcbX={-8.5}
      pcbY={4.2}
      schX={4.1}
      schY={-7.8}
    />
    <capacitor
      name="C_CORE"
      capacitance="1uF"
      footprint="0402"
      schSectionName={schSections.rp2040(name)}
      schOrientation="vertical"
      pcbX={3.8}
      pcbY={-5.5}
      schX={-3.65}
      schY={-3.7}
    />
    <capacitor
      name="C_USB"
      capacitance="1uF"
      footprint="0402"
      schSectionName={schSections.usb(name)}
      schOrientation="vertical"
      pcbX={9.8}
      pcbY={18.4}
      schX={10.8}
      schY={-2.2}
    />
    <capacitor
      name="C_XIN"
      capacitance="18pF"
      footprint="0402"
      schSectionName={schSections.clock(name)}
      schOrientation="vertical"
      pcbX={-8.4}
      pcbY={-11.8}
      schX={0.4}
      schY={-14.2}
    />
    <capacitor
      name="C_XOUT"
      capacitance="18pF"
      footprint="0402"
      schSectionName={schSections.clock(name)}
      schOrientation="vertical"
      pcbX={-2.4}
      pcbY={-21}
      schX={2.2}
      schY={-14.2}
    />
    <inductor
      name="L_AVDD"
      inductance="600ohm@100MHz"
      footprint="0603"
      schSectionName={schSections.power(name)}
      pcbX={8.5}
      pcbY={-1.8}
      supplierPartNumbers={{ jlcpcb: ["C1002"] }}
      pcbRotation={90}
      schX={3.7}
      schY={-9.2}
    />

    <testpoint
      name="TP_SWCLK"
      footprintVariant="pad"
      padShape="circle"
      padDiameter="1.1mm"
      schSectionName={schSections.debug(name)}
      pcbX={-6}
      pcbY={-31}
      schX={8.6}
      schY={-16.5}
    />
    <testpoint
      name="TP_GND"
      footprintVariant="pad"
      padShape="circle"
      padDiameter="1.1mm"
      schSectionName={schSections.debug(name)}
      pcbX={-2}
      pcbY={-31}
      schX={10.4}
      schY={-16.5}
    />
    <testpoint
      name="TP_SWDIO"
      footprintVariant="pad"
      padShape="circle"
      padDiameter="1.1mm"
      schSectionName={schSections.debug(name)}
      pcbX={2}
      pcbY={-31}
      schX={12.2}
      schY={-16.5}
    />
    <testpoint
      name="TP_3V3"
      footprintVariant="pad"
      padShape="circle"
      padDiameter="1.1mm"
      schSectionName={schSections.debug(name)}
      pcbX={6}
      pcbY={-31}
      schX={14}
      schY={-16.5}
    />

    <trace
      {...denseTraceProps}
      name="QSPI_SS"
      from=".U1 > .QSPI_SS"
      to=".U2 > .CS"
      schDisplayLabel="QSPI_SS"
    />
    <trace
      {...denseTraceProps}
      name="QSPI_SD0"
      from=".U1 > .QSPI_SD0"
      to=".U2 > .pin5"
      schDisplayLabel="QSPI_SD0"
    />
    <trace
      {...denseTraceProps}
      name="QSPI_SD1"
      from=".U1 > .QSPI_SD1"
      to=".U2 > .pin2"
      schDisplayLabel="QSPI_SD1"
    />
    <trace
      {...denseTraceProps}
      name="QSPI_SD2"
      from=".U1 > .QSPI_SD2"
      to=".U2 > .pin3"
      schDisplayLabel="QSPI_SD2"
    />
    <trace
      {...denseTraceProps}
      name="QSPI_SD3"
      from=".U1 > .QSPI_SD3"
      to=".U2 > .pin7"
      schDisplayLabel="QSPI_SD3"
    />
    <trace
      {...denseTraceProps}
      name="QSPI_SCLK"
      from=".U1 > .QSPI_SCLK"
      to=".U2 > .CLK"
      schDisplayLabel="QSPI_SCLK"
    />

    <trace
      {...denseTraceProps}
      name="IOVDD1_P"
      from=".U1 > .IOVDD1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      {...denseTraceProps}
      name="IOVDD2_P"
      from=".U1 > .IOVDD2"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      {...denseTraceProps}
      name="IOVDD3_P"
      from=".U1 > .IOVDD3"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      {...denseTraceProps}
      name="IOVDD4_P"
      from=".U1 > .IOVDD4"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      {...denseTraceProps}
      name="IOVDD5_P"
      from=".U1 > .IOVDD5"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      {...denseTraceProps}
      name="IOVDD6_P"
      from=".U1 > .IOVDD6"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      {...denseTraceProps}
      name="DVDD1_P"
      from=".U1 > .DVDD1"
      to="net.V1V1"
      {...v1v1Label}
    />
    <trace
      {...denseTraceProps}
      name="DVDD2_P"
      from=".U1 > .DVDD2"
      to="net.V1V1"
      {...v1v1Label}
    />
    <trace
      {...denseTraceProps}
      name="VREG_IN_P"
      from=".U1 > .VREG_IN"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace
      {...denseTraceProps}
      name="VREG_VOUT_P"
      from=".U1 > .VREG_VOUT"
      to="net.V1V1"
      {...v1v1Label}
    />
    <trace
      {...denseTraceProps}
      name="USB_VDD_P"
      from=".U1 > .USB_VDD"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace name="GND_G" from=".U1 > .GND" to="net.GND" {...gndLabel} />
    <trace
      {...denseTraceProps}
      name="USBV_IO1"
      from=".U1 > .USB_VDD"
      to=".U1 > .IOVDD1"
    />
    <trace name="VBUS_A" from=".J_USB > .A4B9" to="net.VBUS" {...vbusLabel} />
    <trace name="VBUS_B" from=".J_USB > .B4A9" to="net.VBUS" {...vbusLabel} />
    <trace name="USB_DN_A" from=".J_USB > .A7" to=".R_USB1 > .pin1" />
    <trace
      {...denseTraceProps}
      name="USB_DN"
      from=".R_USB1 > .pin2"
      to=".U1 > .USB_DM"
    />
    <trace name="USB_DP_A" from=".J_USB > .A6" to=".R_USB2 > .pin1" />
    <trace
      {...denseTraceProps}
      name="USB_DP"
      from=".R_USB2 > .pin2"
      to=".U1 > .USB_DP"
    />
    <trace
      {...denseTraceProps}
      name="CC1"
      from=".J_USB > .A5"
      to=".R_CC1 > .pin1"
    />
    <trace
      {...denseTraceProps}
      name="CC2"
      from=".J_USB > .B5"
      to=".R_CC2 > .pin1"
    />
    <trace
      {...denseTraceProps}
      name="USB_G"
      from=".J_USB > .A1B12"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      {...denseTraceProps}
      name="USB_G_B"
      from=".J_USB > .B1A12"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      {...denseTraceProps}
      name="USB_EH1"
      from=".J_USB > .EH1"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      {...denseTraceProps}
      name="USB_EH1_ALT"
      from=".J_USB > .pin13_alt1"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      {...denseTraceProps}
      name="USB_EH2"
      from=".J_USB > .EH2"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      {...denseTraceProps}
      name="USB_EH2_ALT"
      from=".J_USB > .pin14_alt1"
      to="net.GND"
      {...gndLabel}
    />
    <trace name="CC1_G" from=".R_CC1 > .pin2" to="net.GND" {...gndLabel} />
    <trace name="CC2_G" from=".R_CC2 > .pin2" to="net.GND" {...gndLabel} />

    <trace name="VBUS_C" from="net.VBUS" to=".C_VBUS > .pin1" {...vbusLabel} />
    <trace name="VBUS_G" from=".C_VBUS > .pin2" to="net.GND" {...gndLabel} />

    <trace name="VSYS_IN" from="net.VSYS" to=".U3 > .VIN" {...vsysLabel} />

    <trace name="REG_3V3" from=".U3 > .VOUT" to="net.V3V3" {...v3v3Label} />
    <trace name="REG_G" from=".U3 > .GND" to="net.GND" {...gndLabel} />
    <trace name="C3V3_P" from=".C_3V3 > .pin1" to="net.V3V3" {...v3v3Label} />
    <trace name="C3V3_G" from=".C_3V3 > .pin2" to="net.GND" {...gndLabel} />
    <trace name="CORE_P" from=".C_CORE > .pin1" to="net.V1V1" {...v1v1Label} />
    <trace name="CORE_G" from=".C_CORE > .pin2" to="net.GND" {...gndLabel} />
    <trace name="CUSB_P" from=".C_USB > .pin1" to="net.V3V3" {...v3v3Label} />
    <trace name="CUSB_G" from=".C_USB > .pin2" to="net.GND" {...gndLabel} />
    <trace name="AVDD_IN" from=".L_AVDD > .pin1" to="net.V3V3" {...v3v3Label} />
    <trace
      name="AVDD"
      from=".L_AVDD > .pin2"
      to="net.ADC_VREF"
      {...adcRefLabel}
    />
    <trace
      name="ADC_AVDD"
      from=".U1 > .ADC_AVDD"
      to="net.ADC_VREF"
      {...adcRefLabel}
    />
    <trace name="FLSH_GND" from=".U2 > .GND" to="net.GND" {...gndLabel} />
    <trace name="FLSH_VCC" from=".U2 > .VCC" to="net.V3V3" {...v3v3Label} />
    <trace name="FLSH_EP" from=".U2 > .EP" to="net.GND" {...gndLabel} />

    <trace name="XIN" from=".Y1 > .pin1" to=".U1 > .XIN" />
    <trace name="XOUT" from=".Y1 > .pin3" to=".U1 > .XOUT" />
    <trace name="CXIN" from=".C_XIN > .pin1" to=".Y1 > .pin1" />
    <trace name="CXIN_G" from=".C_XIN > .pin2" to="net.GND" {...gndLabel} />
    <trace name="CXOUT" from=".C_XOUT > .pin1" to=".Y1 > .pin3" />
    <trace name="CXOUT_G" from=".C_XOUT > .pin2" to="net.GND" {...gndLabel} />

    <trace name="BOOT_SW" from=".SW_BOOT > .pin1" to=".U1 > .QSPI_SS" />
    <trace name="BOOT_G" from=".SW_BOOT > .pin3" to="net.GND" {...gndLabel} />
    <trace name="BOOT_R" from=".R_BOOT > .pin1" to=".U1 > .QSPI_SS" />
    <trace
      name="BOOT_3V3"
      from=".R_BOOT > .pin2"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace name="RUN_SW" from=".SW_RUN > .pin1" to=".U1 > .RUN" />
    <trace name="RUN_G" from=".SW_RUN > .pin4" to="net.GND" {...gndLabel} />

    <trace name="LED_GP25" from=".U1 > .GPIO25" to=".R_LED > .pin1" />
    <trace name="LED_D1" from=".R_LED > .pin2" to=".D1 > .anode" />
    <trace name="LED_G" from=".D1 > .cathode" to="net.GND" {...gndLabel} />
    <trace
      name="PLED_3V3"
      from="net.V3V3"
      to=".R_PWR_LED > .pin1"
      {...v3v3Label}
    />
    <trace name="PLED_D" from=".R_PWR_LED > .pin2" to=".D_PWR > .anode" />
    <trace name="PLED_G" from=".D_PWR > .cathode" to="net.GND" {...gndLabel} />

    <trace name="SWCLK" from=".U1 > .SWCLK" to=".TP_SWCLK > .pin1" />
    <trace name="SWD" from=".U1 > .SWD" to=".TP_SWDIO > .pin1" />
    <trace name="TP_G" from=".TP_GND > .pin1" to="net.GND" {...gndLabel} />
    <trace name="TP3V3_T" from=".TP_3V3 > .pin1" to="net.V3V3" {...v3v3Label} />

    <silkscreentext text="BOOT" fontSize="0.8mm" pcbX={12} pcbY={14} />
    <silkscreentext text="RUN" fontSize="0.8mm" pcbX={-12} pcbY={-30} />
    <silkscreentext text="PWR" fontSize="0.8mm" pcbX={-9.8} pcbY={27.4} />
    <silkscreentext text="USB-C" fontSize="0.9mm" pcbX={0} pcbY={25} />
  </subcircuit>
)
