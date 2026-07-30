import { TYPE_C_16PIN_2MD_073_ } from "../imports/TYPE_C_16PIN_2MD_073_"
import { schSections } from "./schematicSections"

export const USBInterfaceSubcircuit = ({
  parentName,
}: {
  parentName: string
}) => (
  <subcircuit name="USB_INTERFACE" pcbX={0} pcbY={27} schY={2}>
    <TYPE_C_16PIN_2MD_073_
      name="J_USB"
      schSectionName={schSections.usb(parentName)}
      pcbX={0}
      pcbY={2}
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
      pcbX={-4}
      pcbY={-6.5}
      schX={8.89}
      schY={-7.36}
    />
    <resistor
      name="R_CC2"
      resistance="5.1k"
      footprint="0402"
      schSectionName={schSections.usb(parentName)}
      pcbX={-2}
      pcbY={-6.5}
    />
    <resistor
      name="R_USB1"
      resistance="27"
      footprint="0402"
      schSectionName={schSections.usb(parentName)}
      pcbX={-0.75}
      pcbY={-4.5}
      pcbRotation={90}
      schX={15.3}
      schY={-6.1}
    />
    <resistor
      name="R_USB2"
      resistance="27"
      footprint="0402"
      schSectionName={schSections.usb(parentName)}
      pcbX={0.75}
      pcbY={-4.5}
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
      pcbX={2.5}
      pcbY={-6.5}
      pcbRotation={90}
    />
    <capacitor
      name="C_USB_VDD"
      capacitance="100nF"
      footprint="0402"
      schSectionName={schSections.usb(parentName)}
      schOrientation="vertical"
      pcbX={3}
      pcbY={-4.5}
    />
    <capacitor
      name="C_USB"
      capacitance="1uF"
      footprint="0402"
      schSectionName={schSections.usb(parentName)}
      schOrientation="vertical"
      pcbX={4.5}
      pcbY={-6.5}
    />
  </subcircuit>
)
