import type { BoardProps, ChipProps } from "@tscircuit/props"
import { ArduinoShieldFootprint } from "./ArduinoShieldFootprint"
import { splitBoardAndChipProps } from "../../util/splitBoardAndChipProps"

type ArduinoShieldProps = ChipProps &
  BoardProps & { children?: any; boardName?: string }

export const ArduinoShield = ({
  boardName,
  children,
  ...rest
}: ArduinoShieldProps) => {
  const { boardProps, chipProps } = splitBoardAndChipProps({
    ...rest,
    boardName,
  })

  const { name, ...chipRest } = chipProps as ChipProps

  return (
    <board
      {...boardProps}
      outline={[
        { x: -34.29, y: 26.67 }, // top-left corner
        { x: 32.29, y: 26.67 }, // top-right (sharp)
        { x: 34.29, y: 24.67 }, // top-right (sharp)
        { x: 34.29, y: 13.89 }, // start top slanted transition
        { x: 36.83, y: 11.35 }, // outward notch top
        { x: 36.83, y: -21.35 }, // outward notch bottom
        { x: 34.29, y: -23.89 }, // end bottom slanted transition
        { x: 34.29, y: -26.67 }, // bottom-right corner
        { x: -34.29, y: -26.67 }, // bottom-left corner
      ]}
    >
      <group>
        <chip
          {...chipRest}
          name={name}
          pinLabels={{
            pin1: "A0",
            pin2: "A1",
            pin3: "A2",
            pin4: "A3",
            pin5: "A4",
            pin6: "A5",
            pin7: "VIN",
            pin8: "NC",
            pin9: "IOREF",
            pin10: "RES",
            pin11: "V3_3",
            pin12: "V5",
            pin13: "GND0",
            pin14: "GND1",
            pin15: "RX",
            pin16: "TX",
            pin17: "D2",
            pin18: "D3",
            pin19: "D4",
            pin20: "D5",
            pin21: "D6",
            pin22: "D7",
            pin23: "D8",
            pin24: "D9",
            pin25: "D10",
            pin26: "D11",
            pin27: "D12",
            pin28: "D13",
            pin29: "GND2",
            pin30: "AREF",
            pin31: "SDA",
            pin32: "SCL",
          }}
          schWidth={1.5}
          schPinArrangement={{
            leftSide: {
              direction: "top-to-bottom",
              pins: [
                "A0",
                "A1",
                "A2",
                "A3",
                "A4",
                "A5",
                "IOREF",
                "RES",
                "VIN",
                "V5",
                "V3_3",
                "AREF",
                "GND0",
                "GND1",
                "GND2",
              ],
            },
            rightSide: {
              direction: "top-to-bottom",
              pins: [
                "RX",
                "TX",
                "D2",
                "D3",
                "D4",
                "D5",
                "D6",
                "D7",
                "D8",
                "D9",
                "D10",
                "D11",
                "D12",
                "D13",
                "SDA",
                "SCL",
              ],
            },
          }}
          schPinStyle={{
            pin6: {
              marginBottom: 0.5,
            },
            pin16: {
              marginBottom: 0.3,
            },
          }}
          footprint={<ArduinoShieldFootprint />}
        />
        {children}
      </group>
    </board>
  )
}
