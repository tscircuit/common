import { ViaGridBoard } from "./ViaGridBoard"

export const ViaGridBoardSmallExample = () => {
  return (
    <ViaGridBoard size="small">
      <chip name="U1" pcbX={0} pcbY={0} />
    </ViaGridBoard>
  )
}

export const ViaGridBoardMediumExample = () => {
  return (
    <ViaGridBoard size="medium">
      <chip name="U1" pcbX={0} pcbY={0} />
    </ViaGridBoard>
  )
}

export const ViaGridBoardLargeExample = () => {
  return (
    <ViaGridBoard size="large">
      <chip name="U1" pcbX={0} pcbY={0} />
    </ViaGridBoard>
  )
}

export const ViaGridBoardCustomExample = () => {
  return (
    <ViaGridBoard size={{ rows: 5, cols: 5 }}>
      <chip name="U1" pcbX={0} pcbY={0} />
    </ViaGridBoard>
  )
}
