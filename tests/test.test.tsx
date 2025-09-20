import { test, expect } from "bun:test"
import { ArduinoShield } from "../lib/ArduinoShield/ArduinoShield.circuit"
import { RaspberryPiHatBoard } from "../lib/RaspberryPiHatBoard/RaspberryPiHatBoard.circuit"
import { MicroModBoard } from "../lib/MicroModBoard/MicroModBoard"
import { XiaoBoard } from "../lib/XiaoBoard/XiaoBoard.circuit"
test("test", () => {
  expect(ArduinoShield).toBeDefined()
  expect(RaspberryPiHatBoard).toBeDefined()
  expect(MicroModBoard).toBeDefined()
  expect(XiaoBoard).toBeDefined()
})
