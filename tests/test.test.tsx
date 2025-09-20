import { test, expect } from "bun:test"
import { ArduinoShield } from "../Common Boards/ArduinoShield/ArduinoShield.circuit"

test("test", () => {
  expect(ArduinoShield).toBeDefined()
})
