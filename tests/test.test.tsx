import { test, expect } from "bun:test"
import { ArduinoShield } from "../Common Boards/ArduinoShield/ArduinoShield.circuit"
import { RaspberryPiHatBoard } from "../Common Boards/RaspberryPiHatBoard/RaspberryPiHatBoard.circuit"
import { MicroModBoard } from "../Common Boards/MicroModBoard/MicroModBoard"
import { XiaoBoard } from "../Common Boards/XiaoBoard/XiaoBoard.circuit"
test("test", () => {
  expect(ArduinoShield).toBeDefined()
  expect(RaspberryPiHatBoard).toBeDefined()
  expect(MicroModBoard).toBeDefined()
  expect(XiaoBoard).toBeDefined()
})
