import { CommonLayoutProps, GroupProps } from "@tscircuit/props"
import { OutlineBuilder } from "../../util/outlineBuilder"

export const ViaGridVia = (props: CommonLayoutProps) => {
  return (
    <via
      fromLayer="top"
      toLayer="bottom"
      outerDiameter="1.5mm"
      holeDiameter="0.3mm"
      // pcbX={0}
      // pcbY={0}
      {...props}
    />
  )
}

export const ViaGridPlus = (props: GroupProps) => {
  return (
    <group {...props}>
      <ViaGridVia pcbX={0} pcbY={0} />
      <ViaGridVia pcbX={2.5} pcbY={0} />
      <ViaGridVia pcbX={0} pcbY={2.5} />
      <ViaGridVia pcbX={-2.5} pcbY={0} />
      <ViaGridVia pcbX={0} pcbY={-2.5} />
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
