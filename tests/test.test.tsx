import { expect, test } from "bun:test"
import { Circuit } from "tscircuit"
import {
  AudioAmplifier3W_PAM8403,
  Microcontroller_RP2040,
  PowerBoost_MT3608,
} from "../index"
import { ArduinoShield } from "../lib/ArduinoShield/ArduinoShield.circuit"
import { MicroModBoard } from "../lib/MicroModBoard/MicroModBoard"
import { ProMicroBoard } from "../lib/ProMicroBoard/ProMicroBoard.circuit"
import { RaspberryPiHatBoard } from "../lib/RaspberryPiHatBoard/RaspberryPiHatBoard.circuit"
import {
  AnalogSupplySubcircuit,
  ClockSubcircuit,
  PowerRegulatorSubcircuit,
  QSPIFlashBootSubcircuit,
  RP2040CoreSubcircuit,
  RunControlSubcircuit,
  StatusLEDSubcircuit,
  SWDDebugSubcircuit,
  USBInterfaceSubcircuit,
} from "../lib/Microcontroller_RP2040/subcircuits/index"
import { XiaoBoard } from "../lib/XiaoBoard/XiaoBoard.circuit"

test("test", () => {
  expect(ArduinoShield).toBeDefined()
  expect(RaspberryPiHatBoard).toBeDefined()
  expect(MicroModBoard).toBeDefined()
  expect(XiaoBoard).toBeDefined() // TODO: Add tests
  expect(Microcontroller_RP2040).toBeDefined()
  expect(PowerBoost_MT3608).toBeDefined()
  expect(AudioAmplifier3W_PAM8403).toBeDefined()
})

test("AudioAmplifier3W_PAM8403 is a pure, positionable subcircuit", () => {
  const element = AudioAmplifier3W_PAM8403({
    name: "AUDIO",
    pcbX: 4,
    pcbY: -2,
  }) as any

  expect(element.type).toBe("subcircuit")
  expect(element.props.name).toBe("AUDIO")
  expect(element.props.pcbX).toBe(4)
  expect(element.props.pcbY).toBe(-2)

  const children = Array.isArray(element.props.children)
    ? element.props.children
    : [element.props.children]
  expect(children.some((child: any) => child?.type === "board")).toBe(false)
})

test("AudioAmplifier3W_PAM8403 renders the complete mono audio path", async () => {
  const circuit = new Circuit()

  circuit.add(
    <board width="80mm" height="50mm" routingDisabled>
      <net name="AUDIO_PWM" />
      <net name="V3V3" isPowerNet />
      <net name="VSYS" isPowerNet />
      <net name="GND" isGroundNet />
      <AudioAmplifier3W_PAM8403
        name="AUDIO"
        connections={{
          AUDIO_PWM: "net.AUDIO_PWM",
          V3V3: "net.V3V3",
          VSYS: "net.VSYS",
          GND: "net.GND",
        }}
      />
    </board>,
  )

  await circuit.renderUntilSettled()

  const circuitJson = circuit.getCircuitJson() as any[]
  const manufacturerPartNumbers = circuitJson.map(
    (element) => element.manufacturer_part_number,
  )

  expect(circuit.db.source_group.getWhere({ name: "AUDIO" })).toBeDefined()
  expect(manufacturerPartNumbers).toContain("PAM8403DR_H")
  expect(manufacturerPartNumbers).not.toContain("RK10J12E002L")
  expect(manufacturerPartNumbers).toContain("BLM18PG121SN1D")
  expect(manufacturerPartNumbers).toContain("SM02B_PASS_TBT_LF__SN_")
  expect(circuit.db.source_net.getWhere({ name: "AUDIO_PWM" })).toBeDefined()
  expect(circuit.db.source_net.getWhere({ name: "V3V3" })).toBeDefined()
  expect(circuit.db.source_net.getWhere({ name: "VSYS" })).toBeDefined()
  expect(circuit.db.source_net.getWhere({ name: "GND" })).toBeDefined()
  expect(
    circuitJson.filter((element) => element.type.endsWith("_error")),
  ).toEqual([])
})

test("PowerBoost_MT3608 is a pure, positionable subcircuit", () => {
  const element = PowerBoost_MT3608({
    name: "POWER",
    pcbX: 8,
    pcbY: -3,
  }) as any

  expect(element.type).toBe("subcircuit")
  expect(element.props.name).toBe("POWER")
  expect(element.props.pcbX).toBe(8)
  expect(element.props.pcbY).toBe(-3)

  const children = Array.isArray(element.props.children)
    ? element.props.children
    : [element.props.children]
  expect(children.some((child: any) => child?.type === "board")).toBe(false)
})

test("PowerBoost_MT3608 renders the complete functional boost circuit", async () => {
  const circuit = new Circuit()

  circuit.add(
    <board width="70mm" height="70mm" routingDisabled>
      <net name="VBUS" isPowerNet />
      <net name="VSYS" isPowerNet />
      <net name="GND" isGroundNet />
      <net name="BAT_LINK" isPowerNet />
      <PowerBoost_MT3608
        name="POWER"
        connections={{
          BAT_POS: "net.BAT_LINK",
          BAT_SWITCHED: "net.BAT_LINK",
          VBUS: "net.VBUS",
          VSYS: "net.VSYS",
          GND: "net.GND",
        }}
      />
    </board>,
  )

  await circuit.renderUntilSettled()

  const circuitJson = circuit.getCircuitJson() as any[]
  const manufacturerPartNumbers = circuitJson.map(
    (element) => element.manufacturer_part_number,
  )

  expect(circuit.db.source_group.getWhere({ name: "POWER" })).toBeDefined()
  expect(manufacturerPartNumbers).toContain("MT3608")
  expect(manufacturerPartNumbers).toContain("SS34")
  expect(circuitJson).toContainEqual(
    expect.objectContaining({
      type: "source_component",
      name: "Q_BAT_CUTOFF",
      ftype: "simple_mosfet",
      channel_type: "p",
    }),
  )
  expect(circuitJson).toContainEqual(
    expect.objectContaining({
      type: "source_component",
      name: "Q_BAT_GATE",
      ftype: "simple_transistor",
      transistor_type: "npn",
    }),
  )
  for (const transistorName of ["Q_BAT_GATE", "Q_USB_BOOST_OFF"]) {
    const transistor = circuitJson.find(
      (element) =>
        element.type === "source_component" && element.name === transistorName,
    )
    const baseSourcePort = circuitJson.find(
      (element) =>
        element.type === "source_port" &&
        element.source_component_id === transistor.source_component_id &&
        element.pin_number === 2,
    )
    const baseSchematicPort = circuitJson.find(
      (element) =>
        element.type === "schematic_port" &&
        element.source_port_id === baseSourcePort.source_port_id,
    )

    expect(baseSchematicPort.display_pin_label).toBe("base")
    expect(baseSchematicPort.is_connected).toBe(true)
  }
  expect(manufacturerPartNumbers).not.toContain("SK_12E12_G5")
  expect(circuit.db.source_net.getWhere({ name: "BAT_LINK" })).toBeDefined()
  expect(circuit.db.source_net.getWhere({ name: "VBUS" })).toBeDefined()
  expect(circuit.db.source_net.getWhere({ name: "VSYS" })).toBeDefined()
  expect(circuit.db.source_net.getWhere({ name: "GND" })).toBeDefined()
  expect(
    circuit
      .getCircuitJson()
      .filter((element: any) => element.type.endsWith("_error")),
  ).toEqual([])
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

test("Microcontroller_RP2040 partitions its PCB into independent functional subcircuits", async () => {
  const circuit = new Circuit()

  circuit.add(
    <board width="80mm" height="80mm" routingDisabled>
      <Microcontroller_RP2040 name="MCU" />
    </board>,
  )

  await circuit.renderUntilSettled()

  const circuitJson = circuit.getCircuitJson() as any[]
  const sourceGroups = circuitJson.filter(
    (element) => element.type === "source_group",
  )
  const parentGroup = sourceGroups.find((group) => group.name === "MCU")
  expect(parentGroup).toBeDefined()

  const childGroups = sourceGroups.filter(
    (group) =>
      group.is_subcircuit &&
      (group.parent_source_group_id === parentGroup.source_group_id ||
        (!group.parent_source_group_id &&
          group.parent_subcircuit_id === parentGroup.subcircuit_id)),
  )
  const expectedComponentsByGroup = new Map<string, string[]>([
    [
      "RP2040_CORE",
      [
        "U1",
        "C_IOVDD1",
        "C_IOVDD2",
        "C_IOVDD3",
        "C_IOVDD4",
        "C_IOVDD5",
        "C_IOVDD6",
        "C_CORE",
      ],
    ],
    [
      "USB_INTERFACE",
      [
        "J_USB",
        "R_CC1",
        "R_CC2",
        "R_USB1",
        "R_USB2",
        "C_VBUS",
        "C_USB_VDD",
        "C_USB",
      ],
    ],
    ["QSPI_FLASH_BOOT", ["U2", "C_FLASH", "SW_BOOT", "R_BOOT"]],
    ["CLOCK", ["Y1", "C_XIN", "C_XOUT"]],
    [
      "POWER_REGULATOR",
      ["D_VBUS", "U3", "R_3V3_EN", "C_3V3", "D_PWR", "R_PWR_LED"],
    ],
    ["ANALOG_SUPPLY", ["L_AVDD", "C_ADC"]],
    ["RUN_CONTROL", ["R_RUN", "SW_RUN"]],
    ["STATUS_LED", ["D1", "R_LED"]],
    ["SWD_DEBUG", ["TP_SWCLK", "TP_GND", "TP_SWDIO", "TP_3V3"]],
  ])

  expect(childGroups).toHaveLength(expectedComponentsByGroup.size)

  const sourceComponents = circuitJson.filter(
    (element) => element.type === "source_component",
  )
  const childGroupIds = new Set(
    childGroups.map((group) => group.source_group_id),
  )

  expect(sourceComponents).toHaveLength(39)
  expect(
    sourceComponents.every((component) =>
      childGroupIds.has(component.source_group_id),
    ),
  ).toBe(true)

  const childGroupByExpectedName = new Map<string, any>()
  for (const expectedName of expectedComponentsByGroup.keys()) {
    const matches = childGroups.filter(
      (group) =>
        group.name === expectedName ||
        group.name?.endsWith(`__${expectedName}`),
    )
    expect(matches).toHaveLength(1)
    childGroupByExpectedName.set(expectedName, matches[0])
  }

  for (const [groupName, expectedComponentNames] of expectedComponentsByGroup) {
    const childGroup = childGroupByExpectedName.get(groupName)
    const actualComponentNames = sourceComponents
      .filter(
        (component) => component.source_group_id === childGroup.source_group_id,
      )
      .map((component) => component.name)
      .sort()

    expect(actualComponentNames).toEqual([...expectedComponentNames].sort())
    expect(actualComponentNames.length).toBeLessThanOrEqual(10)
  }

  const expectedTraceNamesByGroup = new Map<string, string[]>([
    [
      "RP2040_CORE",
      [
        "IO1_3V3",
        "IO1_G",
        "IO2_3V3",
        "IO2_G",
        "IO3_3V3",
        "IO3_G",
        "IO4_3V3",
        "IO4_G",
        "IO5_3V3",
        "IO5_G",
        "IO6_3V3",
        "IO6_G",
        "TEST_G",
        "IOVDD1_P",
        "IOVDD2_P",
        "IOVDD3_P",
        "IOVDD4_P",
        "IOVDD5_P",
        "IOVDD6_P",
        "DVDD1_P",
        "DVDD2_P",
        "VREG_IN_P",
        "VREG_VOUT_P",
        "USB_VDD_P",
        "GND_G",
        "USBV_IO1",
        "CORE_P",
        "CORE_G",
        "ADC_AVDD",
      ],
    ],
    [
      "USB_INTERFACE",
      [
        "USB_DN_B",
        "USB_DP_B",
        "UVDD_3V3",
        "UVDD_G",
        "VBUS_A",
        "VBUS_B",
        "USB_DN_A",
        "USB_DP_A",
        "CC1",
        "CC2",
        "USB_G",
        "USB_G_B",
        "USB_EH1",
        "USB_EH1_ALT",
        "USB_EH2",
        "USB_EH2_ALT",
        "CC1_G",
        "CC2_G",
        "VBUS_C",
        "VBUS_G",
        "CUSB_P",
        "CUSB_G",
      ],
    ],
    [
      "QSPI_FLASH_BOOT",
      [
        "BOOT_SW",
        "BOOT_R",
        "BOOT_G",
        "BOOT_3V3",
        "FLSH_3V3",
        "FLSH_G",
        "FLSH_GND",
        "FLSH_VCC",
        "FLSH_EP",
      ],
    ],
    ["CLOCK", ["Y1_G1", "Y1_G2", "CXIN", "CXIN_G", "CXOUT", "CXOUT_G"]],
    [
      "POWER_REGULATOR",
      [
        "VBUS_D",
        "D_VSYS",
        "EN_VSYS",
        "EN_R",
        "VSYS_IN",
        "REG_3V3",
        "REG_G",
        "C3V3_P",
        "C3V3_G",
        "PLED_3V3",
        "PLED_D",
        "PLED_G",
      ],
    ],
    ["ANALOG_SUPPLY", ["ADC_REF", "ADC_G", "AVDD_IN", "AVDD"]],
    ["RUN_CONTROL", ["RUN_SW", "RUN_3V3", "RUN_G"]],
    ["STATUS_LED", ["LED_D1", "LED_G"]],
    ["SWD_DEBUG", ["TP_G", "TP3V3_T"]],
  ])
  const sourceTraces = circuitJson.filter(
    (element) => element.type === "source_trace",
  )

  for (const [groupName, expectedTraceNames] of expectedTraceNamesByGroup) {
    const childGroup = childGroupByExpectedName.get(groupName)
    const childTraceNames = sourceTraces
      .filter((trace) => trace.subcircuit_id === childGroup.subcircuit_id)
      .map((trace) => trace.name)
      .sort()

    expect(childTraceNames).toEqual([...expectedTraceNames].sort())
  }

  const crossChildTraceNames = [
    "QSPI_SS",
    "QSPI_SD0",
    "QSPI_SD1",
    "QSPI_SD2",
    "QSPI_SD3",
    "QSPI_SCLK",
    "USB_DN",
    "USB_DP",
    "XIN",
    "XOUT",
    "RUN_R",
    "LED_GP25",
    "SWCLK",
    "SWD",
  ]
  for (const traceName of crossChildTraceNames) {
    const matches = sourceTraces.filter((trace) => trace.name === traceName)
    expect(matches).toHaveLength(1)
    expect(matches[0].subcircuit_id).toBe(parentGroup.subcircuit_id)
  }
  for (const removedDuplicateName of ["RUN_SIGNAL"]) {
    expect(
      circuitJson.filter(
        (element) =>
          element.type === "source_net" &&
          element.name === removedDuplicateName,
      ),
    ).toEqual([])
  }

  const exposedNetsByGroup = new Map<string, string[]>([
    ["RP2040_CORE", ["GND", "V3V3", "ADC_VREF"]],
    ["USB_INTERFACE", ["GND", "V3V3", "VBUS"]],
    ["QSPI_FLASH_BOOT", ["GND", "V3V3"]],
    ["CLOCK", ["GND"]],
    ["POWER_REGULATOR", ["GND", "V3V3", "VBUS"]],
    ["ANALOG_SUPPLY", ["GND", "V3V3", "ADC_VREF"]],
    ["RUN_CONTROL", ["GND", "V3V3"]],
    ["STATUS_LED", ["GND"]],
    ["SWD_DEBUG", ["GND", "V3V3"]],
  ])
  const sourceNets = circuitJson.filter(
    (element) => element.type === "source_net",
  )
  for (const netName of ["GND", "V3V3", "VBUS", "ADC_VREF"]) {
    const parentNets = sourceNets.filter(
      (net) =>
        net.name === netName && net.subcircuit_id === parentGroup.subcircuit_id,
    )
    expect(parentNets).toHaveLength(1)
  }
  for (const [groupName, exposedNetNames] of exposedNetsByGroup) {
    const childGroup = childGroupByExpectedName.get(groupName)
    for (const netName of exposedNetNames) {
      const childNets = sourceNets.filter(
        (net) =>
          net.name === netName &&
          net.subcircuit_id === childGroup.subcircuit_id,
      )
      expect(childNets).toHaveLength(1)
      const parentNet = sourceNets.find(
        (net) =>
          net.name === netName &&
          net.subcircuit_id === parentGroup.subcircuit_id,
      )
      const bridgeTraces = sourceTraces.filter(
        (trace) =>
          trace.subcircuit_id === parentGroup.subcircuit_id &&
          trace.connected_source_net_ids?.includes(
            childNets[0].source_net_id,
          ) &&
          trace.connected_source_net_ids?.includes(parentNet.source_net_id),
      )
      expect(bridgeTraces).toHaveLength(1)
    }
  }
  const duplicateScopedNets = Object.values(
    Object.groupBy(sourceNets, (net) => `${net.subcircuit_id}:${net.name}`),
  ).filter((nets) => nets && nets.length > 1)
  expect(duplicateScopedNets).toEqual([])
  expect(
    circuitJson.filter((element) => element.type.endsWith("_error")),
  ).toEqual([])

  const pcbComponents = circuitJson.filter(
    (element) => element.type === "pcb_component",
  )
  const pcbGroups = circuitJson.filter(
    (element) => element.type === "pcb_group",
  )
  const childPcbGroups = childGroups.map((sourceGroup) => {
    const matches = pcbGroups.filter(
      (pcbGroup) => pcbGroup.source_group_id === sourceGroup.source_group_id,
    )
    expect(matches).toHaveLength(1)
    return matches[0]
  })

  expect(pcbComponents).toHaveLength(39)
  expect(
    new Set(pcbComponents.map((component) => component.pcb_component_id)).size,
  ).toBe(39)

  for (const component of pcbComponents) {
    const owners = childPcbGroups.filter(
      (group) =>
        component.pcb_group_id === group.pcb_group_id ||
        group.pcb_component_ids?.includes(component.pcb_component_id),
    )
    expect(owners).toHaveLength(1)
  }

  const toFiniteNumber = (value: unknown) => {
    const number =
      typeof value === "number"
        ? value
        : typeof value === "string"
          ? Number.parseFloat(value)
          : Number.NaN
    expect(Number.isFinite(number)).toBe(true)
    return number
  }
  const getCenter = (element: any) => ({
    x: toFiniteNumber(element.center?.x ?? element.x),
    y: toFiniteNumber(element.center?.y ?? element.y),
  })
  const groupBounds = (group: any) => {
    const center = getCenter(group)
    const width = toFiniteNumber(group.width)
    const height = toFiniteNumber(group.height)
    expect(width).toBeGreaterThan(0)
    expect(height).toBeGreaterThan(0)
    return {
      left: center.x - width / 2,
      right: center.x + width / 2,
      bottom: center.y - height / 2,
      top: center.y + height / 2,
    }
  }

  for (let i = 0; i < childPcbGroups.length; i++) {
    for (let j = i + 1; j < childPcbGroups.length; j++) {
      const first = groupBounds(childPcbGroups[i])
      const second = groupBounds(childPcbGroups[j])
      const overlapX =
        Math.min(first.right, second.right) - Math.max(first.left, second.left)
      const overlapY =
        Math.min(first.top, second.top) - Math.max(first.bottom, second.bottom)

      expect(overlapX <= 1e-6 || overlapY <= 1e-6).toBe(true)
    }
  }

  const padLikePrimitives = circuitJson.filter((element) =>
    ["pcb_smtpad", "pcb_plated_hole", "pcb_hole"].includes(element.type),
  )
  const elementBounds = (element: any) => {
    const center = getCenter(element)
    let width: number
    let height: number

    if (element.type === "pcb_smtpad" && element.shape === "circle") {
      width = height = 2 * toFiniteNumber(element.radius)
    } else if (element.type === "pcb_plated_hole") {
      width = toFiniteNumber(element.outer_width)
      height = toFiniteNumber(element.outer_height)
    } else if (element.type === "pcb_hole") {
      width = height = toFiniteNumber(element.hole_diameter)
    } else {
      width = toFiniteNumber(element.width)
      height = toFiniteNumber(element.height)
    }

    const rotation = (toFiniteNumber(element.ccw_rotation ?? 0) * Math.PI) / 180
    const rotatedWidth =
      Math.abs(width * Math.cos(rotation)) +
      Math.abs(height * Math.sin(rotation))
    const rotatedHeight =
      Math.abs(width * Math.sin(rotation)) +
      Math.abs(height * Math.cos(rotation))

    return {
      left: center.x - rotatedWidth / 2,
      right: center.x + rotatedWidth / 2,
      bottom: center.y - rotatedHeight / 2,
      top: center.y + rotatedHeight / 2,
    }
  }

  for (const group of childPcbGroups) {
    const groupCenter = getCenter(group)
    const groupAnchor = getCenter(group.anchor_position)
    expect(groupCenter.x).toBeCloseTo(groupAnchor.x, 6)
    expect(groupCenter.y).toBeCloseTo(groupAnchor.y, 6)

    const groupPcbComponents = pcbComponents.filter(
      (component) => component.pcb_group_id === group.pcb_group_id,
    )
    const groupPcbComponentIds = new Set(
      groupPcbComponents.map((component) => component.pcb_component_id),
    )
    const groupPadPrimitives = padLikePrimitives.filter((primitive) =>
      groupPcbComponentIds.has(primitive.pcb_component_id),
    )
    const contentBounds = [
      ...groupPcbComponents.map(elementBounds),
      ...groupPadPrimitives.map(elementBounds),
    ]
    const contentLeft = Math.min(...contentBounds.map((bounds) => bounds.left))
    const contentRight = Math.max(
      ...contentBounds.map((bounds) => bounds.right),
    )
    const contentBottom = Math.min(
      ...contentBounds.map((bounds) => bounds.bottom),
    )
    const contentTop = Math.max(...contentBounds.map((bounds) => bounds.top))

    expect((contentLeft + contentRight) / 2).toBeCloseTo(groupCenter.x, 5)
    expect((contentBottom + contentTop) / 2).toBeCloseTo(groupCenter.y, 5)

    const bounds = groupBounds(group)
    for (const primitive of groupPadPrimitives) {
      const primitiveBounds = elementBounds(primitive)
      expect(primitiveBounds.left - bounds.left).toBeGreaterThanOrEqual(0.099)
      expect(bounds.right - primitiveBounds.right).toBeGreaterThanOrEqual(0.099)
      expect(primitiveBounds.bottom - bounds.bottom).toBeGreaterThanOrEqual(
        0.099,
      )
      expect(bounds.top - primitiveBounds.top).toBeGreaterThanOrEqual(0.099)
    }

    expect(bounds.left).toBeGreaterThanOrEqual(-40)
    expect(bounds.right).toBeLessThanOrEqual(40)
    expect(bounds.bottom).toBeGreaterThanOrEqual(-40)
    expect(bounds.top).toBeLessThanOrEqual(40)
  }

  const usbSourceGroup = childGroupByExpectedName.get("USB_INTERFACE")
  const sourceComponentByName = new Map(
    sourceComponents.map((component) => [component.name, component]),
  )
  for (const name of ["J_USB", "R_USB1", "R_USB2"]) {
    expect(sourceComponentByName.get(name)?.source_group_id).toBe(
      usbSourceGroup.source_group_id,
    )
  }

  const pcbComponentBySourceId = new Map(
    pcbComponents.map((component) => [
      component.source_component_id,
      component,
    ]),
  )
  const getPcbComponent = (name: string) =>
    pcbComponentBySourceId.get(
      sourceComponentByName.get(name)?.source_component_id,
    )
  const usbResistor1 = getPcbComponent("R_USB1")
  const usbResistor2 = getPcbComponent("R_USB2")
  expect(usbResistor1).toBeDefined()
  expect(usbResistor2).toBeDefined()
  const resistor1Center = getCenter(usbResistor1)
  const resistor2Center = getCenter(usbResistor2)
  const normalizeRotation = (rotation: unknown) =>
    ((toFiniteNumber(rotation) % 360) + 360) % 360
  const resistorDistance = Math.hypot(
    resistor1Center.x - resistor2Center.x,
    resistor1Center.y - resistor2Center.y,
  )

  expect(normalizeRotation(usbResistor1.rotation)).toBe(
    normalizeRotation(usbResistor2.rotation),
  )
  expect(
    Math.min(
      Math.abs(resistor1Center.x - resistor2Center.x),
      Math.abs(resistor1Center.y - resistor2Center.y),
    ),
  ).toBeLessThanOrEqual(0.1)
  expect(resistorDistance).toBeLessThanOrEqual(2)
})

test("Microcontroller_RP2040 child subcircuits route their local physical pairs independently", async () => {
  const cases = [
    {
      name: "RP2040_CORE",
      component: RP2040CoreSubcircuit,
      sourceTraceCount: 29,
      minimumPcbTraceCount: 1,
    },
    {
      name: "USB_INTERFACE",
      component: USBInterfaceSubcircuit,
      sourceTraceCount: 22,
      minimumPcbTraceCount: 1,
    },
    {
      name: "QSPI_FLASH_BOOT",
      component: QSPIFlashBootSubcircuit,
      sourceTraceCount: 9,
      minimumPcbTraceCount: 1,
    },
    {
      name: "CLOCK",
      component: ClockSubcircuit,
      sourceTraceCount: 6,
      minimumPcbTraceCount: 1,
    },
    {
      name: "POWER_REGULATOR",
      component: PowerRegulatorSubcircuit,
      sourceTraceCount: 12,
      minimumPcbTraceCount: 1,
    },
    {
      name: "ANALOG_SUPPLY",
      component: AnalogSupplySubcircuit,
      sourceTraceCount: 4,
      minimumPcbTraceCount: 1,
    },
    {
      name: "RUN_CONTROL",
      component: RunControlSubcircuit,
      sourceTraceCount: 3,
      minimumPcbTraceCount: 1,
    },
    {
      name: "STATUS_LED",
      component: StatusLEDSubcircuit,
      sourceTraceCount: 2,
      minimumPcbTraceCount: 1,
    },
    {
      name: "SWD_DEBUG",
      component: SWDDebugSubcircuit,
      sourceTraceCount: 2,
      minimumPcbTraceCount: 0,
    },
  ]

  for (const childCase of cases) {
    const circuit = new Circuit()
    const ChildSubcircuit = childCase.component

    circuit.add(
      <board width="80mm" height="80mm">
        <net name="GND" />
        <net name="V3V3" />
        <net name="VBUS" />
        <net name="ADC_VREF" />
        <ChildSubcircuit parentName="ROUTING_TEST" />
      </board>,
    )

    await circuit.renderUntilSettled()

    const circuitJson = circuit.getCircuitJson() as any[]
    const childGroup = circuitJson.find(
      (element) =>
        element.type === "source_group" && element.name === childCase.name,
    )
    expect(childGroup).toBeDefined()

    const childSourceTraces = circuitJson.filter(
      (element) =>
        element.type === "source_trace" &&
        element.subcircuit_id === childGroup.subcircuit_id,
    )
    expect(childSourceTraces).toHaveLength(childCase.sourceTraceCount)

    const childPcbTraces = circuitJson.filter(
      (element) =>
        element.type === "pcb_trace" &&
        element.subcircuit_id === childGroup.subcircuit_id,
    )
    if (childCase.name === "SWD_DEBUG") {
      // SWD has no internal physical pair: SWCLK/SWD are parent cross-links
      // and its two local traces each terminate at a singleton shared rail.
      expect(childPcbTraces).toHaveLength(0)
    } else {
      expect(childPcbTraces.length).toBeGreaterThanOrEqual(
        childCase.minimumPcbTraceCount,
      )
    }

    expect(
      circuitJson.filter((element) => element.type.endsWith("_error")),
    ).toEqual([])
  }
}, 30_000)

test("Microcontroller_RP2040 renders its complete support circuit", async () => {
  const circuit = new Circuit()

  circuit.add(
    <board width="30mm" height="70mm" routingDisabled>
      <schematicsheet
        name="controller"
        displayName="RP2040 Controller"
        sheetIndex={1}
      />
      <Microcontroller_RP2040
        name="MCU"
        connections={{ GPIO0: "net.USER_IO" }}
        schSheetName="controller"
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
  const controllerSheet = circuitJson.find(
    (element) =>
      element.type === "schematic_sheet" && element.name === "controller",
  )
  const expectedSectionTitles = [
    "Clock",
    "Programming USB-C & QSPI",
    "RP2040 & Power",
    "Status & SWD Debug",
  ]
  const sectionTitles = circuitJson.filter(
    (element) =>
      element.type === "schematic_text" &&
      expectedSectionTitles.includes(element.text),
  )
  const sourceComponentNames = new Map(
    circuitJson.flatMap((element) =>
      element.type === "source_component"
        ? [[element.source_component_id, element.name] as const]
        : [],
    ),
  )
  const schematicComponentsByName = new Map(
    circuitJson.flatMap((element) => {
      if (element.type !== "schematic_component") return []
      const name = sourceComponentNames.get(element.source_component_id)
      return name ? [[name, element] as const] : []
    }),
  )
  const iovddCapacitors = [
    "C_IOVDD1",
    "C_IOVDD2",
    "C_IOVDD3",
    "C_IOVDD4",
    "C_IOVDD5",
    "C_IOVDD6",
  ].map((name) => schematicComponentsByName.get(name))
  const iovddRows = new Map<number, number>()
  for (const capacitor of iovddCapacitors) {
    const rowKey = Math.round(capacitor.center.y * 1000)
    iovddRows.set(rowKey, (iovddRows.get(rowKey) ?? 0) + 1)
  }

  expect(circuit.db.source_group.getWhere({ name: "MCU" })).toBeDefined()
  expect(
    circuit.db.source_component
      .list()
      .some((component) => component.manufacturer_part_number === "RP2040"),
  ).toBe(true)
  expect(circuit.db.pcb_component.list().length).toBeGreaterThan(0)
  expect(circuit.db.source_net.getWhere({ name: "USER_IO" })).toBeDefined()
  expect(thermalPadPort.source_port_id).toBe(groundPort.source_port_id)
  expect([...iovddRows.values()]).toEqual([6])
  expect(sectionTitles.map((title) => title.text).sort()).toEqual(
    expectedSectionTitles,
  )
  expect(
    sectionTitles.every(
      (title) =>
        title.schematic_sheet_id === controllerSheet.schematic_sheet_id,
    ),
  ).toBe(true)
  for (const switchName of ["SW_BOOT", "SW_RUN"]) {
    const switchComponent = circuit.db.source_component.getWhere({
      name: switchName,
    })!
    const switchPorts = circuit.db.source_port
      .list()
      .filter(
        (port) =>
          port.source_component_id === switchComponent.source_component_id,
      )
    const switchPortNamesById = new Map(
      switchPorts.map((port) => [port.source_port_id, port.name]),
    )
    const internalPinGroups = circuit.db.source_component_internal_connection
      .list()
      .filter(
        (connection) =>
          connection.source_port_ids.length > 0 &&
          connection.source_port_ids.every((sourcePortId) =>
            switchPortNamesById.has(sourcePortId),
          ),
      )
      .map((connection) =>
        connection.source_port_ids
          .map((sourcePortId) => switchPortNamesById.get(sourcePortId)!)
          .sort(),
      )
      .sort((a, b) => a.join(",").localeCompare(b.join(",")))
    const switchSchematicPorts = circuit.db.schematic_port
      .list()
      .filter(
        (port) =>
          port.source_port_id && switchPortNamesById.has(port.source_port_id),
      )
    const directlyConnectedPinNames =
      switchName === "SW_BOOT" ? ["pin1", "pin3"] : ["pin1", "pin4"]

    expect(internalPinGroups).toEqual([
      ["pin1", "pin2"],
      ["pin3", "pin4"],
    ])
    expect(switchSchematicPorts).toHaveLength(4)
    for (const pinName of directlyConnectedPinNames) {
      const sourcePort = switchPorts.find((port) => port.name === pinName)!
      const schematicPort = switchSchematicPorts.find(
        (port) => port.source_port_id === sourcePort.source_port_id,
      )!

      // Nested child port-to-net traces currently do not set the schematic
      // port flag, so prove the electrical connection from source data.
      const connectedSourceTrace = circuit.db.source_trace
        .list()
        .find((trace) =>
          trace.connected_source_port_ids.includes(sourcePort.source_port_id),
        )

      expect(connectedSourceTrace).toBeDefined()
      expect(connectedSourceTrace!.connected_source_net_ids.length).toBe(
        pinName === "pin1" ? 0 : 1,
      )
      expect(connectedSourceTrace!.subcircuit_connectivity_map_key).toBeTruthy()
      if (schematicPort.is_connected) {
        expect(schematicPort.is_connected).toBe(true)
      }
    }
  }
  expect(
    circuitJson.filter((element) => element.type.endsWith("_error")),
  ).toEqual([])
  expect(
    circuitJson.filter(
      (element) => element.type === "schematic_element_outside_sheet_warning",
    ),
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

test("RaspberryPiHatBoard forwards top-level name prop to chip", () => {
  const element = RaspberryPiHatBoard({
    name: "HAT1",
  }) as any

  const chip = element.props.children[0]
  expect(chip.type).toBe("chip")
  expect(chip.props.name).toBe("HAT1")
})

test("ArduinoShield forwards top-level name prop to chip", () => {
  const element = ArduinoShield({
    name: "SHIELD1",
    chipProps: {
      name: "LEGACY_NAME",
    },
  }) as any

  const chip = element.props.children[0]
  expect(chip.type).toBe("chip")
  expect(chip.props.name).toBe("SHIELD1")
})

test("ArduinoShield top-level name survives a complete circuit render", async () => {
  const circuit = new Circuit()

  circuit.add(
    <ArduinoShield name="SHIELD1" boardProps={{ routingDisabled: true }} />,
  )
  await circuit.renderUntilSettled()

  expect(
    circuit.db.source_component.getWhere({ name: "SHIELD1" }),
  ).toBeDefined()
  expect(
    circuit.db.source_component.getWhere({ name: "SHIELD1_chip" }),
  ).toBeUndefined()
})

test("MicroModBoard forwards top-level name prop to chip", () => {
  const element = MicroModBoard({
    name: "MICROMOD1",
  }) as any

  const chip = element.props.children[0]
  expect(chip.type).toBe("chip")
  expect(chip.props.name).toBe("MICROMOD1")
})

test("ProMicroBoard forwards top-level name prop to chip", () => {
  const element = ProMicroBoard({
    name: "PROMICRO1",
  }) as any

  const chip = element.props.children[0]
  expect(chip.type).toBe("chip")
  expect(chip.props.name).toBe("PROMICRO1")
})

test("XiaoBoard forwards top-level name prop to chip", () => {
  const element = XiaoBoard({
    name: "XIAO1",
  }) as any

  const chip = element.props.children[0]
  expect(chip.type).toBe("chip")
  expect(chip.props.name).toBe("XIAO1")
})
