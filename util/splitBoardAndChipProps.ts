import type { BoardProps, ChipProps } from "@tscircuit/props"
import { boardOnlyPropNames } from "./generatedBoardOnlyPropNames"

const boardOnlyPropSet = new Set<string>(boardOnlyPropNames)

export const splitBoardAndChipProps = (
  props: Partial<BoardProps & ChipProps> & Record<string, any> = {},
) => {
  const boardProps: Record<string, any> = {}
  const chipProps: Record<string, any> = {}

  for (const [key, value] of Object.entries(props)) {
    if (boardOnlyPropSet.has(key)) {
      boardProps[key] = value
    } else {
      chipProps[key] = value
    }
  }

  return {
    boardProps: boardProps as Partial<BoardProps>,
    chipProps,
  } as {
    boardProps: Partial<BoardProps>
    chipProps: Record<string, any>
  }
}
