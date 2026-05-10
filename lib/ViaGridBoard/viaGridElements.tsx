import type { CommonLayoutProps, GroupProps } from "@tscircuit/props"
import { OutlineBuilder } from "../../util/outlineBuilder"

export const ViaGridVia = (props: CommonLayoutProps & { viaIndex?: number; name?: string }) => {
  const { viaIndex, name, ...restProps } = props
  return (
    <via
      name={name ?? `via_${viaIndex}`}
      fromLayer="top"
      toLayer="bottom"
      outerDiameter="1.2mm"
      holeDiameter="0.6mm"
      {...restProps}
    />
  )
}

export const ViaGridPlus = (props: GroupProps & { startIndex: number }) => {
  const { startIndex, ...restProps } = props
  return (
    <group {...restProps}>
      <ViaGridVia pcbX={0} pcbY={0} viaIndex={startIndex} />
      <ViaGridVia pcbX={2.5} pcbY={0} viaIndex={startIndex + 1} />
      <ViaGridVia pcbX={0} pcbY={2.5} viaIndex={startIndex + 2} />
      <ViaGridVia pcbX={-2.5} pcbY={0} viaIndex={startIndex + 3} />
      <ViaGridVia pcbX={0} pcbY={-2.5} viaIndex={startIndex + 4} />
    </group>
  )
}

export default ViaGridPlus

export const pacmanPolygonOutline = new OutlineBuilder(-0.2, -0.2)
  .lineTo(-0.2, 2.5)
  .arcTo(-2.5, 0, { radius: 2.5, sweep: true })
  .arcTo(0, -2.5, { radius: 2.5, sweep: true })
  .arcTo(2.5, -0.2, { radius: 2.5, sweep: true })
  .lineTo(-0.2, -0.2)
  .toArray()
