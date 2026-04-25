import {
  boardProps as boardPropsSchema,
  chipProps as chipPropsSchema,
} from "@tscircuit/props"

const boardOnlyProps = Object.keys(boardPropsSchema.shape).filter(
  (prop) => !(prop in chipPropsSchema.shape),
)
const boardOnlyPropSet = new Set(boardOnlyProps)

export const splitBoardAndChipProps = (props: any = {}) => {
  const boardProps: Record<string, any> = {}
  const chipProps: Record<string, any> = {}

  // Only include board-specific props in boardProps
  for (const prop of boardOnlyProps) {
    if (prop in props) {
      boardProps[prop] = props[prop]
    }
  }

  // All other props go to the chip component
  for (const [key, value] of Object.entries(props)) {
    if (!boardOnlyPropSet.has(key)) {
      chipProps[key] = value
    }
  }

  return { boardProps, chipProps }
}
