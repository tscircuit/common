import { describe, expect, test } from "bun:test"
import { splitBoardAndChipProps } from "../util/splitBoardAndChipProps"

test("splits board-specific props to boardProps and others to chipProps", () => {
  const props = {
    name: "U1",
    autorouter: "auto",
    pcbX: "10mm",
    boardAnchorAlignment: "center",
    boardAnchorPosition: [0, 0],
    schWidth: 2,
  }

  const { boardProps, chipProps } = splitBoardAndChipProps(props)

  // Only board-specific props should be in boardProps
  expect(boardProps).toEqual({
    autorouter: "auto",
    boardAnchorAlignment: "center",
    boardAnchorPosition: [0, 0],
  })

  // All other props should be in chipProps
  expect(chipProps).toEqual({
    name: "U1",
    pcbX: "10mm",
    schWidth: 2,
  })
})
