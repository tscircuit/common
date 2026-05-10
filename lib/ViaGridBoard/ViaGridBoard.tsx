import type { BoardProps, ChipProps } from "@tscircuit/props"
import { grid } from "@tscircuit/math-utils"
import { ViaGridVia } from "./viaGridElements"

interface ViaGridBoardProps {
  boardProps?: BoardProps
  size?: "small" | "medium" | "large" | { rows: number; cols: number }
  children?: any
}

const SIZES = {
  small: { rows: 8, cols: 12 },
  medium: { rows: 12, cols: 18 },
  large: { rows: 16, cols: 24 },
}

/**
 * ViaGridBoard component implementing the ViaGrid specification.
 * Pitch: 2.54mm, Drill: 0.6mm, Pad: 1.2mm, Margin: 3mm
 */
export const ViaGridBoard = ({
  boardProps = {},
  size = "small",
  children,
}: ViaGridBoardProps) => {
  const { rows, cols } = typeof size === "string" ? SIZES[size] : size
  
  const pitch = 2.54
  const margin = 3
  const width = (cols - 1) * pitch + margin * 2
  const height = (rows - 1) * pitch + margin * 2

  const cells = grid({
    rows,
    cols,
    xSpacing: pitch,
    ySpacing: pitch,
    centered: true,
  })

  return (
    <board
      {...boardProps}
      width={`${width}mm`}
      height={`${height}mm`}
    >
      {cells.map((cell) => {
        const rowLabel = String.fromCharCode(65 + cell.row) // A, B, C...
        const colLabel = (cell.col + 1).toString() // 1, 2, 3...
        return (
          <ViaGridVia
            key={`${rowLabel}${colLabel}`}
            name={`${rowLabel}${colLabel}`}
            pcbX={cell.center.x}
            pcbY={cell.center.y}
            viaIndex={cell.index}
          />
        )
      })}
      {children}
    </board>
  )
}
