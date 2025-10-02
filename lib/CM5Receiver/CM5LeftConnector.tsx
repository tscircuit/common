import type { ChipProps } from "@tscircuit/props"
import { CM5Connector } from "./CM5Connector"

export const CM5LeftConnector = (props: {
  connections?: ChipProps["connections"]
}) => (
  <CM5Connector
    side="left"
    name="CM5_LEFT"
    schX={-3.01}
    pcbX={-33.98}
    connections={props.connections}
  />
)
