import { TYPE_C_16PIN_2MD_073_ } from "../imports/TYPE_C_16PIN_2MD_073_"
import { schSections } from "./schematicSections"

const denseTraceProps = { thickness: "0.1mm" } as const
const gndLabel = { displayName: "GND", schDisplayLabel: "GND" } as const
const vbusLabel = { displayName: "VBUS", schDisplayLabel: "VBUS" } as const
const v3v3Label = { displayName: "V3V3", schDisplayLabel: "V3V3" } as const

export const USBInterfaceSubcircuit = ({
  parentName,
}: {
  parentName: string
}) => (
  <subcircuit
    name="USB_INTERFACE"
    pcbX={0.1775}
    pcbY={25.8625}
    width={10.405}
    height={13.525}
    schY={2}
    exposedNets={["GND", "V3V3", "VBUS"]}
  >
    <TYPE_C_16PIN_2MD_073_
      name="J_USB"
      schSectionName={schSections.usb(parentName)}
      pcbX={-0.1775}
      pcbY={3.1375}
      pcbRotation={180}
      schX={12.25}
      schY={-5.8}
      schWidth={2.15}
      schHeight={1.8}
      schPinArrangement={{
        leftSide: [13, 15, 17, 18, 20, 22, 23, 25],
        rightSide: [14, 16, 28, 27, 26, 24, 21, 19],
      }}
    />
    <resistor
      name="R_CC1"
      resistance="5.1k"
      footprint="0402"
      schSectionName={schSections.usb(parentName)}
      pcbX={-4.1775}
      pcbY={-5.3625}
      schX={8.89}
      schY={-7.36}
    />
    <resistor
      name="R_CC2"
      resistance="5.1k"
      footprint="0402"
      schSectionName={schSections.usb(parentName)}
      pcbX={-2.1775}
      pcbY={-5.3625}
    />
    <resistor
      name="R_USB1"
      resistance="27"
      footprint="0402"
      schSectionName={schSections.usb(parentName)}
      pcbX={-0.9275}
      pcbY={-3.3625}
      pcbRotation={90}
      schX={15.3}
      schY={-6.1}
    />
    <resistor
      name="R_USB2"
      resistance="27"
      footprint="0402"
      schSectionName={schSections.usb(parentName)}
      pcbX={0.5725}
      pcbY={-3.3625}
      pcbRotation={90}
      schX={14.96}
      schY={-8.08}
    />
    <capacitor
      name="C_VBUS"
      capacitance="10uF"
      footprint="0603"
      schSectionName={schSections.usb(parentName)}
      schOrientation="vertical"
      pcbX={2.3225}
      pcbY={-5.3625}
      pcbRotation={90}
    />
    <capacitor
      name="C_USB_VDD"
      capacitance="100nF"
      footprint="0402"
      schSectionName={schSections.usb(parentName)}
      schOrientation="vertical"
      pcbX={2.8225}
      pcbY={-3.3625}
    />
    <capacitor
      name="C_USB"
      capacitance="1uF"
      footprint="0402"
      schSectionName={schSections.usb(parentName)}
      schOrientation="vertical"
      pcbX={4.3225}
      pcbY={-5.3625}
    />
    <trace name="USB_DN_B" from=".J_USB > .B7" to=".R_USB1 > .pin1" />
    <trace name="USB_DP_B" from=".J_USB > .B6" to=".R_USB2 > .pin1" />
    <trace
      name="UVDD_3V3"
      from=".C_USB_VDD > .pin1"
      to="net.V3V3"
      {...v3v3Label}
    />
    <trace name="UVDD_G" from=".C_USB_VDD > .pin2" to="net.GND" {...gndLabel} />
    <trace name="VBUS_A" from=".J_USB > .A4B9" to="net.VBUS" {...vbusLabel} />
    <trace name="VBUS_B" from=".J_USB > .B4A9" to="net.VBUS" {...vbusLabel} />
    <trace name="USB_DN_A" from=".J_USB > .A7" to=".R_USB1 > .pin1" />
    <trace name="USB_DP_A" from=".J_USB > .A6" to=".R_USB2 > .pin1" />
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
    <trace name="CUSB_P" from=".C_USB > .pin1" to="net.V3V3" {...v3v3Label} />
    <trace name="CUSB_G" from=".C_USB > .pin2" to="net.GND" {...gndLabel} />
  </subcircuit>
)
