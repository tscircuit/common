import { expect, test } from "bun:test"
import { Circuit } from "tscircuit"
import MotorController from "./fixtures/rp2040-motor-controller.circuit"

// These are electrical design regressions, not claims of measured hardware
// failures. The downstream common@0.0.48 patch supplies these missing parts.
test("motor-controller MCU has dedicated 100 nF DVDD bypasses", async () => {
  const circuit = new Circuit()
  circuit.add(<MotorController />)
  await circuit.renderUntilSettled()
  expect(
    circuit
      .getCircuitJson()
      .filter((element: any) => element.type.endsWith("_error")),
  ).toEqual([])
  for (const [name, pinNumber] of [
    ["C_DVDD1", 50],
    ["C_DVDD2", 23],
  ] as const) {
    const capacitor = circuit.db.source_component.getWhere({ name })
    expect(capacitor).toBeDefined()
    expect(capacitor).toMatchObject({
      ftype: "simple_capacitor",
      capacitance: 1e-7,
    })
    const mcu = circuit.db.source_component.getWhere({ name: "U1" })!
    const powerPin = circuit.db.source_port.getWhere({
      source_component_id: mcu.source_component_id,
      pin_number: pinNumber,
    })!
    const capacitorPorts = circuit.db.source_port
      .list()
      .filter((p) => p.source_component_id === capacitor!.source_component_id)
    const positive = capacitorPorts.find((p) => p.pin_number === 1)!
    const negative = capacitorPorts.find((p) => p.pin_number === 2)!
    expect(
      circuit.db.source_trace
        .list()
        .some(
          (trace) =>
            trace.connected_source_port_ids.includes(positive.source_port_id) &&
            trace.connected_source_port_ids.includes(powerPin.source_port_id),
        ),
    ).toBe(true)
    const ground = circuit.db.source_net
      .list()
      .find((net) => net.name === "GND")!
    expect(
      circuit.db.source_trace
        .list()
        .some(
          (trace) =>
            trace.connected_source_port_ids.includes(negative.source_port_id) &&
            trace.connected_source_net_ids.includes(ground.source_net_id),
        ),
    ).toBe(true)
  }
})

test("motor-controller crystal matches the recommended 3.3 V oscillator circuit", async () => {
  const circuit = new Circuit()
  circuit.add(<MotorController />)
  await circuit.renderUntilSettled()
  const component = (name: string) =>
    circuit.db.source_component.getWhere({ name })!
  expect(component("Y1")).toMatchObject({
    manufacturer_part_number: "ABM8-272-T3",
    frequency: 12e6,
    load_capacitance: 10e-12,
  })
  expect(component("R_XOUT")).toMatchObject({ resistance: 1000 })
  for (const name of ["C_XIN", "C_XOUT"])
    expect(component(name)).toMatchObject({ capacitance: 15e-12 })
  const port = (name: string, pin: number) =>
    circuit.db.source_port.getWhere({
      source_component_id: component(name).source_component_id,
      pin_number: pin,
    })!.source_port_id
  const joined = (a: string, b: string) =>
    circuit.db.source_trace
      .list()
      .some(
        (t) =>
          t.connected_source_port_ids.includes(a) &&
          t.connected_source_port_ids.includes(b),
      )
  // Physical pin 21 must drive the crystal through R_XOUT. C_XOUT stays on
  // the crystal side; a direct trace across the resistor defeats protection.
  expect(joined(port("U1", 21), port("R_XOUT", 2))).toBe(true)
  expect(joined(port("R_XOUT", 1), port("Y1", 3))).toBe(true)
  expect(joined(port("C_XOUT", 1), port("Y1", 3))).toBe(true)
  expect(joined(port("U1", 21), port("Y1", 3))).toBe(false)
})

test("motor-controller analog filter BOM selects the declared ferrite bead", async () => {
  const circuit = new Circuit()
  circuit.add(<MotorController />)
  await circuit.renderUntilSettled()
  expect(
    circuit.db.source_component.getWhere({ name: "L_AVDD" }),
  ).toMatchObject({
    manufacturer_part_number: "BLM18AG601SN1D",
    supplier_part_numbers: { jlcpcb: ["C19330"] },
  })
})
