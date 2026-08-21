import { MicrocontrollerRP2040, Microcontroller_RP2040 } from "../../index"

export default function MicrocontrollerRP2040MovedUsbC() {
  return (
    <board
      width="30mm"
      height="70mm"
      autorouter="auto_local"
      autorouterEffortLevel="10x"
    >
      <Microcontroller_RP2040 name="MCU">
        <MicrocontrollerRP2040.USBC pcbX={7.5} pcbY={27} />
      </Microcontroller_RP2040>
    </board>
  )
}
