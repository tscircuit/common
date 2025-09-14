import { ArduinoShield } from "./ArduinoShield"

export default () => (
  <board  outline={ [
    { x: -34.29, y:  26.67, r: 3 },  // top-left corner
    { x:  32.29, y:  26.67 },        // top-right (sharp)
    { x:  34.29, y:  24.67 },        // top-right (sharp)
    { x:  34.29, y:  13.89 },        // start top slanted transition
    { x:  36.83, y:  11.35 },        // outward notch top
    { x:  36.83, y: -21.35 },        // outward notch bottom
    { x:  34.29, y: -23.89 },        // end bottom slanted transition
    { x:  34.29, y: -26.67, r: 3 },  // bottom-right corner
    { x: -34.29, y: -26.67, r: 3 }   // bottom-left corner
  ]}>
    <ArduinoShield name="MyArduinoShield">
    </ArduinoShield>
  </board>
)
