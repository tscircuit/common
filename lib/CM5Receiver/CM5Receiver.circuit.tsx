import type { ChipProps } from "@tscircuit/props"
import type { CM5LeftPinLabels } from "./CM5LeftConnector"
import type { CM5RightPinLabels } from "./CM5RightConnector"
import { CM5LeftConnector, pinLabelsLeftSide } from "./CM5LeftConnector"
import { CM5RightConnector, pinLabelsRightSide } from "./CM5RightConnector"

const leftPins = new Set([
  ...Object.keys(pinLabelsLeftSide),
  ...Object.values(pinLabelsLeftSide).flat(),
])
const rightPins = new Set([
  ...Object.keys(pinLabelsRightSide),
  ...Object.values(pinLabelsRightSide).flat(),
])

export const CM5Receiver = (
  props: ChipProps<CM5LeftPinLabels & CM5RightPinLabels>,
) => {
  const { connections, name, ...groupProps } = props
  return (
    <group {...groupProps} name={name}>
      <CM5LeftConnector
        name={`${name}_LEFT`}
        connections={
          connections &&
          Object.fromEntries(
            Object.entries(connections).filter(
              ([pinName]) => leftPins.has(pinName) || !rightPins.has(pinName),
            ),
          )
        }
      />
      <CM5RightConnector
        name={`${name}_RIGHT`}
        connections={
          connections &&
          Object.fromEntries(
            Object.entries(connections).filter(
              ([pinName]) => rightPins.has(pinName) || !leftPins.has(pinName),
            ),
          )
        }
      />
    </group>
  )
}
