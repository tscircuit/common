import type { ChipProps } from "@tscircuit/props"
import LGA15x4_net15 from "./PGA15x4_net15_bottomonly.json"

const COLS = 15
const ROWS = 4
const PITCH = 2.54 // 0.1 inch in mm

// Calculate grid dimensions
const gridWidth = (COLS - 1) * PITCH
const gridHeight = (ROWS - 1) * PITCH

// Build pin labels for all 60 pins
// Maps pin1-pin60 to P_R*_C* labels (row-major order)
const buildPinLabels = () => {
  const labels: Record<string, string> = {}
  let pinNum = 1
  for (let rowIndex = 0; rowIndex < ROWS; rowIndex++) {
    for (let colIndex = 0; colIndex < COLS; colIndex++) {
      labels[`pin${pinNum}`] = `P_R${rowIndex}_C${colIndex}`
      pinNum++
    }
  }
  return labels
}

const PIN_LABELS = buildPinLabels()

// Build internally connected pins from the pin locations
// Pins with the same net number are internally connected
const buildInternallyConnectedPins = () => {
  const netGroups: Map<number, string[]> = new Map()

  // Group physical pins by their net number
  LGA15x4_net15.pinLocations.forEach((row, rowIndex) => {
    row.forEach((netNum, colIndex) => {
      const pinLabel = `P_R${rowIndex}_C${colIndex}`
      if (!netGroups.has(netNum)) {
        netGroups.set(netNum, [])
      }
      netGroups.get(netNum)!.push(pinLabel)
    })
  })

  // Return array of arrays, where each inner array contains pins that are internally connected
  return Array.from(netGroups.values())
}

const internallyConnectedPins = buildInternallyConnectedPins()

// Build the footprint with all 60 plated holes
const LGA15x4ReceiverFootprint = () => {
  let pinNum = 1
  const holes: JSX.Element[] = []

  for (let rowIndex = 0; rowIndex < ROWS; rowIndex++) {
    for (let colIndex = 0; colIndex < COLS; colIndex++) {
      const pinName = `pin${pinNum}`
      const isPin1 = pinNum === 1

      holes.push(
        <platedhole
          name={pinName}
          portHints={[pinName]}
          shape={isPin1 ? "circular_hole_with_rect_pad" : "circle"}
          holeDiameter={1.0}
          {...(isPin1
            ? { rectPadHeight: 1.6, rectPadWidth: 1.6 }
            : { outerDiameter: 1.6 })}
          pcbX={colIndex * PITCH - gridWidth / 2}
          pcbY={gridHeight / 2 - rowIndex * PITCH}
        />,
      )
      pinNum++
    }
  }

  return <footprint>{holes}</footprint>
}

export const LGA15x4Receiver = (
  props: ChipProps<typeof PIN_LABELS> & {
    children?: any
  },
) => {
  const { children, ...rest } = props

  return (
    <chip
      {...rest}
      footprint={<LGA15x4ReceiverFootprint />}
      pinLabels={PIN_LABELS}
      internallyConnectedPins={internallyConnectedPins}
      doNotPlace
    >
      {/* Silkscreen rectangle around configurable bottom pins */}
      <silkscreenrect
        pcbX={0}
        pcbY={-gridHeight / 2}
        width={gridWidth + 2.4}
        height={2.4}
      />
      {children}
    </chip>
  )
}

export default LGA15x4Receiver
