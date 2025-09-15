export const XiaoBoardFootprint = () => (
  <footprint>
    <platedhole pcbX={-8.89} pcbY={7.62} holeDiameter="0.9mm" portHints={["pin1"]} shape="circular_hole_with_rect_pad" rectPadWidth="1.8mm" rectPadHeight="1.8mm" />
    <platedhole pcbX={-8.89} pcbY={5.08} holeDiameter="0.9mm" outerDiameter="1.8mm" portHints={["pin2"]} shape="circle" />
    <platedhole pcbX={-8.89} pcbY={2.54} holeDiameter="0.9mm" outerDiameter="1.8mm" portHints={["pin3"]} shape="circle" />
    <platedhole pcbX={-8.89} pcbY={0} holeDiameter="0.9mm" outerDiameter="1.8mm" portHints={["pin4"]} shape="circle" />
    <platedhole pcbX={-8.89} pcbY={-2.54} holeDiameter="0.9mm" outerDiameter="1.8mm" portHints={["pin5"]} shape="circle" />
    <platedhole pcbX={-8.89} pcbY={-5.08} holeDiameter="0.9mm" outerDiameter="1.8mm" portHints={["pin6"]} shape="circle" />
    <platedhole pcbX={-8.89} pcbY={-7.62} holeDiameter="0.9mm" outerDiameter="1.8mm" portHints={["pin7"]} shape="circle" />

    <platedhole pcbX={8.89} pcbY={-7.62} holeDiameter="0.9mm" outerDiameter="1.8mm" portHints={["pin8"]} shape="circle" />
    <platedhole pcbX={8.89} pcbY={-5.08} holeDiameter="0.9mm" outerDiameter="1.8mm" portHints={["pin9"]} shape="circle" />
    <platedhole pcbX={8.89} pcbY={-2.54} holeDiameter="0.9mm" outerDiameter="1.8mm" portHints={["pin10"]} shape="circle" />
    <platedhole pcbX={8.89} pcbY={0} holeDiameter="0.9mm" outerDiameter="1.8mm" portHints={["pin11"]} shape="circle" />
    <platedhole pcbX={8.89} pcbY={2.54} holeDiameter="0.9mm" outerDiameter="1.8mm" portHints={["pin12"]} shape="circle" />
    <platedhole pcbX={8.89} pcbY={5.08} holeDiameter="0.9mm" outerDiameter="1.8mm" portHints={["pin13"]} shape="circle" />
    <platedhole pcbX={8.89} pcbY={7.62} holeDiameter="0.9mm" outerDiameter="1.8mm" portHints={["pin14"]} shape="circle" />

    <silkscreentext pcbX={-12.5} pcbY={7.62} text="D0" layer="top" anchorAlignment="center_left" />
    <silkscreentext pcbX={-12.5} pcbY={5.08} text="D1" layer="top" anchorAlignment="center_left" />
    <silkscreentext pcbX={-12.5} pcbY={2.54} text="D2" layer="top" anchorAlignment="center_left" />
    <silkscreentext pcbX={-12.5} pcbY={0} text="RST" layer="top" anchorAlignment="center_left" />
    <silkscreentext pcbX={-12.5} pcbY={-2.54} text="SDA" layer="top" anchorAlignment="center_left" />
    <silkscreentext pcbX={-12.5} pcbY={-5.08} text="SCL" layer="top" anchorAlignment="center_left" />
    <silkscreentext pcbX={-12.5} pcbY={-7.62} text="RX" layer="top" anchorAlignment="center_left" />

    <silkscreentext pcbX={12.5} pcbY={-7.62} text="TX" layer="top" anchorAlignment="center_right" />
    <silkscreentext pcbX={12.5} pcbY={-5.08} text="SCK" layer="top" anchorAlignment="center_right" />
    <silkscreentext pcbX={12.5} pcbY={-2.54} text="MISO" layer="top" anchorAlignment="center_right" />
    <silkscreentext pcbX={12.5} pcbY={0} text="MOSI" layer="top" anchorAlignment="center_right" />
    <silkscreentext pcbX={12.5} pcbY={2.54} text="V3_3" layer="top" anchorAlignment="center_right" />
    <silkscreentext pcbX={12.5} pcbY={5.08} text="GND" layer="top" anchorAlignment="center_right" />
    <silkscreentext pcbX={12.5} pcbY={7.62} text="VUSB" layer="top" anchorAlignment="center_right" />

    <silkscreenrect pcbX="0mm" pcbY="0mm" width="19.6mm" height="20.4mm" />
  </footprint>
)