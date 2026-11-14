import { expect, test } from "bun:test"
import { Circuit } from "tscircuit"
import { CM5Receiver } from "../index"

test.failing("CM5Receiver connects USB_P without a missing-pin error", async () => {
  const circuit = new Circuit()

  circuit.add(
    <board width="60mm" height="50mm" routingDisabled>
      <schematicsheet name="main" displayName="CM5 Receiver" sheetIndex={1} />
      <CM5Receiver
        name="CM5"
        schSheetName="main"
        connections={{ USB_P: "net.USB_DP" }}
      />
    </board>,
  )

  await circuit.renderUntilSettled()

  const leftConnector = circuit.db.source_component.getWhere({
    name: "CM5_LEFT",
  })
  const usbPort = circuit.db.source_port.getWhere({
    source_component_id: leftConnector?.source_component_id,
    name: "USB_P",
  })
  const usbNet = circuit.db.source_net.getWhere({ name: "USB_DP" })

  expect(leftConnector).toBeDefined()
  expect(usbPort).toBeDefined()
  expect(usbNet).toBeDefined()
  expect(circuit.db.source_trace.list()).toContainEqual(
    expect.objectContaining({
      connected_source_port_ids: [usbPort?.source_port_id],
      connected_source_net_ids: [usbNet?.source_net_id],
    }),
  )

  expect(circuit.db.source_trace_not_connected_error.list()).toEqual([])
})
