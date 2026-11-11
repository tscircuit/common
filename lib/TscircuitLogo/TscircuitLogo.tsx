import type { GroupProps } from "@tscircuit/props"
import { tscircuitLogoImageUrl } from "./logoSvg"

export interface TscircuitLogoProps
  extends Pick<GroupProps, "name" | "pcbX" | "pcbY" | "pcbRotation"> {
  /** Uniform scale; the default logo is 6 mm square. */
  scale?: number
  layer?: "top" | "bottom"
}

export const TscircuitLogo = ({
  scale = 1,
  layer = "top",
  ...placement
}: TscircuitLogoProps = {}) => {
  if (!Number.isFinite(scale) || scale <= 0) {
    throw new Error("TscircuitLogo scale must be a positive finite number")
  }

  return (
    <group {...placement}>
      <silkscreengraphic
        imageUrl={tscircuitLogoImageUrl}
        width={6 * scale}
        height={6 * scale}
        layer={layer}
      />
    </group>
  )
}
