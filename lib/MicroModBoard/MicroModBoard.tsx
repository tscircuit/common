import type { BoardProps, ChipProps } from "@tscircuit/props"
import { MicroModBoardFootprint } from "./MicroModBoardFootprint"
import { processorOutline, functionOutline } from "./outlines/boardOutlines"
import { splitBoardAndChipProps } from "../../util/splitBoardAndChipProps"

type MicroModBoardProps = ChipProps &
  BoardProps & {
    children?: any
    variant?: "processor" | "function"
    boardName?: string
  }

export const MicroModBoard = ({
  variant = "processor",
  boardName,
  children,
  ...rest
}: MicroModBoardProps) => {
  const { boardProps, chipProps } = splitBoardAndChipProps({
    ...rest,
    boardName,
  })

  const { name, ...chipRest } = chipProps as ChipProps

  let outline
  const pinLabels = {
    pin2: ["V3_3_1"],
    pin74: ["V3_3_2"],
    pin6: ["N_RESET"],
    pin11: ["N_BOOT"],
    pin4: ["V3_3_EN"],
    pin72: ["RTC_V3"],
    pin9: ["USB_VIN"],
    pin5: ["USB_D_N"],
    pin3: ["USB_D_P"],
    pin37: ["USBHOST_D_N"],
    pin35: ["USBHOST_D_P"],
    pin43: ["CAN_TX"],
    pin41: ["CAN_RX"],
    pin23: ["SWDIO"],
    pin21: ["SWDCK"],
    pin58: ["AUD_MCLK"],
    pin56: ["AUD_OUT"],
    pin54: ["AUD_IN"],
    pin52: ["AUD_LRCLK"],
    pin50: ["AUD_BCLK"],
    pin14: ["I2C_SCL"],
    pin12: ["I2C_SDA"],
    pin16: ["I2C_N_INT"],
    pin53: ["I2C_SCL1"],
    pin51: ["I2C_SDA1"],
    pin49: ["BATT_VIN_3"],
    pin1: ["GND1"],
    pin7: ["GND2"],
    pin33: ["GND3"],
    pin36: ["GND4"],
    pin39: ["GND5"],
    pin45: ["GND6"],
    pin75: ["GND7"],
    pin60: ["SPI_SCK1"],
    pin62: ["SPI_SDO1"],
    pin64: ["SPI_SDI1"],
    pin66: ["SDIO_DATA1"],
    pin68: ["SDIO_DATA2"],
    pin70: ["SPI_N_CS1"],
    pin57: ["SPI_SCK"],
    pin59: ["SPI_SDO"],
    pin61: ["SPI_SDI"],
    pin55: ["SPI_N_CS"],
    pin34: ["A0"],
    pin38: ["A1"],
    pin32: ["PWM0"],
    pin47: ["PWM1"],
    pin10: ["D0"],
    pin18: ["D1"],
    pin17: ["TX1"],
    pin19: ["RX1"],
    pin13: ["RTS1"],
    pin15: ["CTS1"],
    pin22: ["TX2"],
    pin20: ["RX2"],
    pin40: ["G0"],
    pin42: ["G1"],
    pin44: ["G2"],
    pin46: ["G3"],
    pin48: ["G4"],
    pin73: ["G5"],
    pin71: ["G6", "PWR_EN"],
    pin69: ["G7"],
    pin67: ["G8"],
    pin65: ["G9"],
    pin63: ["G10"],
    pin8: ["G11"],
    pin76: ["HOLE_PAD_1"],
    ...(variant === "function" ? { pin77: ["HOLE_PAD_2"] } : {}),
  }

  outline = variant === "processor" ? processorOutline : functionOutline

  return (
    <board {...boardProps} outline={outline}>
      <group>
        <chip
          {...chipRest}
          name={`${name}_chip`}
          footprint={<MicroModBoardFootprint variant={variant} />}
          schWidth={2.8}
          pinLabels={pinLabels}
          schPinArrangement={{
            leftSide: {
              direction: "top-to-bottom",
              pins: [
                "V3_3_1",
                "V3_3_2",
                "N_RESET",
                "N_BOOT",
                "V3_3_EN",
                "RTC_V3",
                "USB_VIN",
                "USB_D_N",
                "USB_D_P",
                "USBHOST_D_N",
                "USBHOST_D_P",
                "CAN_TX",
                "CAN_RX",
                "SWDIO",
                "SWDCK",
                "AUD_MCLK",
                "AUD_OUT",
                "AUD_IN",
                "AUD_LRCLK",
                "AUD_BCLK",
                "I2C_SCL",
                "I2C_SDA",
                "I2C_N_INT",
                "I2C_SCL1",
                "I2C_SDA1",
                "BATT_VIN_3",
                "GND1",
                "GND2",
                "GND3",
                "GND4",
                "GND5",
                "GND6",
                "GND7",
              ],
            },
            rightSide: {
              direction: "top-to-bottom",
              pins: [
                "SPI_SCK1",
                "SPI_SDO1",
                "SPI_SDI1",
                "SDIO_DATA1",
                "SDIO_DATA2",
                "SPI_N_CS1",
                "SPI_SCK",
                "SPI_SDO",
                "SPI_SDI",
                "SPI_N_CS",
                "A0",
                "A1",
                "PWM0",
                "PWM1",
                "D0",
                "D1",
                "TX1",
                "RX1",
                "RTS1",
                "CTS1",
                "TX2",
                "RX2",
                "G0",
                "G1",
                "G2",
                "G3",
                "G4",
                "G5",
                "G6",
                "G7",
                "G8",
                "G9",
                "G10",
                "G11",
                "HOLE_PAD_1",
                ...(variant === "function" ? ["HOLE_PAD_2"] : []),
              ],
            },
          }}
          schPinStyle={{
            pin11: {
              marginBottom: 0.3,
            },
            pin72: {
              marginBottom: 0.3,
            },
            pin3: {
              marginBottom: 0.3,
            },
            pin35: {
              marginBottom: 0.3,
            },
            pin41: {
              marginBottom: 0.3,
            },
            pin21: {
              marginBottom: 0.3,
            },
            pin50: {
              marginBottom: 0.3,
            },
            pin51: {
              marginBottom: 0.3,
            },
            pin49: {
              marginBottom: 0.4,
            },
            pin70: {
              marginBottom: 0.3,
            },
            pin55: {
              marginBottom: 0.3,
            },
            pin18: {
              marginBottom: 0.6,
            },
            pin20: {
              marginBottom: 1,
            },

            pin8: {
              marginBottom: 0.3,
            },
          }}
        />
        {children}
      </group>
    </board>
  )
}
