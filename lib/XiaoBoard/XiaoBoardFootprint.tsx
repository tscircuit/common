import React, { ReactElement } from "react"
import { SmtPadProps, PlatedHoleProps, HoleProps } from "@tscircuit/props"

const createSmtPad = (props: SmtPadProps): ReactElement =>
  React.createElement("smtpad", props as any)

const createPlatedHole = (props: PlatedHoleProps): ReactElement =>
  React.createElement("platedhole", props as any)

const createHole = (props: HoleProps): ReactElement =>
  React.createElement("hole", props as any)

interface XiaoBoardFootprintProps {
  top?: number
  bottom?: number
  left?: number
  right?: number
  pitch?: number
  padLength?: number
  padWidth?: number
  edgeClearance?: number
  componentWidth?: number // distance from left pad center to right pad center
  bottomPadWidth?: number // width of bottom pads (defaults to padWidth if not specified)
  bottomPadHeight?: number // height of bottom pads (defaults to padLength if not specified)
  bottomPitch?: number // pitch between bottom pads (defaults to pitch if not specified)
  variant?: "RP2040" | "Receiver" // Add variant prop with RP2040 as a possible value
  withPlatedHoles?: boolean
}

export const XiaoBoardFootprint: React.FC<XiaoBoardFootprintProps> = ({
  top = 0,
  bottom = 0,
  left = 7,
  right = 7,
  pitch = 2.54,
  padLength = 2,
  padWidth = 3,
  edgeClearance = 1.2,
  componentWidth = 17,
  bottomPadWidth = 1.016,
  bottomPadHeight = 2.032,
  bottomPitch = 2.54,
  variant,
  withPlatedHoles = false,
}) => {
  // Adjust configuration based on variant
  const isRP2040 = variant === "RP2040"

  // Apply variant-specific overrides
  if (isRP2040) {
    top = 4
    bottom = 2
    left = 7
    right = 7
    pitch = 2.54
    padLength = 2
    padWidth = 3
    edgeClearance = 1.2
    componentWidth = 17
    bottomPadWidth = 1.016
    bottomPadHeight = 2.032
    bottomPitch = 2.54
  }
  // calculate left/right row X positions based on componentWidth
  const leftRowX = -componentWidth / 2 + 0.25
  const rightRowX = componentWidth / 2 - 0.25

  const generatePads = () => {
    const pads: ReactElement[] = []
    let pinNumber = 1

    if (top > 0) {
      pads.push(
        createSmtPad({
          portHints: [`pin${pinNumber++}`],
          radius: 0.5715,
          pcbX: -1.396,
          pcbY: 8.442,
          layer: "bottom",
          shape: "circle",
        }),
        createSmtPad({
          portHints: [`pin${pinNumber++}`],
          radius: 0.5715,
          pcbX: 1.144,
          pcbY: 8.442,
          layer: "bottom",
          shape: "circle",
        }),
      )

      pads.push(
        createSmtPad({
          portHints: [`pin${pinNumber++}`],
          radius: 0.5715,
          pcbX: -1.396,
          pcbY: 5.902,
          layer: "bottom",
          shape: "circle",
        }),
        createSmtPad({
          portHints: [`pin${pinNumber++}`],
          radius: 0.5715,
          pcbX: 1.144,
          pcbY: 5.902,
          layer: "bottom",
          shape: "circle",
        }),
      )
    }

    if (bottom > 0) {
      const actualBottomPitch = bottomPitch ?? pitch
      const xOffset = ((bottom - 1) / 2) * actualBottomPitch
      const bottomPadW = bottomPadWidth ?? padWidth
      const bottomPadH = bottomPadHeight ?? padLength

      for (let i = 0; i < bottom; i++) {
        pads.push(
          createSmtPad({
            portHints: [`pin${pinNumber++}`],
            width: bottomPadW,
            height: bottomPadH,
            pcbX: xOffset - i * actualBottomPitch,
            pcbY: -9.7 + edgeClearance,
            layer: "bottom",
            shape: "rect",
          }),
        )
      }
    }

    if (left > 0) {
      const yOffset = ((left - 1) / 2) * pitch
      for (let i = 0; i < left; i++) {
        const halfPad = padWidth / 2
        if (variant !== "Receiver") {
          pads.push(
            createHole({
              diameter: 0.7,
              pcbX: leftRowX - halfPad + 0.86,
              pcbY: yOffset - i * pitch,
            }),
          )
        }
        if (withPlatedHoles) {
          pads.push(
            createPlatedHole({
              portHints: [`pin${pinNumber}`],
              holeDiameter: 0.85,
              rectPadWidth: padWidth,
              rectPadHeight: padLength,
              pcbX: leftRowX,
              pcbY: yOffset - i * pitch,
              shape: "circular_hole_with_rect_pad",
              holeOffsetX: 0.63,
            }),
          )
          pinNumber++
        } else {
          pads.push(
            createSmtPad({
              portHints: [`pin${pinNumber}`],
              width: padWidth,
              height: padLength,
              pcbX: leftRowX,
              pcbY: yOffset - i * pitch,
              layer: "top",
              shape: "rect",
            }),
          )
          pinNumber++
        }
      }
    }

    if (right > 0) {
      const yOffset = ((right - 1) / 2) * pitch
      for (let i = 0; i < right; i++) {
        const halfPad = padWidth / 2
        if (variant !== "Receiver") {
          pads.push(
            createHole({
              diameter: 0.7,
              pcbX: rightRowX + halfPad - 0.86,
              pcbY: yOffset - i * pitch,
            }),
          )
        }
        if (withPlatedHoles) {
          pads.push(
            createPlatedHole({
              portHints: [`pin${pinNumber}`],
              holeDiameter: 0.85,
              rectPadWidth: padWidth,
              rectPadHeight: padLength,
              pcbX: rightRowX,
              pcbY: yOffset - i * pitch,
              shape: "circular_hole_with_rect_pad",
              holeOffsetX: -0.63,
            }),
          )
          pinNumber++
        } else {
          pads.push(
            createSmtPad({
              portHints: [`pin${pinNumber}`],
              width: padWidth,
              height: padLength,
              pcbX: rightRowX,
              pcbY: yOffset - i * pitch,
              layer: "top",
              shape: "rect",
            }),
          )
          pinNumber++
        }
      }
    }

    return pads
  }

  return <footprint>{generatePads()}</footprint>
}
