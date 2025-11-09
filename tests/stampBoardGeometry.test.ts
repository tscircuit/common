import { describe, expect, test } from "bun:test"
import { generateStampBoardGeometry } from "../lib/StampBoard/stampGeometry"

describe("generateStampBoardGeometry", () => {
  test("uses defaults to create a full stamp layout", () => {
    const geometry = generateStampBoardGeometry()

    expect(geometry.boardWidth).toBeCloseTo(22.58)
    expect(geometry.boardHeight).toBeCloseTo(50.8)
    expect(geometry.totalPins).toBe(44)
    expect(geometry.pads).toHaveLength(44)
    expect(geometry.padLabelMap.pin1).toBe("pin1")
    expect(geometry.padLabelMap.pin44).toBe("pin44")
    expect(geometry.triangleRoutePoints).not.toBeNull()
  })

  test("includes silkscreen labels and omits triangle when requested", () => {
    const geometry = generateStampBoardGeometry({
      showSilkscreenLabels: true,
      labelFormatter: (index) => `PIN${index}`,
    })

    expect(geometry.labels).toHaveLength(44)
    expect(geometry.padLabelMap.pin1).toBe("PIN1")
    expect(geometry.triangleRoutePoints).toBeNull()
  })

  test("adds inner perforation holes when enabled", () => {
    const geometry = generateStampBoardGeometry({
      includeInnerHoles: true,
    })

    expect(geometry.innerHoles.length).toBe(88)
  })

  test("honors custom pin counts on each side", () => {
    const geometry = generateStampBoardGeometry({
      leftPins: 10,
      rightPins: 8,
      topPins: 4,
      bottomPins: 0,
      pitch: 1.27,
    })

    expect(geometry.totalPins).toBe(22)
    expect(geometry.pads).toHaveLength(22)
    expect(geometry.boardHeight).toBeCloseTo(12.7)
    expect(geometry.sidePinOrder.left).toHaveLength(10)
    expect(geometry.sidePinOrder.right).toHaveLength(8)
    expect(geometry.sidePinOrder.top).toHaveLength(4)
    expect(geometry.sidePinOrder.bottom).toHaveLength(0)
  })
})
