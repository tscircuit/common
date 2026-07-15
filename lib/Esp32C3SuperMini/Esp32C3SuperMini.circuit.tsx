import type { BoardProps, ChipProps } from "@tscircuit/props"
import { outlineBuilder } from "../../util/outlineBuilder"
import { Esp32C3SuperMiniFootprint } from "./Esp32C3SuperMiniFootprint"
import {
  BOARD_LENGTH_MM,
  BOARD_WIDTH_MM,
  LEFT_PINS,
  PINS_IN_FOOTPRINT_ORDER,
  RIGHT_PINS,
} from "./pinout"

export type Esp32C3SuperMiniProps = {
  boardProps?: BoardProps
  chipProps?: Partial<ChipProps>
  children?: any
}

const CORNER_RADIUS_MM = 1.5
const halfWidth = BOARD_WIDTH_MM / 2
const halfLength = BOARD_LENGTH_MM / 2

const pinLabels = Object.fromEntries(
  PINS_IN_FOOTPRINT_ORDER.map((label, index) => [`pin${index + 1}`, label]),
)

const schPinArrangement = {
  leftSide: { direction: "top-to-bottom" as const, pins: [...LEFT_PINS] },
  rightSide: { direction: "top-to-bottom" as const, pins: [...RIGHT_PINS] },
}

/**
 * The corner arcs go through Math.cos/sin, which are not required to be
 * correctly rounded and differ by ~1 ULP between libm implementations. Snapping
 * to a 1nm grid keeps the outline, and therefore the rendered snapshot,
 * identical on every platform.
 */
const snapToNanometerGrid = ({ x, y }: { x: number; y: number }) => ({
  x: Math.round(x * 1e6) / 1e6,
  y: Math.round(y * 1e6) / 1e6,
})

/** 18 x 22.5mm outline with rounded corners; USB-C sits on the bottom edge. */
const outline = outlineBuilder(0, halfLength)
  .lineTo(halfWidth, halfLength)
  .corner({ radius: CORNER_RADIUS_MM, turn: "ccw" })
  .lineTo(halfWidth, -halfLength)
  .corner({ radius: CORNER_RADIUS_MM, turn: "ccw" })
  .lineTo(-halfWidth, -halfLength)
  .corner({ radius: CORNER_RADIUS_MM, turn: "ccw" })
  .lineTo(-halfWidth, halfLength)
  .corner({ radius: CORNER_RADIUS_MM, turn: "ccw" })
  .lineTo(0, halfLength)
  .toArray()
  .map(snapToNanometerGrid)

/**
 * ESP32-C3 SuperMini development board (18 x 22.5mm) as a reusable common board.
 * Two rows of eight 2.54mm-pitch header pins carrying 5V/GND/3V3 and
 * GPIO0-GPIO10, GPIO20 and GPIO21.
 */
export const Esp32C3SuperMini = ({
  boardProps = {},
  chipProps = {},
  children,
}: Esp32C3SuperMiniProps) => {
  const { name: resolvedName = "Esp32C3SuperMini", ...chipRest } = chipProps

  return (
    <board {...boardProps} outline={outline}>
      <chip
        {...chipRest}
        name={resolvedName}
        footprint={<Esp32C3SuperMiniFootprint />}
        doNotPlace
        pcbX={0}
        pcbY={0}
        pinLabels={pinLabels}
        schWidth={1.4}
        schPinArrangement={schPinArrangement}
      />
      {children}
    </board>
  )
}
