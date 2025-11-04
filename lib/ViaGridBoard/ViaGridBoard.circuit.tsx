import { splitBoardAndChipProps } from "../../util/splitBoardAndChipProps"
import { ChipProps, BoardProps } from "@tscircuit/props"
import { grid } from "@tscircuit/math-utils"
import {
  ViaGridVia,
  ViaGridPlus,
  pacmanPolygonOutline,
} from "./viaGridElements"

type ViaGridBoardProps = ChipProps &
  BoardProps & { children?: any; boardName?: string }

export const ViaGridBoard = ({ children, ...rest }: ViaGridBoardProps) => {
  const { boardProps = {} } = splitBoardAndChipProps({
    ...rest,
  }) as {
    boardProps: any
  }

  return (
    <board {...boardProps} width="100mm" height="65mm">
      <pcbnoterect //User.1 kicad rect shows outer bounds of usable area
        pcbX={0}
        pcbY={0}
        width={90}
        height={55}
        strokeWidth={0.3}
        color="blue"
      />

      {["BL", "TL", "TR", "BR"].map((cornerPositionName, index) => {
        const x = (cornerPositionName.includes("R") ? 90 : 0) + 5 - 50
        const y = (cornerPositionName.includes("T") ? 55 : 0) + 5 - 32.5
        const rotation = index * 90
        return (
          <chip
            key={"pacman_" + cornerPositionName}
            name={cornerPositionName}
            pcbX={x}
            pcbY={y}
            noSchematicRepresentation={true}
            pcbRotation={-rotation} //{(cell.index-1)*90}
            footprint={
              <footprint>
                <smtpad
                  pcbX="0mm"
                  pcbY="0mm"
                  layer="top"
                  shape="polygon"
                  portHints={["pin1"]}
                  points={pacmanPolygonOutline}
                />
              </footprint>
            }
          />
        )
      })}

      <ViaGridPlus pcbX={-20} pcbY={-7.5} startIndex={0} />
      <ViaGridPlus pcbX={20} pcbY={-7.5} startIndex={5} />
      <ViaGridPlus pcbX={-20} pcbY={7.5} startIndex={10} />
      <ViaGridPlus pcbX={20} pcbY={7.5} startIndex={15} />

      {horizontalEdgeViaGridCells.map((cell) => (
        <ViaGridVia
          pcbX={cell.center.x - 50}
          pcbY={cell.center.y - 32.5}
          key={cell.index}
          viaIndex={cell.index + 20}
        />
      ))}

      {verticalEdgeViaGridCells.map((cell) => (
        <ViaGridVia
          pcbX={cell.center.x - 50}
          pcbY={cell.center.y - 32.5}
          key={cell.index}
          viaIndex={cell.index + 54}
        />
      ))}

      <chip
        name="TOP_RECT"
        pcbX={0}
        pcbY={30}
        noSchematicRepresentation={true}
        footprint={
          <footprint>
            <smtpad
              layer="top"
              shape="rect"
              width="40mm"
              height="3mm"
              portHints={["pin1"]}
              cornerRadius={0.5}
            />
          </footprint>
        }
      />

      <silkscreentext text="VIAGRID TOP" fontSize="1.5mm" pcbX={0} pcbY={-30} />
      <net name="GND" />
      {/* <copperpour
        connectsTo="net.GND"
        layer="top"
        // outline=[
        //   { x: 5, y: 5 },
        //   { x: 5, y: 60 },
        //   { x: 95, y: 60 },
        //   { x: 95, y: 5 }
        // ]
      /> */}
      {children}
    </board>
  )
}

const horizontalEdgeViaGridCells = grid({
  rows: 2,
  cols: 17,
  // width: 80,
  // height: 45,
  xSpacing: 5, // if you want to provide the spacing instead of width
  ySpacing: 45, // if you want to provide the spacing instead of height
  offsetX: 50, // optional
  offsetY: 32.5, // optional
  yDirection: "up-is-negative", // optional, default: "cartesian"
  // centered: true  // optional, default: true
})

const verticalEdgeViaGridCells = grid({
  rows: 8,
  cols: 2,
  // width: 80,
  // height: 45,
  xSpacing: 80, // if you want to provide the spacing instead of width
  ySpacing: 5, // if you want to provide the spacing instead of height
  offsetX: 50, // optional
  offsetY: 32.5, // optional
  yDirection: "up-is-negative", // optional, default: "cartesian"
  // centered: true  // optional, default: true
})
