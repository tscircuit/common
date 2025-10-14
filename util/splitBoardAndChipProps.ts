export const splitBoardAndChipProps = (props: any = {}) => {
  // Board-specific properties - these only make sense for the board component
  const boardOnlyProps = [
    "autorouter", // Autorouter configuration
    "boardAnchorAlignment", // Board anchor alignment
    "boardAnchorPosition", // Board anchor position
  ]

  const boardProps: Record<string, any> = {}
  const chipProps: Record<string, any> = {}

  // Only include board-specific props in boardProps
  for (const prop of boardOnlyProps) {
    if (prop in props) {
      boardProps[prop] = props[prop]
    }
  }

  // All other props go to the chip component
  Object.entries(props).forEach(([key, value]) => {
    if (!boardOnlyProps.includes(key)) {
      chipProps[key] = value
    }
  })

  return { boardProps, chipProps }
}
