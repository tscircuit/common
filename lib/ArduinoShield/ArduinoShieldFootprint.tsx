export const ArduinoShieldFootprint = () => (
  <footprint>
    <outline>
      <path
        d="M -34.29 -26.67 L 32.26 -26.67 L 34.29 -24.64 L 34.29 17.27 L 31.75 19.81 L 31.75 26.67 L -34.29 26.67 Z"
        strokeWidth="0.1mm"
        stroke="black"
        fill="none"
      />
    </outline>
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <platedhole
        key={`D${i}`}
        name={`D${i}`}
        pcbX={24.13 - i * 2.54}
        pcbY={24.13}
        holeDiameter="1.016mm"
        outerDiameter="1.88mm"
        shape="circle"
      />
    ))}
    {["D8", "D9", "D10", "D11", "D12", "D13", "GND", "AREF", "SDA", "SCL"].map(
      (name, i) => (
        <platedhole
          key={name}
          name={name}
          pcbX={24.13 - 7 * 2.54 - 4.064 - i * 2.54}
          pcbY={24.13}
          holeDiameter="1.016mm"
          outerDiameter="1.88mm"
          shape="circle"
        />
      ),
    )}
    {["NC", "IOREF", "RESET", "3.3V", "5V", "GND1", "GND2", "VIN"].map(
      (name, i) => (
        <platedhole
          key={name}
          name={name}
          pcbX={24.13 - 1.27 - i * 2.54}
          pcbY={-24.13}
          holeDiameter="1.016mm"
          outerDiameter="1.88mm"
          shape="circle"
        />
      ),
    )}
    {["A0", "A1", "A2", "A3", "A4", "A5"].map((name, i) => (
      <platedhole
        key={name}
        name={name}
        pcbX={24.13 - 1.27 - 9 * 2.54 - 4.064 - i * 2.54}
        pcbY={-24.13}
        holeDiameter="1.016mm"
        outerDiameter="1.88mm"
        shape="circle"
      />
    ))}
  </footprint>
)