import { RP2040 } from "../imports/RP2040"
import { Fragment } from "react"
import { schSections } from "./schematicSections"

const denseTraceProps = { thickness: "0.1mm" } as const
const gndLabel = { displayName: "GND", schDisplayLabel: "GND" } as const
const v3v3Label = { displayName: "V3V3", schDisplayLabel: "V3V3" } as const
const v1v1Label = { displayName: "V1V1", schDisplayLabel: "V1V1" } as const
const adcRefLabel = {
  displayName: "ADC_REF",
  schDisplayLabel: "ADC_REF",
} as const

export const RP2040CoreSubcircuit = ({
  parentName,
}: {
  parentName: string
}) => (
  <subcircuit
    name="RP2040_CORE"
    pcbX={0.73}
    pcbY={-1.239975}
    width={12.3}
    height={10.38005}
    exposedNets={["GND", "V3V3", "ADC_VREF"]}
  >
    <RP2040
      name="U1"
      showPinAliases
      schSectionName={schSections.rp2040(parentName)}
      pcbX={-0.73}
      pcbY={1.239975}
      schX={-0.08}
      schY={-2.5}
      schWidth={2.8}
      schHeight={5.8}
    />
    {[
      ["C_IOVDD1", -5.73, -4.260025, -11.3],
      ["C_IOVDD2", -3.73, -4.260025, -9.6],
      ["C_IOVDD3", -1.73, -4.260025, -7.9],
      ["C_IOVDD4", 0.27, -4.260025, -6.2],
      ["C_IOVDD5", 2.27, -4.260025, -4.5],
      ["C_IOVDD6", 4.27, -4.260025, -2.8],
    ].map(([capName, pcbX, pcbY, schX]) => (
      <capacitor
        key={capName}
        name={capName as string}
        capacitance="100nF"
        footprint="0402"
        schSectionName={schSections.rp2040(parentName)}
        schOrientation="vertical"
        pcbX={pcbX as number}
        pcbY={pcbY as number}
        pcbRotation={90}
        schX={schX as number}
        schY={-6.4}
      />
    ))}
    <capacitor
      name="C_CORE"
      capacitance="1uF"
      footprint="0402"
      schSectionName={schSections.rp2040(parentName)}
      schOrientation="vertical"
      pcbX={5.27}
      pcbY={1.239975}
      schX={-3.65}
      schY={-3.7}
    />
    {[
      "C_IOVDD1",
      "C_IOVDD2",
      "C_IOVDD3",
      "C_IOVDD4",
      "C_IOVDD5",
      "C_IOVDD6",
    ].flatMap((capacitorName, index) => [
      <Fragment key={`${capacitorName}_3V3`}>
        <trace
          name={`IO${index + 1}_3V3`}
          from={`.${capacitorName} > .pin1`}
          to="net.V3V3"
          {...v3v3Label}
        />
      </Fragment>,
      <Fragment key={`${capacitorName}_G`}>
        <trace
          name={`IO${index + 1}_G`}
          from={`.${capacitorName} > .pin2`}
          to="net.GND"
          {...gndLabel}
        />
      </Fragment>,
    ])}

    <trace name="TEST_G" from=".U1 > .TESTEN" to="net.GND" {...gndLabel} />
    {["IOVDD1", "IOVDD2", "IOVDD3", "IOVDD4", "IOVDD5", "IOVDD6"].map(
      (pinName, index) => (
        <Fragment key={`${pinName}_P`}>
          <trace
            {...denseTraceProps}
            name={`IOVDD${index + 1}_P`}
            from={`.U1 > .${pinName}`}
            to="net.V3V3"
            {...v3v3Label}
          />
        </Fragment>
      ),
    )}
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
    <trace name="CORE_P" from=".C_CORE > .pin1" to="net.V1V1" {...v1v1Label} />
    <trace name="CORE_G" from=".C_CORE > .pin2" to="net.GND" {...gndLabel} />
    <trace
      name="ADC_AVDD"
      from=".U1 > .ADC_AVDD"
      to="net.ADC_VREF"
      {...adcRefLabel}
    />
  </subcircuit>
)
