import { expect, test } from "bun:test"
import { ArduinoShield } from "../lib/ArduinoShield/ArduinoShield.circuit"
import { RaspberryPiHatBoard } from "../lib/RaspberryPiHatBoard/RaspberryPiHatBoard.circuit"
import { MicroModBoard } from "../lib/MicroModBoard/MicroModBoard"
import { XiaoBoard } from "../lib/XiaoBoard/XiaoBoard.circuit"

test("exports exist", () => {
  expect(ArduinoShield).toBeDefined()
  expect(RaspberryPiHatBoard).toBeDefined()
  expect(MicroModBoard).toBeDefined()
  expect(XiaoBoard).toBeDefined()
})

test("board props are forwarded to board elements", () => {
  const shieldBoard = ArduinoShield({
    name: "ArduinoShield",
    boardProps: { layers: 4, material: "fr1" },
  }) as any

  const raspberryBoard = RaspberryPiHatBoard({
    name: "Hat",
    boardProps: { layers: 4, material: "fr1" },
  }) as any

  const microModBoard = MicroModBoard({
    name: "MicroMod",
    boardProps: { layers: 4, material: "fr1" },
  }) as any

  const xiaoBoard = XiaoBoard({
    name: "Xiao",
    boardProps: { layers: 4, material: "fr1" },
  }) as any

  for (const element of [
    shieldBoard,
    raspberryBoard,
    microModBoard,
    xiaoBoard,
  ]) {
    expect(element.props.layers).toBe(4)
    expect(element.props.material).toBe("fr1")
  }
})
