import { ProMicroBoard } from "./ProMicroBoard.circuit"
import type { ChipProps } from "@tscircuit/props"

export const ProMicroBoard5V = (props: ChipProps & { children?: any }) => {
  return <ProMicroBoard variant="5V" {...props} withPlatedHoles />
}
