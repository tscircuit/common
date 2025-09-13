import React from "react";

// 2.54mm pin spacing
const PITCH = 2.54;
// Header Y offset between digital and analog (center-to-center)
const DIGITAL_ANALOG_Y_DIST = 15.24;

/**
 * Props for ArduinoShield
 * @param name - Name of the shield/group
 * @param children - Any child components to render inside the shield group
 * @param showResetButton - Show reset button (bonus)
 * @param showLed - Show LED (bonus)
 */
export const ArduinoShield = ({
  name = "ArduinoShield",
  children,
  showResetButton = true,
  showLed = true,
}: {
  name?: string;
  children?: React.ReactNode;
  showResetButton?: boolean;
  showLed?: boolean;
}) => {
  // Pin label arrays
  const digitalPins = ["D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7"];
  const analogPins = ["A0", "A1", "A2", "A3", "A4", "A5"];
  const powerPins = ["RESET", "3.3V", "5V", "GND", "GND", "VIN"];
  const icspPins = ["MISO", "VCC", "SCK", "MOSI", "RESET", "GND"];


  const digitalHeader = {
    pcbX: 0,
    pcbY: 0,
    pcbRotation: 0,
  };
  const analogHeader = {
    pcbX: 15.24,
    pcbY: 0,
    pcbRotation: 0,
  };
  // Power header: top, horizontal
  const powerHeader = {
    pcbX: 2.54 * 2, // Centered above digital
    pcbY: -2.54 * 2,
    pcbRotation: 90,
  };
  // ICSP header: bottom, horizontal (6-pin, 2x3)
  const icspHeader = {
    pcbX: 7.62, // Centered between digital/analog
    pcbY: 13.5, // Below headers
    pcbRotation: 0,
  };

  // Bonus: Reset button and LED positions
  const resetButton = {
    pcbX: 1,
    pcbY: -5,
  };
  const led = {
    pcbX: 13,
    pcbY: -5,
  };

  // Placeholder module group positions
  const modulePlaceholders = [
    { name: "OLED", pcbX: 2, pcbY: 8 },
    { name: "RTC", pcbX: 8, pcbY: 8 },
    { name: "RF", pcbX: 13, pcbY: 8 },
  ];

  return (
    <group name={name}>
      {/* Digital header (female) */}
      <pinheader
        name="Digital"
        pinCount={8}
        pitch={PITCH}
        gender="female"
        pcbX={digitalHeader.pcbX}
        pcbY={digitalHeader.pcbY}
        pcbRotation={digitalHeader.pcbRotation}
        showSilkscreenPinLabels={true}
        pcbPinLabels={digitalPins.reduce((acc, pin, i) => ({ ...acc, [i + 1]: pin }), {} as Record<string, string>)}
      />
      {/* Analog header (female) */}
      <pinheader
        name="Analog"
        pinCount={6}
        pitch={PITCH}
        gender="female"
        pcbX={analogHeader.pcbX}
        pcbY={analogHeader.pcbY}
        pcbRotation={analogHeader.pcbRotation}
        showSilkscreenPinLabels={true}
        pcbPinLabels={analogPins.reduce((acc, pin, i) => ({ ...acc, [i + 1]: pin }), {} as Record<string, string>)}
      />
      {/* Power header (female) */}
      <pinheader
        name="Power"
        pinCount={6}
        pitch={PITCH}
        gender="female"
        pcbX={powerHeader.pcbX}
        pcbY={powerHeader.pcbY}
        pcbRotation={powerHeader.pcbRotation}
        showSilkscreenPinLabels={true}
        pcbPinLabels={powerPins.reduce((acc, pin, i) => ({ ...acc, [i + 1]: pin }), {} as Record<string, string>)}
      />
      {/* ICSP header (male, 2x3) */}
      <pinheader
        name="ICSP"
        pinCount={6}
        pitch={PITCH}
        gender="male"
        doubleRow={true}
        pcbX={icspHeader.pcbX}
        pcbY={icspHeader.pcbY}
        pcbRotation={icspHeader.pcbRotation}
        showSilkscreenPinLabels={true}
        pcbPinLabels={icspPins.reduce((acc, pin, i) => ({ ...acc, [i + 1]: pin }), {} as Record<string, string>)}
      />
      {/* Optional reset button */}
      {showResetButton && (
        <switch name="RESET_BTN" pcbX={resetButton.pcbX} pcbY={resetButton.pcbY} type="spst" />
      )}
      {/* Optional LED */}
      {showLed && (
        <led name="SHIELD_LED" pcbX={led.pcbX} pcbY={led.pcbY} footprint="0805" />
      )}
      {/* Placeholder module groups */}
      {modulePlaceholders.map((mod) => (
        <group name={mod.name} key={mod.name} pcbX={mod.pcbX} pcbY={mod.pcbY}>
          {/* Placeholder for {mod.name} module */}
        </group>
      ))}
      {/* Render children */}
      {children}
    </group>
  );
};
