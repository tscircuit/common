import { InterconnectPga15x4Receiver } from "../lib/InterconnectPga15x4/InterconnectPga15x4Receiver"

export default () => {
  return (
    <board width="50mm" height="50mm" autorouter="laser_prefab">
      <InterconnectPga15x4Receiver pcbX={0} pcbY={18} name="IC1" />

      <resistor
        name="R1"
        resistance="1k"
        footprint="0805"
        connections={{
          pin1: "U1.pin1",
          pin2: "net.GND",
        }}
      />
      <chip
        name="U1"
        footprint="soic8"
        pcbX={0}
        pcbY={0}
        connections={{
          pin3: "U1.pin5",
        }}
      />
      <resistor
        name="R2"
        resistance="1k"
        footprint="0805"
        connections={{
          pin1: "U1.pin2",
          pin2: "net.GND",
        }}
      />
      <resistor
        name="R3"
        resistance="2k"
        footprint="0805"
        connections={{
          pin1: "U1.pin8",
          pin2: "net.GND",
        }}
      />
      <resistor
        name="R4"
        resistance="2k"
        footprint="0805"
        connections={{
          pin1: "U1.pin7",
          pin2: "U1.pin6",
        }}
      />
    </board>
  )
}
