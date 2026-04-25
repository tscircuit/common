import { XiaoBoard, type XiaoBoardProps } from "./XiaoBoard.circuit"

export const XiaoBoardRP2040 = (
  props: Omit<XiaoBoardProps, "variant" | "withPlatedHoles">,
) => {
  return <XiaoBoard variant="RP2040" {...props} withPlatedHoles />
}
