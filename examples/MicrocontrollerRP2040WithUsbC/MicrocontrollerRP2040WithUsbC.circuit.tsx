import { Microcontroller_RP2040 } from "../../index"

export default function MicrocontrollerRP2040WithUsbC() {
  return (
    <board
      width="30mm"
      height="70mm"
      autorouter="auto_local"
      autorouterEffortLevel="10x"
    >
      <Microcontroller_RP2040 name="MCU" />
    </board>
  )
}
