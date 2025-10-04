import { describe, expect, test } from "bun:test"
import type { BoardProps, ChipProps } from "@tscircuit/props"
import { splitBoardAndChipProps } from "../util/splitBoardAndChipProps"

describe("splitBoardAndChipProps", () => {
  test("separates board-specific props while preserving chip props", () => {
    const props = {
      name: "U1",
      autorouter: "auto" as BoardProps["autorouter"],
      material: "fr4" as BoardProps["material"],
      pcbX: "10mm" as ChipProps["pcbX"],
      boardName: "BoardRef",
      schWidth: 2 as BoardProps["schWidth"],
    }

    const { boardProps, chipProps } = splitBoardAndChipProps(props)

    expect(boardProps.autorouter).toBe("auto")
    expect(boardProps.material).toBe("fr4")
    expect(boardProps.name).toBe("BoardRef")
    expect(boardProps.pcbX).toBe("10mm")
    expect(boardProps.schWidth).toBe(2)

    expect(chipProps.name).toBe("U1")
    expect("autorouter" in chipProps).toBe(false)
    expect(chipProps.pcbX).toBe("10mm")
  })
})
