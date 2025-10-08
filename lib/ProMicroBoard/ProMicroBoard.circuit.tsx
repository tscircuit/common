import type { BoardProps, ChipProps } from "@tscircuit/props"
import { ProMicroBoardFootprint } from "./ProMicroBoardFootprint"
import { splitBoardAndChipProps } from "../../util/splitBoardAndChipProps"

type ProMicroBoardProps = ChipProps &
  BoardProps & { children?: any; boardName?: string }

export const ProMicroBoard = ({
  boardName,
  children,
  ...rest
}: ProMicroBoardProps) => {
  const { boardProps, chipProps } = splitBoardAndChipProps({
    ...rest,
    boardName,
  })

  const { name, ...chipRest } = chipProps as ChipProps

  return (
    <board
      {...boardProps}
      outline={[
        { x: -9, y: 9 },
        { x: 9, y: 9 },
        { x: 9, y: -21.5 },
        { x: -9, y: -21.5 },
      ]}
    >
      <group>
        <chip
          {...chipRest}
          obstructsWithinBounds={false}
          name={name}
          pinLabels={{
            pin1: "TXO",
            pin2: "RXI",
            pin3: "GND0",
            pin4: "GND1",
            pin5: "D2",
            pin6: "D3",
            pin7: "D4",
            pin8: "D5",
            pin9: "D6",
            pin10: "D7",
            pin11: "D8",
            pin12: "D9",
            pin13: "RAW",
            pin14: "GND2",
            pin15: "RST",
            pin16: "VCC",
            pin17: "A3",
            pin18: "A2",
            pin19: "A1",
            pin20: "A0",
            pin21: "D15",
            pin22: "D14",
            pin23: "D16",
            pin24: "D10",
          }}
          schWidth={1.5}
          schPinArrangement={{
            leftSide: {
              direction: "top-to-bottom",
              pins: [
                "TXO",
                "RXI",
                "GND0",
                "GND1",
                "D2",
                "D3",
                "D4",
                "D5",
                "D6",
                "D7",
                "D8",
                "D9",
              ],
            },
            rightSide: {
              direction: "top-to-bottom",
              pins: [
                "RAW",
                "GND2",
                "RST",
                "VCC",
                "A3",
                "A2",
                "A1",
                "A0",
                "D15",
                "D14",
                "D16",
                "D10",
              ],
            },
          }}
          schPinStyle={{
            pin4: {
              marginBottom: 0.3,
            },
            pin17: {
              marginBottom: 0.3,
            },
          }}
          footprint={<ProMicroBoardFootprint />}
        />
        {children}
      </group>
    </board>
  )
}

// export default () => <ProMicroBoard name="U1" />
