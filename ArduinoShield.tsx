import React from 'react'

interface ArduinoShieldProps {
  name?: string
  children?: React.ReactNode
}

export const ArduinoShield: React.FC<ArduinoShieldProps> = ({ 
  name = "SHIELD1", 
  children 
}) => (
  <group name={name}>
    {/* Digital header (8-pin) */}
    <pinheader
      name="J1"
      pinCount={8}
      gender="female"
      schFacingDirection="down"
      showSilkscreenPinLabels
      pcbX="-10mm"
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

    {/* Analog/aux header (6-pin) */}
    <pinheader
      name="J2"
      pinCount={6}
      gender="female"
      schFacingDirection="down"
      showSilkscreenPinLabels
      pcbX="10mm"
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

    {/* Power header (8-pin) */}
    <pinheader
      name="J3"
      pinCount={8}
      gender="female"
      schFacingDirection="up"
      showSilkscreenPinLabels
      pcbX="-10mm"
      pcbY="12.7mm"
      pcbRotation="-90deg"
      pinLabels={{
        pin1: "NC",
        pin2: "IOREF",
        pin3: "RESET",
        pin4: "3V3",
        pin5: "5V",
        pin6: "GND",
        pin7: "GND",
        pin8: "VIN",
      }}
    />

    {/* PWM/Communication header (10-pin) */}
    <pinheader
      name="J4"
      pinCount={10}
      gender="female"
      schFacingDirection="up"
      showSilkscreenPinLabels
      pcbX="10mm"
      pcbY="15.24mm"
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

    {/* Any components placed as children will be part of the shield */}
    {children}
  </group>
)

export default ArduinoShield