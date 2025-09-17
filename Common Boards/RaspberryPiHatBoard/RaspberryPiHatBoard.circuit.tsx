import type { ChipProps } from "@tscircuit/props"
import { OutlineBuilder } from "../../util/outlineBuilder"
import { RaspberryPiHatBoardFootprint } from "./RaspberryPiHatBoardFootprint"

export const MicroModBoard = (props: ChipProps & { children?: any }) => {
  const outline = new OutlineBuilder(0, 28)
    .lineTo(32.5, 28)
    .corner({ radius: 1, turn: "ccw" })
    .lineTo(32.5, -28)
    .corner({ radius: 1, turn: "ccw" })
    .lineTo(13.5, -28)
    .corner({ radius: 1, turn: "ccw" })
    .lineTo(13.5, -9)
    .arcTo(11.5, -9, { radius: 1, sweep: true })
    .lineTo(11.5, -28)
    .corner({ radius: 1, turn: "ccw" })
    .lineTo(-32.5, -28)
    .corner({ radius: 1, turn: "ccw" })
    .lineTo(-32.5, -8.5)
    .corner({ radius: 1, turn: "ccw" })
    .lineTo(-27.5, -8.5)
    .corner({ radius: 1, turn: "cw" })
    .lineTo(-27.5, 8.5)
    .corner({ radius: 1, turn: "cw" })
    .lineTo(-32.5, 8.5)
    .corner({ radius: 1, turn: "ccw" })
    .lineTo(-32.5, 28)
    .corner({ radius: 1, turn: "ccw" })
    .toArray()

  const pinLabels = {
    pin1: ["V3_3_1"],
    pin2: ["V5_1"],
    pin3: ["V5_2"],
    pin4: ["GND_1"],
    pin5: ["TX"],
    pin6: ["RX"],
    pin8: ["GND_2"],
    pin11: ["GND_3"],
    pin13: ["CE0"],
    pin14: ["CE1"],
    pin15: ["ID_SC"],
    pin16: ["GND_4"],
    pin18: ["GND_5"],
    pin22: ["GND_6"],
    pin28: ["ID_SD"],
    pin29: ["GND_7"],
    pin30: ["SCK"],
    pin31: ["MISO"],
    pin32: ["MOSI"],
    pin33: ["V3_3_2"],
    pin37: ["GND_8"],
    pin39: ["SCL"],
    pin40: ["SDA"],
  }

  return (
    <board outline={outline}>
      <group>
        <chip
          name="JP1"
          pinLabels={pinLabels}
          layer="bottom"
          footprint="pinrow40_rows2_bottomsidepinlabel_p2.54_id1.016_od1.524"
          pcbY={23.23}
          pcbRotation={180}
        />
        <hole diameter={2.8} pcbX={-29} pcbY={24.5} />
        <hole diameter={2.8} pcbX={29} pcbY={-24.5} />
        <hole diameter={2.8} pcbX={-29} pcbY={-24.5} />
        <hole diameter={2.8} pcbX={29} pcbY={24.5} />
        {props.children}
      </group>
    </board>
  )
}
