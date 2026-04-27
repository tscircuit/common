import React from "react"

/**
 * Arduino Nano V3.0 Component for tscircuit
 * 
 * Dimensions: 18mm x 45mm
 * Pins: 30-pin DIP (0.1" pitch, 0.6" row spacing)
 * Mounting Holes: 4 holes at (+/-8, +/-20)
 */
export const ArduinoNano = () => (
  <board width="18mm" height="45mm">
    {/* Mounting Holes */}
    <hole pcbX={-8} pcbY={-20} holeDiameter={1.78} />
    <hole pcbX={8} pcbY={-20} holeDiameter={1.78} />
    <hole pcbX={-8} pcbY={20} holeDiameter={1.78} />
    <hole pcbX={8} pcbY={20} holeDiameter={1.78} />

    {/* ATmega328P Microcontroller */}
    <chip
      name="U1"
      manufacturerPartNumber="ATmega328P"
      footprint="qfp32"
      pcbX={0}
      pcbY={-8}
      rotation={90}
    />

    {/* USB-C Connector */}
    <chip
      name="USBC"
      manufacturerPartNumber="TYPE-C-31-M-12"
      footprint="usbc"
      pcbX={0}
      pcbY={-16.787}
    />

    {/* Reset Button */}
    <button
      name="SW1"
      pcbX={0}
      pcbY={2}
      footprint="push_button"
    />

    {/* Status LEDs */}
    <led name="L1" pcbX={-5} pcbY={13} rotation={90} color="red" label="PWR" />
    <led name="L2" pcbX={0} pcbY={13} rotation={90} color="green" label="L" />
    <led name="L3" pcbX={5} pcbY={13} rotation={90} color="yellow" label="TX" />

    {/* Current Limiting Resistors for LEDs */}
    <resistor name="R1" resistance="1k" pcbX={5} pcbY={8} rotation={90} footprint="0603" />
    <resistor name="R2" resistance="1k" pcbX={0} pcbY={8} rotation={90} footprint="0603" />
    <resistor name="R3" resistance="1k" pcbX={-5} pcbY={8} rotation={90} footprint="0603" />

    {/* Main Pin Headers (15 pins each side) */}
    {/* Row spacing set to 0.6 inches (15.24mm) -> +/- 7.62mm */}
    <header
      name="JP1"
      pcbX={-7.62}
      pcbY={0}
      pins={15}
      footprint="pinrow15_p2.54mm"
      pinLabels={[
        "D13", "3V3", "REF", "A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "5V", "RST", "GND", "VIN"
      ]}
    />
    <header
      name="JP2"
      pcbX={7.62}
      pcbY={0}
      pins={15}
      footprint="pinrow15_p2.54mm"
      pinLabels={[
        "D12", "D11", "D10", "D9", "D8", "D7", "D6", "D5", "D4", "D3", "D2", "GND", "RST", "RX0", "TX1"
      ]}
    />

    {/* ICSP Programming Headers */}
    <header name="JP3" pcbX={0} pcbY={20.5} pins={3} footprint="pinrow3" />
    <header name="JP4" pcbX={0} pcbY={18.5} pins={3} footprint="pinrow3" />

  </board>
)
