import { CommonLayoutProps, GroupProps } from "@tscircuit/props"

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
