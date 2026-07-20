import { test, expect } from "bun:test"
import { Circuit } from "tscircuit"
import { ArduinoShield } from "../lib/ArduinoShield/ArduinoShield.circuit"
import { RaspberryPiHatBoard } from "../lib/RaspberryPiHatBoard/RaspberryPiHatBoard.circuit"
import { MicroModBoard } from "../lib/MicroModBoard/MicroModBoard"
import { XiaoBoard } from "../lib/XiaoBoard/XiaoBoard.circuit"
import { Microcontroller_RP2040 } from "../index"
test("test", () => {
  expect(ArduinoShield).toBeDefined()
  expect(RaspberryPiHatBoard).toBeDefined()
  expect(MicroModBoard).toBeDefined()
  expect(XiaoBoard).toBeDefined() // TODO: Add tests
  expect(Microcontroller_RP2040).toBeDefined()
})

test("Microcontroller_RP2040 creates a named, positionable subcircuit", () => {
  const element = Microcontroller_RP2040({
    name: "MCU",
    pcbX: 12,
    pcbY: -4,
    pcbRotation: 90,
  }) as any

  expect(element.type).toBe("subcircuit")
  expect(element.props.name).toBe("MCU")
  expect(element.props.pcbX).toBe(12)
  expect(element.props.pcbY).toBe(-4)
  expect(element.props.pcbRotation).toBe(90)
})

test("Microcontroller_RP2040 renders its complete support circuit", async () => {
  const circuit = new Circuit()

  circuit.add(
    <board width="30mm" height="70mm" routingDisabled>
      <Microcontroller_RP2040
        name="MCU"
        connections={{ GPIO0: "net.USER_IO" }}
      />
    </board>,
  )

  await circuit.renderUntilSettled()

  const circuitJson = circuit.getCircuitJson() as any[]
  const rp2040 = circuitJson.find(
    (element) =>
      element.type === "source_component" &&
      element.manufacturer_part_number === "RP2040",
  )
  const rp2040PcbComponent = circuitJson.find(
    (element) =>
      element.type === "pcb_component" &&
      element.source_component_id === rp2040.source_component_id,
  )
  const groundPort = circuitJson.find(
    (element) =>
      element.type === "source_port" &&
      element.source_component_id === rp2040.source_component_id &&
      element.pin_number === 57,
  )
  const thermalPad = circuitJson.find(
    (element) =>
      element.type === "pcb_smtpad" &&
      element.pcb_component_id === rp2040PcbComponent.pcb_component_id &&
      element.port_hints?.includes("thermalpad"),
  )
  const thermalPadPort = circuitJson.find(
    (element) =>
      element.type === "pcb_port" &&
      element.pcb_port_id === thermalPad.pcb_port_id,
  )

  expect(circuit.db.source_group.getWhere({ name: "MCU" })).toBeDefined()
  expect(
    circuit.db.source_component
      .list()
      .some((component) => component.manufacturer_part_number === "RP2040"),
  ).toBe(true)
  expect(circuit.db.pcb_component.list().length).toBeGreaterThan(0)
  expect(circuit.db.source_net.getWhere({ name: "USER_IO" })).toBeDefined()
  expect(thermalPadPort.source_port_id).toBe(groundPort.source_port_id)
  expect(
    circuitJson.filter((element) => element.type.endsWith("_error")),
  ).toEqual([])
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
