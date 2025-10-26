import { ViaGridBoardFootprint } from "./ViaGridBoardFootprint"
import { splitBoardAndChipProps } from "../../util/splitBoardAndChipProps"
import { ChipProps, BoardProps } from "@tscircuit/props"

type ViaGridSize = "small" | "medium" | "large" | "custom"

type ViaGridBoardProps = ChipProps &
  BoardProps & {
    size?: ViaGridSize
    rows?: number
    cols?: number
    pitch?: number
    children?: any
  }

const VIAGRID_CONFIGS = {
  small: { rows: 8, cols: 12, pitch: 2.54 },
  medium: { rows: 12, cols: 18, pitch: 2.54 },
  large: { rows: 16, cols: 24, pitch: 2.54 },
}

export const ViaGridBoard = ({
  children,
  size = "medium",
  rows,
  cols,
  pitch = 2.54,
  ...rest
}: ViaGridBoardProps) => {
  const { boardProps, chipProps = {} } = splitBoardAndChipProps({
    ...rest,
  }) as {
    boardProps: any
    chipProps: Record<string, any>
  }

  const resolvedName = chipProps.name || "VG1"
  const { name: _, ...chipRest } = chipProps

  const config =
    size === "custom"
      ? { rows: rows || 10, cols: cols || 10, pitch }
      : VIAGRID_CONFIGS[size]
  const actualRows = config.rows
  const actualCols = config.cols
  const actualPitch = config.pitch

  const margin = 3
  const boardWidth = (actualCols - 1) * actualPitch + 2 * margin
  const boardHeight = (actualRows - 1) * actualPitch + 2 * margin

  const pinLabels: Record<string, string> = {}
  for (let row = 0; row < actualRows; row++) {
    for (let col = 0; col < actualCols; col++) {
      const pinNumber = row * actualCols + col + 1
      const rowLetter = String.fromCharCode(65 + row)
      const colNumber = col + 1
      pinLabels[`pin${pinNumber}`] = `${rowLetter}${colNumber}`
    }
  }

  return (
    <board
      {...boardProps}
      outline={[
        { x: -boardWidth / 2, y: boardHeight / 2 },
        { x: boardWidth / 2, y: boardHeight / 2 },
        { x: boardWidth / 2, y: -boardHeight / 2 },
        { x: -boardWidth / 2, y: -boardHeight / 2 },
        { x: -boardWidth / 2, y: boardHeight / 2 },
      ]}
    >
      <chip
        {...chipRest}
        name={resolvedName}
        footprint={
          <ViaGridBoardFootprint
            rows={actualRows}
            cols={actualCols}
            pitch={actualPitch}
          />
        }
        doNotPlace
        pcbX={0}
        pcbY={0}
        pinLabels={pinLabels}
        schWidth={Math.max(2, actualCols * 0.2)}
        schHeight={Math.max(1.5, actualRows * 0.15)}
      />
      {children}
    </board>
  )
}
