import { test, expect } from "bun:test"
import { ArduinoShield } from "../lib/ArduinoShield/ArduinoShield.circuit"
import { RaspberryPiHatBoard } from "../lib/RaspberryPiHatBoard/RaspberryPiHatBoard.circuit"
import { MicroModBoard } from "../lib/MicroModBoard/MicroModBoard"
import { XiaoBoard } from "../lib/XiaoBoard/XiaoBoard.circuit"
test("test", () => {
  expect(ArduinoShield).toBeDefined()
  expect(RaspberryPiHatBoard).toBeDefined()
  expect(MicroModBoard).toBeDefined()
  expect(XiaoBoard).toBeDefined() // TODO: Add tests
})

test("ArduinoShield forwards explicit boardProps and chipProps", () => {
  const element = ArduinoShield({
    boardProps: {
      solderMaskColor: "blue",
      autorouter: "auto",
    },
    chipProps: {
      name: "A1",
      manufacturerPartNumber: "arduino-shield",
    },
  }) as any

  expect(element.type).toBe("board")
  expect(element.props.solderMaskColor).toBe("blue")
  expect(element.props.autorouter).toBe("auto")

  const chip = element.props.children[0]
  expect(chip.type).toBe("chip")
  expect(chip.props.name).toBe("A1_chip")
  expect(chip.props.manufacturerPartNumber).toBe("arduino-shield")
})

test("ArduinoShield uses a default chip name when chipProps.name is omitted", () => {
  const element = ArduinoShield({
    boardProps: {
      solderMaskColor: "blue",
    },
  }) as any

  const chip = element.props.children[0]
  expect(chip.type).toBe("chip")
  expect(chip.props.name).toBe("ArduinoShield_chip")
})
