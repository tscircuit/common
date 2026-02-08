import { ArduinoShieldFootprint } from "./ArduinoShieldFootprint"
import { splitBoardAndChipProps } from "../../util/splitBoardAndChipProps"
import { ChipProps, BoardProps } from "@tscircuit/props"

type ArduinoShieldProps = ChipProps &
  BoardProps & { children?: any; boardName?: string }

export const ArduinoShield = ({ children, ...rest }: ArduinoShieldProps) => {
  const { boardProps, chipProps = {} } = splitBoardAndChipProps({
    ...rest,
  }) as {
    boardProps: any
    chipProps: Record<string, any>
  }

  const resolvedName = `${chipProps.name}_chip`
  const { name: _, ...chipRest } = chipProps

  return (
    <board
      {...boardProps}
      outline={[
        { x: -34.29, y: -26.67 },
        { x: 32.26, y: -26.67 },
        { x: 34.29, y: -24.64 },
        { x: 34.29, y: 17.27 },
        { x: 31.75, y: 19.81 },
        { x: 31.75, y: 26.67 },
        { x: -34.29, y: 26.67 },
      ]}
    >
      <chip
        {...chipRest}
        obstructsWithinBounds={false}
        doNotPlace
        name={resolvedName}
        pcbX={0}
        pcbY={0}
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
          pin10: "RESET",
          pin11: "3.3V",
          pin12: "5V",
          pin13: "GND1",
          pin14: "GND2",
          pin15: "D0",
          pin16: "D1",
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
          pin29: "GND",
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
              "RESET",
              "VIN",
              "5V",
              "3.3V",
              "AREF",
              "GND",
              "GND1",
              "GND2",
            ],
          },
          rightSide: {
            direction: "top-to-bottom",
            pins: [
              "D0",
              "D1",
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
    </board>
  )
}
