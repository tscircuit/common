import type { SubcircuitProps } from "@tscircuit/props"
import { AO3401A } from "./imports/AO3401A"
import { A_0603WAF1003T5E } from "./imports/A_0603WAF1003T5E"
import { A_0603WAF9532T5E } from "./imports/A_0603WAF9532T5E"
import { CL10A106KP8NNNC } from "./imports/CL10A106KP8NNNC"
import { CL10A226MQ8NRNC } from "./imports/CL10A226MQ8NRNC"
import { FRC0603F1302TS } from "./imports/FRC0603F1302TS"
import { MMBT3904_RANGE_100_300_ } from "./imports/MMBT3904_RANGE_100_300_"
import { MT3608 } from "./imports/MT3608"
import { S2B_PH_K_S_LF__SN_ } from "./imports/S2B_PH_K_S_LF__SN_"
import { SMMS0630_220M } from "./imports/SMMS0630_220M"
import { SS34 } from "./imports/SS34"

const batteryTraceProps = { thickness: "0.3mm" } as const
const powerTraceProps = { thickness: "0.4mm" } as const
const gndLabel = { displayName: "GND", schDisplayLabel: "GND" } as const
const vbusLabel = { displayName: "VBUS", schDisplayLabel: "VBUS" } as const
const vsysLabel = { displayName: "VSYS", schDisplayLabel: "VSYS" } as const

const schSections = {
  batteryInput: "battery-input",
  boostConverter: "boost-converter",
  usbShutdown: "usb-shutdown",
} as const

export type PowerBoostMT3608Props = Omit<SubcircuitProps, "children">

/**
 * Battery-powered 5 V boost supply extracted from abse/gameboy.
 *
 * VBUS disables the MT3608 while USB power is present. VSYS is the boosted
 * output and GND is the common return. Connect an external switch between
 * BAT_POS and BAT_SWITCHED, or connect both ports to the same net for
 * always-on operation.
 */
export const PowerBoost_MT3608 = ({
  name = "PowerBoost_MT3608",
  ...props
}: PowerBoostMT3608Props) => (
  <subcircuit
    minViaHoleDiameter="0.3mm"
    minViaPadDiameter="0.45mm"
    autorouterVersion="v6"
    {...props}
    name={name}
  >
    <net name="GND" isGroundNet />
    <net name="VBUS" isPowerNet />
    <net name="VSYS" isPowerNet />
    <net name="BAT_POS" isPowerNet />
    <net name="BAT_SWITCHED" isPowerNet />

    <port name="BAT_POS" direction="left" connectsTo="net.BAT_POS" />
    <port name="BAT_SWITCHED" direction="left" connectsTo="net.BAT_SWITCHED" />
    <port name="VBUS" direction="left" connectsTo="net.VBUS" />
    <port name="VSYS" direction="right" connectsTo="net.VSYS" />
    <port name="GND" direction="down" connectsTo="net.GND" />

    <schematicsection
      name={schSections.batteryInput}
      displayName="Battery Input and Cutoff"
    />
    <schematicsection
      name={schSections.boostConverter}
      displayName="MT3608 Boost Converter"
    />
    <schematicsection
      name={schSections.usbShutdown}
      displayName="USB Boost Shutdown"
    />

    <S2B_PH_K_S_LF__SN_
      name="J_BAT"
      schSectionName={schSections.batteryInput}
      pcbX={-31.5}
      pcbY={25.25}
      pcbRotation={90}
      schX={-18}
      schY={-2}
    />
    <AO3401A
      name="Q_BAT_CUTOFF"
      schSectionName={schSections.batteryInput}
      pcbX={-11.5}
      pcbY={21.25}
      schX={-10}
      schY={-2}
      schHeight={0.4}
    />
    <A_0603WAF1003T5E
      name="R_BAT_GATE_PULLUP"
      schSectionName={schSections.batteryInput}
      pcbX={-11.5}
      pcbY={26.25}
      pcbRotation={90}
      schX={-14.27}
      schY={1}
    />
    <A_0603WAF1003T5E
      name="R_BAT_GATE_BASE"
      schSectionName={schSections.batteryInput}
      pcbX={-14.5}
      pcbY={26.25}
      pcbRotation={90}
      schX={-10.56}
      schY={1}
    />
    <MMBT3904_RANGE_100_300_
      name="Q_BAT_GATE"
      schSectionName={schSections.batteryInput}
      pcbX={-17.5}
      pcbY={26.25}
      schX={-5.17}
      schY={1}
      schHeight={0.4}
    />

    <SMMS0630_220M
      name="L_BAT_BOOST"
      schSectionName={schSections.boostConverter}
      pcbX={-2.5}
      pcbY={21.25}
      schX={-0.05}
      schY={-2}
    />
    <MT3608
      name="U_BAT_BOOST"
      schSectionName={schSections.boostConverter}
      pcbX={6.5}
      pcbY={21.25}
      schX={4.05}
      schY={-2}
    />
    <SS34
      name="D_BAT_BOOST"
      schSectionName={schSections.boostConverter}
      pcbX={15.5}
      pcbY={21.25}
      pcbRotation={180}
      schX={8}
      schY={-2}
    />
    <CL10A106KP8NNNC
      name="C_BAT_IN"
      schSectionName={schSections.boostConverter}
      pcbX={3.5}
      pcbY={26.25}
      pcbRotation={90}
      schX={0}
      schY={1}
    />
    <CL10A106KP8NNNC
      name="C_BAT_IN_BULK"
      schSectionName={schSections.boostConverter}
      pcbX={-2.5}
      pcbY={26.75}
      pcbRotation={90}
      schX={0}
      schY={4}
    />
    <CL10A226MQ8NRNC
      name="C_BAT_OUT"
      schSectionName={schSections.boostConverter}
      pcbX={20.5}
      pcbY={21.25}
      pcbRotation={90}
      schX={12}
      schY={1}
    />
    <CL10A226MQ8NRNC
      name="C_BAT_OUT_BULK"
      schSectionName={schSections.boostConverter}
      pcbX={23.5}
      pcbY={21.25}
      pcbRotation={90}
      schX={12}
      schY={4}
    />
    <A_0603WAF9532T5E
      name="R_BOOST_TOP"
      schSectionName={schSections.boostConverter}
      pcbX={11.5}
      pcbY={26.25}
      pcbRotation={90}
      schX={8}
      schY={1}
    />
    <FRC0603F1302TS
      name="R_BOOST_BOT"
      schSectionName={schSections.boostConverter}
      pcbX={8.5}
      pcbY={26.25}
      pcbRotation={90}
      schX={8}
      schY={4}
    />
    <A_0603WAF1003T5E
      name="R_BOOST_EN_PULLUP"
      schSectionName={schSections.boostConverter}
      pcbX={16.5}
      pcbY={26.25}
      pcbRotation={90}
      schX={4}
      schY={1}
    />

    <A_0603WAF1003T5E
      name="R_USB_BOOST_OFF"
      schSectionName={schSections.usbShutdown}
      pcbX={24.5}
      pcbY={26.25}
      pcbRotation={90}
      schX={18}
      schY={-2}
    />
    <MMBT3904_RANGE_100_300_
      name="Q_USB_BOOST_OFF"
      schSectionName={schSections.usbShutdown}
      pcbX={28.5}
      pcbY={18.25}
      schX={22}
      schY={-2}
      schHeight={0.4}
    />
    <A_0603WAF1003T5E
      name="R_USB_BOOST_OFF_PULLDOWN"
      schSectionName={schSections.usbShutdown}
      pcbX={31.5}
      pcbY={18.25}
      pcbRotation={90}
      schX={22}
      schY={1}
    />

    <trace
      name="BAT_POS"
      from=".J_BAT > .pin1"
      to="net.BAT_POS"
      {...batteryTraceProps}
    />
    <trace
      name="BAT_SWITCHED"
      from="net.BAT_SWITCHED"
      to=".Q_BAT_CUTOFF > .S"
      {...powerTraceProps}
    />
    <trace
      name="BOOST_EN_PULLUP_IN"
      from="net.BAT_SWITCHED"
      to=".R_BOOST_EN_PULLUP > .pin1"
    />
    <trace
      name="BOOST_EN"
      from=".R_BOOST_EN_PULLUP > .pin2"
      to=".U_BAT_BOOST > .EN"
    />
    <trace
      name="BOOST_EN_OFF_C"
      from=".Q_USB_BOOST_OFF > .C"
      to=".U_BAT_BOOST > .EN"
    />
    <trace
      name="BOOST_EN_OFF_E"
      from=".Q_USB_BOOST_OFF > .E"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      name="USB_BOOST_OFF_R"
      from="net.VBUS"
      to=".R_USB_BOOST_OFF > .pin1"
      {...vbusLabel}
    />
    <trace
      name="USB_BOOST_OFF_B"
      from=".R_USB_BOOST_OFF > .pin2"
      to=".Q_USB_BOOST_OFF > .B"
    />
    <trace
      name="USB_BOOST_OFF_B_PD"
      from=".Q_USB_BOOST_OFF > .B"
      to=".R_USB_BOOST_OFF_PULLDOWN > .pin1"
    />
    <trace
      name="USB_BOOST_OFF_PD_G"
      from=".R_USB_BOOST_OFF_PULLDOWN > .pin2"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      name="BAT_CUTOFF_OUT"
      from=".Q_BAT_CUTOFF > .D"
      to=".U_BAT_BOOST > .IN"
      {...powerTraceProps}
    />
    <trace
      name="BAT_GATE_PULLUP_IN"
      from="net.BAT_SWITCHED"
      to=".R_BAT_GATE_PULLUP > .pin1"
    />
    <trace
      name="BAT_GATE_PULLUP"
      from=".R_BAT_GATE_PULLUP > .pin2"
      to=".Q_BAT_CUTOFF > .G"
    />
    <trace
      name="BAT_GATE_PULLDOWN"
      from=".Q_BAT_GATE > .C"
      to=".Q_BAT_CUTOFF > .G"
    />
    <trace
      name="BAT_GATE_G"
      from=".Q_BAT_GATE > .E"
      to="net.GND"
      {...gndLabel}
    />
    <trace
      name="BAT_GATE_BASE_R"
      from=".U_BAT_BOOST > .EN"
      to=".R_BAT_GATE_BASE > .pin1"
    />
    <trace
      name="BAT_GATE_BASE"
      from=".R_BAT_GATE_BASE > .pin2"
      to=".Q_BAT_GATE > .B"
    />
    <trace
      name="BOOST_L_IN"
      from=".Q_BAT_CUTOFF > .D"
      to=".L_BAT_BOOST > .pin1"
      {...powerTraceProps}
    />
    <trace
      name="BOOST_L_SW"
      from=".L_BAT_BOOST > .pin2"
      to=".U_BAT_BOOST > .SW"
      {...powerTraceProps}
    />
    <trace
      name="BOOST_D_SW"
      from=".U_BAT_BOOST > .SW"
      to=".D_BAT_BOOST > .anode"
      {...powerTraceProps}
    />
    <trace
      name="BOOST_VSYS"
      from=".D_BAT_BOOST > .cathode"
      to="net.VSYS"
      {...powerTraceProps}
      {...vsysLabel}
    />
    <trace
      name="BOOST_GND"
      from=".U_BAT_BOOST > .GND"
      to="net.GND"
      {...powerTraceProps}
      {...gndLabel}
    />
    <trace
      name="BOOST_IN_CAP"
      from=".C_BAT_IN > .pin1"
      to=".Q_BAT_CUTOFF > .D"
      {...powerTraceProps}
    />
    <trace
      name="BOOST_IN_CAP_GND"
      from=".C_BAT_IN > .pin2"
      to="net.GND"
      {...powerTraceProps}
      {...gndLabel}
    />
    <trace
      name="BOOST_IN_BULK"
      from=".C_BAT_IN_BULK > .pin1"
      to=".Q_BAT_CUTOFF > .D"
      {...powerTraceProps}
    />
    <trace
      name="BOOST_IN_BULK_GND"
      from=".C_BAT_IN_BULK > .pin2"
      to="net.GND"
      {...powerTraceProps}
      {...gndLabel}
    />
    <trace
      name="BOOST_OUT_CAP"
      from=".C_BAT_OUT > .pin1"
      to=".D_BAT_BOOST > .cathode"
      {...powerTraceProps}
    />
    <trace
      name="BOOST_OUT_CAP_GND"
      from=".C_BAT_OUT > .pin2"
      to="net.GND"
      {...powerTraceProps}
      {...gndLabel}
    />
    <trace
      name="BOOST_OUT_BULK"
      from=".C_BAT_OUT_BULK > .pin1"
      to=".D_BAT_BOOST > .cathode"
      {...powerTraceProps}
    />
    <trace
      name="BOOST_OUT_BULK_GND"
      from=".C_BAT_OUT_BULK > .pin2"
      to="net.GND"
      {...powerTraceProps}
      {...gndLabel}
    />
    <trace
      name="BOOST_FB_TOP"
      from=".D_BAT_BOOST > .cathode"
      to=".R_BOOST_TOP > .pin1"
    />
    <trace
      name="BOOST_FB"
      from=".R_BOOST_TOP > .pin2"
      to=".U_BAT_BOOST > .FB"
    />
    <trace
      name="BOOST_FB_BOT"
      from=".U_BAT_BOOST > .FB"
      to=".R_BOOST_BOT > .pin1"
    />
    <trace
      name="BOOST_FB_GND"
      from=".R_BOOST_BOT > .pin2"
      to="net.GND"
      {...gndLabel}
    />
    <trace name="BAT_GND" from=".J_BAT > .pin2" to="net.GND" {...gndLabel} />
  </subcircuit>
)

export default PowerBoost_MT3608
