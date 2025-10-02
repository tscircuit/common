import type { ChipProps } from "@tscircuit/props"
import type { CM5LeftPinLabels, CM5RightPinLabels } from "./CM5Connector"
import { CM5LeftConnector } from "./CM5LeftConnector"
import { CM5RightConnector } from "./CM5RightConnector"

export const CM5Receiver = (
  props: ChipProps<CM5LeftPinLabels & CM5RightPinLabels>,
) => (
  <group>
    <CM5LeftConnector connections={props.connections} />
    <CM5RightConnector connections={props.connections} />
  </group>
)
