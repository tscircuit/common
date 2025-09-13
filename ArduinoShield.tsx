// ArduinoShield.tsx - Expanded reusable Arduino Uno Shield with headers & example components

type ArduinoShieldProps = {
    name?: string
    children?: React.ReactNode
  }
  
  const ArduinoShield = ({ name = "ARDUINO_SHIELD", children }: ArduinoShieldProps) => (
    <board width="68.6mm" height="53.4mm">
      <group name={name}>
        {/* ------------------ Digital Headers ------------------ */}
        {/* Digital 0–7 (8-pin) */}
        <pinheader
          name="J1"
          pinCount={8}
          gender="female"
          schFacingDirection="down"
          showSilkscreenPinLabels
          pcbX="-15mm"
          pcbY="0mm"
          pcbRotation="-90deg"
          pinLabels={{
            pin1: "D0",
            pin2: "D1",
            pin3: "D2",
            pin4: "D3",
            pin5: "D4",
            pin6: "D5",
            pin7: "D6",
            pin8: "D7",
          }}
        />
  
        {/* Digital 8–13 + GND + AREF (10-pin) */}
        <pinheader
          name="J2"
          pinCount={10}
          gender="female"
          schFacingDirection="down"
          showSilkscreenPinLabels
          pcbX="-5mm"
          pcbY="0mm"
          pcbRotation="-90deg"
          pinLabels={{
            pin1: "D8",
            pin2: "D9",
            pin3: "D10",
            pin4: "D11",
            pin5: "D12",
            pin6: "D13",
            pin7: "GND",
            pin8: "AREF",
            pin9: "SDA",
            pin10: "SCL",
          }}
        />
  
        {/* ------------------ Analog Header ------------------ */}
        <pinheader
          name="J3"
          pinCount={6}
          gender="female"
          schFacingDirection="down"
          showSilkscreenPinLabels
          pcbX="15mm"
          pcbY="0mm"
          pcbRotation="-90deg"
          pinLabels={{
            pin1: "A0",
            pin2: "A1",
            pin3: "A2",
            pin4: "A3",
            pin5: "A4",
            pin6: "A5",
          }}
        />
  
        {/* ------------------ Power Header ------------------ */}
        <pinheader
          name="J4"
          pinCount={6}
          gender="female"
          schFacingDirection="down"
          showSilkscreenPinLabels
          pcbX="25mm"
          pcbY="0mm"
          pcbRotation="-90deg"
          pinLabels={{
            pin1: "RESET",
            pin2: "3V3",
            pin3: "5V",
            pin4: "GND",
            pin5: "GND",
            pin6: "VIN",
          }}
        />
  
        {/* ------------------ ICSP Header ------------------ */}
        <pinheader
          name="ICSP"
          pinCount={6}
          gender="female"
          schFacingDirection="down"
          pcbX="0mm"
          pcbY="-15mm"
          pcbRotation="0deg"
          pinLabels={{
            pin1: "MISO",
            pin2: "VCC",
            pin3: "SCK",
            pin4: "MOSI",
            pin5: "RESET",
            pin6: "GND",
          }}
        />
  
        {/* ------------------ Example Components ------------------ */}
        <resistor
          resistance="220"
          footprint="0402"
          name="R1"
          schX={0}
          schY={3}
          pcbX="0mm"
          pcbY="10mm"
        />
        <led
          color="green"
          footprint="0805"
          name="LED1"
          schX={2}
          schY={3}
          pcbX="5mm"
          pcbY="10mm"
        />
  
        {/* Example wiring */}
        <trace from=".R1 > .pin1" to=".LED1 > .pin1" />
        <trace from=".R1 > .pin2" to=".J1 > .pin1" />
        <trace from=".LED1 > .pin2" to=".J1 > .pin2" />
  
        {/* ------------------ Silkscreen ------------------ */}
        <silkscreenline
          x1="-34mm"
          y1="26mm"
          x2="34mm"
          y2="26mm"
          strokeWidth="0.2mm"
        />
        
        {/* Additional decorative silkscreen lines */}
        <silkscreenline
          x1="-34mm"
          y1="-26mm"
          x2="34mm"
          y2="-26mm"
          strokeWidth="0.2mm"
        />
        
        <silkscreenline
          x1="-34mm"
          y1="-26mm"
          x2="-34mm"
          y2="26mm"
          strokeWidth="0.2mm"
        />
        
        <silkscreenline
          x1="34mm"
          y1="-26mm"
          x2="34mm"
          y2="26mm"
          strokeWidth="0.2mm"
        />
  
        {/* Allow extra components via props */}
        {children}
      </group>
    </board>
  )
  
  export default ArduinoShield
  