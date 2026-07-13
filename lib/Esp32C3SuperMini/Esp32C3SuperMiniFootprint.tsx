import React from "react"
import type { PlatedHoleProps } from "@tscircuit/props"
import { PINS_PER_SIDE, PIN_PITCH_MM, ROW_SPACING_MM } from "./pinout"

export interface Esp32C3SuperMiniFootprintProps {
  holeDiameter?: number
  outerDiameter?: number
}

/**
 * Through-hole footprint for the ESP32-C3 SuperMini: two columns of eight
 * 2.54mm-pitch pins, 15.24mm apart, matching the module's header rows.
 * pin1-pin8 are the left column (top to bottom) and pin9-pin16 the right.
 */
export const Esp32C3SuperMiniFootprint = ({
  holeDiameter = 1,
  outerDiameter = 1.8,
}: Esp32C3SuperMiniFootprintProps = {}) => {
  const topPinY = ((PINS_PER_SIDE - 1) / 2) * PIN_PITCH_MM
  const columnXs = [-ROW_SPACING_MM / 2, ROW_SPACING_MM / 2]

  const holes = columnXs.flatMap((columnX, column) =>
    Array.from({ length: PINS_PER_SIDE }, (_, row) => {
      const pin = `pin${column * PINS_PER_SIDE + row + 1}`
      const holeProps: PlatedHoleProps = {
        portHints: [pin],
        shape: "circle",
        holeDiameter,
        outerDiameter,
        pcbX: columnX,
        pcbY: topPinY - row * PIN_PITCH_MM,
      }
      // tscircuit's JSX types don't accept React's `key`, so build the element
      // directly rather than widening the props to `any`.
      return React.createElement("platedhole", { key: pin, ...holeProps })
    }),
  )

  return <footprint>{holes}</footprint>
}
