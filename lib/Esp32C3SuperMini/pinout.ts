/**
 * ESP32-C3 SuperMini header pinout and mechanical constants.
 *
 * Pins are listed top to bottom exactly as they sit on the board, with the PCB
 * antenna at the top and USB-C at the bottom.
 */
export const LEFT_PINS = [
  "V5",
  "GND",
  "V3_3",
  "IO4",
  "IO3",
  "IO2",
  "IO1",
  "IO0",
] as const

export const RIGHT_PINS = [
  "IO5",
  "IO6",
  "IO7",
  "IO8",
  "IO9",
  "IO10",
  "IO20",
  "IO21",
] as const

/** Footprint pin order: pin1-pin8 are the left column, pin9-pin16 the right. */
export const PINS_IN_FOOTPRINT_ORDER = [...LEFT_PINS, ...RIGHT_PINS]

export const PINS_PER_SIDE = LEFT_PINS.length
export const PIN_PITCH_MM = 2.54
export const ROW_SPACING_MM = 15.24
export const BOARD_WIDTH_MM = 18
export const BOARD_LENGTH_MM = 22.5
