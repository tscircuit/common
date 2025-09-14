import React from "react";

export const ArduinoShield = ({ name = "SHIELD1", children }: { name?: string, children: React.JSX.Element }) => (
    <group>
      {/* Digital header (8-pin) */}
      <pinheader
        name="JP1"
        gender="female"
        schFacingDirection="down"
        pinCount={6}
        showSilkscreenPinLabels
        footprint="pinrow6_nosquareplating_id1.016_od1.88_p2.56"
        pcbX="25.35mm"
        pcbY="-24mm"
        pinLabels={{
          pin1: "A0",
          pin2: "A1",
          pin3: "A2",
          pin4: "A3",
          pin5: "A4",
          pin6: "A5",
        }}
      />

      {/* Analog/aux header (6-pin) */}
      <pinheader
        name="JP2"
        pinCount={8}
        gender="female"
        schFacingDirection="down"
        showSilkscreenPinLabels
        footprint="pinrow8_nosquareplating_id1.016_od1.88_p2.56"
        pcbX="4.95mm"
        pcbY="-24mm"
        pinLabels={{
          pin1: "NC",
          pin2: "IOREF",
          pin3: "RES",
          pin4: "V3_3",
          pin5: "V5",
          pin6: "GND0",
          pin7: "GND1",
          pin8: "VIN",
        }}
      />
      <pinheader
        name="JP3"
        gender="female"
        pinCount={6}
        showSilkscreenPinLabels
        footprint="pinrow8_nosquareplating_id1.016_od1.88_p2.56"
        pcbX="22.7mm"
        pcbY="24mm"
        pcbRotation="180deg"
        pinLabels={{
          pin1: "RX",
          pin2: "TX",
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
        name="JP4"
        pinCount={10}
        gender="female"
        showSilkscreenPinLabels
        footprint="pinrow10_nosquareplating_id1.016_od1.88_p2.56"
        pcbX="-1.56mm"
        pcbY="24mm"
        pcbRotation="180deg"
        pinLabels={{
          pin1: "SCL",
          pin2: "SDA",
          pin3: "AREF",
          pin4: "GND2",
          pin5: "D13",
          pin6: "D12",
          pin7: "D11",
          pin8: "D10",
          pin9: "D9",
          pin10: "D8",
        }}
      />

      {/* Any components placed as children will be part of the shield */}
      {children}
    </group>
  )
