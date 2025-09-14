import type { ChipProps } from "@tscircuit/props"
import { MicroModBoardFootprint } from "./MicroModBoardFootprint"

export const MicroModBoard = (props: ChipProps) => (
  <chip
    {...props} // Pass through all chip props
    footprint={<MicroModBoardFootprint />}
    pinLabels={{
      // Left Side Pins (Odd numbers)
      pin1: "GND",
      pin3: "3V3", 
      pin5: "USB_VIN",
      pin7: "RTC_3V",
      pin9: "VSYS",
      pin11: "G0",
      pin13: "G1",
      pin15: "G2",
      pin17: "G3",
      pin19: "G4",
      pin21: "G5",
      pin23: "G6",
      pin25: "G7",
      pin27: "G8",
      pin29: "G9",
      pin31: "G10",
      pin33: "G11",
      pin35: "SPI_CS",
      pin37: "SPI_SCK",
      pin39: "SPI_MOSI",
      pin41: "SPI_MISO",
      pin43: "I2C_SDA",
      // Right Side Pins (Even numbers)
      pin2: "I2C_SCL",
      pin4: "UART_TX",
      pin6: "UART_RX", 
      pin8: "UART_RTS",
      pin10: "UART_CTS",
      pin12: "USB_D_PLUS",
      pin14: "USB_D_MINUS",
      pin16: "USB_HOST_EN",
      pin18: "CAN_TX",
      pin20: "CAN_RX",
      pin22: "I2S_OUT",
      pin24: "I2S_IN",
      pin26: "I2S_WS",
      pin28: "I2S_SCK",
      pin30: "PDM_DATA",
      pin32: "PDM_CLK",
      pin34: "SWDIO",
      pin36: "SWDCK",
      pin38: "BOOT",
      pin40: "RESET",
      pin42: "GND",
      pin44: "GND",
    }}
    schPinArrangement={{
      leftSide: {
        direction: "top-to-bottom",
        pins: ["3V3", "USB_VIN", "VSYS", "GND"],
      },
      rightSide: {
        direction: "top-to-bottom", 
        pins: ["G0", "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10", "G11"],
      },
      topSide: {
        direction: "left-to-right",
        pins: ["I2C_SDA", "I2C_SCL", "SPI_CS", "SPI_SCK", "SPI_MOSI", "SPI_MISO"],
      },
      bottomSide: {
        direction: "left-to-right", 
        pins: ["UART_TX", "UART_RX", "USB_D_PLUS", "USB_D_MINUS", "SWDIO", "SWDCK", "RESET"],
      },
    }}
  />
)