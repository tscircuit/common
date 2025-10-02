import type { ChipProps } from "@tscircuit/props"
import type { CM5LeftPinLabels } from "./CM5LeftConnector"
import type { CM5RightPinLabels } from "./CM5RightConnector"
import { CM5LeftConnector } from "./CM5LeftConnector"
import { CM5RightConnector } from "./CM5RightConnector"

export const CM5Receiver = (
  props: ChipProps<CM5LeftPinLabels & CM5RightPinLabels>,
) => {
  const { connections, name, ...groupProps } = props
  return (
    <group {...groupProps}>
      <CM5LeftConnector name={`${name}_LEFT`} connections={connections} />
      <CM5RightConnector name={`${name}_RIGHT`} connections={connections} />
    </group>
  )
}
