import { CM5Connector } from "./CM5Connector"
import type { ChipProps } from "@tscircuit/props"

export const CM5Receiver = (props: ChipProps) => {
  return (
    <group>
      <CM5Connector side="right" name="JP1" />
      <CM5Connector side="left" schX={-3.01} pcbX={-33.98} name="JP2" />
    </group>
  )
}
