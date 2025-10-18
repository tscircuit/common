import { ProMicroBoard } from "./ProMicroBoard.circuit"
import type { ChipProps } from "@tscircuit/props"

export const ProMicroBoard3V3 = (props: ChipProps & { children?: any }) => {
  return <ProMicroBoard variant="3V3" {...props} />
}
