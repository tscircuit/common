import { test, expect } from "bun:test"
import { ArduinoShield } from "../lib/ArduinoShield/ArduinoShield.circuit"
import { RaspberryPiHatBoard } from "../lib/RaspberryPiHatBoard/RaspberryPiHatBoard.circuit"
import { MicroModBoard } from "../lib/MicroModBoard/MicroModBoard"
import { XiaoBoard } from "../lib/XiaoBoard/XiaoBoard.circuit"
import { ProMicroBoard } from "../lib/ProMicroBoard/ProMicroBoard.circuit"
test("test", () => {
  expect(ArduinoShield).toBeDefined()
  expect(RaspberryPiHatBoard).toBeDefined()
  expect(MicroModBoard).toBeDefined()
  expect(XiaoBoard).toBeDefined()
  expect(ProMicroBoard).toBeDefined()
})
