import { XiaoBoard } from "./XiaoBoard.circuit"
import type { ChipProps } from "@tscircuit/props"

export const XiaoBoardRP2040 = (props: ChipProps & { children?: any }) => {
  return <XiaoBoard variant="RP2040" {...props} />
}
