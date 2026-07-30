import { Microcontroller_RP2040 } from "../../index"

export default function MicrocontrollerRP2040WithUsbC() {
  return (
    <board width="30mm" height="70mm" autorouter="sequential_trace">
      <Microcontroller_RP2040 name="MCU" />
    </board>
  )
}
