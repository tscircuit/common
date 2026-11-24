import { expect, test } from "bun:test"
import { outlineBuilder } from "../util/outlineBuilder"

test("corner turns follow the cartesian PCB coordinate plane", () => {
  const clockwise = outlineBuilder(0, 0)
    .lineTo(2, 0)
    .corner({ radius: 1, turn: "cw" })
    .toArray()
  const counterclockwise = outlineBuilder(0, 0)
    .lineTo(2, 0)
    .corner({ radius: 1, turn: "ccw" })
    .toArray()

  const upwardClockwise = outlineBuilder(0, 0)
    .lineTo(0, 2)
    .corner({ radius: 1, turn: "cw" })
    .toArray()

  expect(clockwise.at(-1)?.x).toBeCloseTo(2)
  expect(clockwise.at(-1)?.y).toBeCloseTo(-1)
  expect(counterclockwise.at(-1)?.x).toBeCloseTo(2)
  expect(counterclockwise.at(-1)?.y).toBeCloseTo(1)
  expect(upwardClockwise.at(-1)?.x).toBeCloseTo(1)
  expect(upwardClockwise.at(-1)?.y).toBeCloseTo(2)
})
