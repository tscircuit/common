import { expect, test } from "bun:test"
import { Circuit } from "tscircuit"
import { MadeByAiSilkscreen, type MadeByAiSilkscreenProps } from "../index"

const renderBadge = async (props: MadeByAiSilkscreenProps = {}) => {
  const circuit = new Circuit()
  circuit.add(
    <board width={60} height={60}>
      <MadeByAiSilkscreen {...props} />
    </board>,
  )
  await circuit.renderUntilSettled()
  return circuit
}

test("badge renders the message and embedded logo without electrical components", async () => {
  const circuit = await renderBadge()
  expect(circuit.db.pcb_silkscreen_text.list().map((t) => t.text)).toEqual([
    "Made by AI",
    "with tscircuit",
  ])
  expect(circuit.db.pcb_silkscreen_graphic.list().length).toBeGreaterThan(0)
  expect(circuit.db.pcb_silkscreen_path.list().length).toBeGreaterThan(0)
  expect(circuit.db.source_component.list()).toHaveLength(0)
  expect(
    circuit.getCircuitJson().filter((e) => e.type.endsWith("_error")),
  ).toEqual([])
})

test("placement, rotation, scale and bottom layer apply to the whole badge", async () => {
  const base = await renderBadge()
  const transformed = await renderBadge({
    pcbX: 10,
    pcbY: 5,
    pcbRotation: 90,
    scale: 2,
    layer: "bottom",
  })
  const baseTexts = base.db.pcb_silkscreen_text.list()
  const texts = transformed.db.pcb_silkscreen_text.list()
  for (const [i, text] of texts.entries()) {
    expect(text.layer).toBe("bottom")
    expect(text.font_size).toBe(2)
    expect(text.anchor_position.x).toBeCloseTo(
      10 - 2 * baseTexts[i].anchor_position.y,
    )
    expect(text.anchor_position.y).toBeCloseTo(
      5 + 2 * baseTexts[i].anchor_position.x,
    )
  }
  const paths = transformed.db.pcb_silkscreen_path.list()
  for (const [i, path] of paths.entries()) {
    expect(path.layer).toBe("bottom")
    const original = base.db.pcb_silkscreen_path.list()[i]
    expect(path.route[0].x).toBeCloseTo(10 - 2 * original.route[0].y)
    expect(path.route[0].y).toBeCloseTo(5 + 2 * original.route[0].x)
  }
})
