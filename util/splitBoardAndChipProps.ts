import type { BoardProps, ChipProps } from "@tscircuit/props"
import {
  boardProps as boardPropsSchema,
  chipProps as chipPropsSchema,
} from "@tscircuit/props"

type CombinedProps = Partial<BoardProps & ChipProps> & { boardName?: string }

const boardPropKeys = new Set<string>(
  Array.from(boardPropsSchema.keyof().options),
)
const chipPropKeys = new Set<string>(
  Array.from(chipPropsSchema.keyof().options),
)

export const splitBoardAndChipProps = (props: CombinedProps) => {
  const { boardName, ...rest } = props

  const boardProps = Object.fromEntries(
    Object.entries(rest).filter(([key]) => boardPropKeys.has(key)),
  ) as Partial<BoardProps>

  const chipProps = Object.fromEntries(
    Object.entries(rest).filter(([key]) => chipPropKeys.has(key)),
  ) as Partial<ChipProps>

  if (boardName !== undefined) {
    boardProps.name = boardName
  } else if (chipProps.name !== undefined && boardProps.name === undefined) {
    boardProps.name = chipProps.name
  }

  return { boardProps, chipProps }
}
