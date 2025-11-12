import { XiaoBoardInternal } from "./XiaoBoard.circuit"
import type { ChipProps } from "@tscircuit/props"

export const XiaoReceiver = (props: ChipProps & { children?: any }) => {
  return <XiaoBoardInternal variant="Receiver" {...props} />
}
