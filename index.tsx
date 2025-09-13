// Import the ArduinoShield component
import { ArduinoShield } from "./ArduinoShield";

export default () => (
  <board width="50mm" height="50mm">
    <ArduinoShield name="MyArduinoShield">
      {/* Example: Add some components to the shield */}
      <resistor resistance="1k" footprint="0402" name="R1" pcbX={5} pcbY={5} />
      <capacitor capacitance="1000pF" footprint="0402" name="C1" pcbX={10} pcbY={5} />
      <trace from=".R1 > .pin1" to=".C1 > .pin1" />
    </ArduinoShield>
  </board>
)