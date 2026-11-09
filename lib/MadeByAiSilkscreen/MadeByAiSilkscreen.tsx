import type { GroupProps } from "@tscircuit/props"
import { tscircuitLogoImageUrl } from "./tscircuitLogo"

export interface MadeByAiSilkscreenProps
  extends Pick<GroupProps, "name" | "pcbX" | "pcbY" | "pcbRotation"> {
  /** Uniform scale; the default badge is approximately 13 mm wide by 6 mm tall. */
  scale?: number
  layer?: "top" | "bottom"
}

export const MadeByAiSilkscreen = ({
  scale = 1,
  layer = "top",
  ...placement
}: MadeByAiSilkscreenProps = {}) => {
  if (!Number.isFinite(scale) || scale <= 0) {
    throw new Error("MadeByAiSilkscreen scale must be a positive finite number")
  }

  return (
    <group {...placement}>
      <silkscreengraphic
        imageUrl={tscircuitLogoImageUrl}
        width={6 * scale}
        height={6 * scale}
        pcbX={-3.25 * scale}
        layer={layer}
      />
      <silkscreentext
        text="Made by AI"
        pcbX={0.75 * scale}
        pcbY={1 * scale}
        fontSize={1 * scale}
        anchorAlignment="center_left"
        layer={layer}
      />
      <silkscreentext
        text="with tscircuit"
        pcbX={0.75 * scale}
        pcbY={-1 * scale}
        fontSize={1 * scale}
        anchorAlignment="center_left"
        layer={layer}
      />
    </group>
  )
}
