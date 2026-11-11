import { expect, test } from "bun:test"
import { Circuit } from "tscircuit"
import { TscircuitLogo, type TscircuitLogoProps } from "../index"

const renderLogo = async (props: TscircuitLogoProps = {}) => {
  const circuit = new Circuit()
  circuit.add(
    <board width={60} height={60}>
      <TscircuitLogo {...props} />
    </board>,
  )
  await circuit.renderUntilSettled()
  return circuit
}

test("logo renders without text and without electrical components", async () => {
  const circuit = await renderLogo()
  expect(circuit.db.pcb_silkscreen_text.list()).toHaveLength(0)
  expect(circuit.db.pcb_silkscreen_graphic.list().length).toBeGreaterThan(0)
  expect(circuit.db.pcb_silkscreen_path.list().length).toBeGreaterThan(0)
  expect(circuit.db.source_component.list()).toHaveLength(0)
  expect(
    circuit.getCircuitJson().filter((e) => e.type.endsWith("_error")),
  ).toEqual([])
})

test("placement, rotation, scale and bottom layer apply to the whole logo", async () => {
  const base = await renderLogo()
  const transformed = await renderLogo({
    pcbX: 10,
    pcbY: 5,
    pcbRotation: 90,
    scale: 2,
    layer: "bottom",
  })
  const paths = transformed.db.pcb_silkscreen_path.list()
  for (const [i, path] of paths.entries()) {
    expect(path.layer).toBe("bottom")
    const original = base.db.pcb_silkscreen_path.list()[i]
    expect(path.route[0].x).toBeCloseTo(10 - 2 * original.route[0].y)
    expect(path.route[0].y).toBeCloseTo(5 + 2 * original.route[0].x)
  }
})
