import type { ChipProps } from "@tscircuit/props"
import { CM5Connector } from "./CM5Connector"

export const CM5RightConnector = (props: {
  connections?: ChipProps["connections"]
}) => (
  <CM5Connector side="right" name="CM5_RIGHT" connections={props.connections} />
)
