import type { LedProps } from "@tscircuit/props"

export const XL_1608SURC_06 = (props: LedProps) => {
  const { name = "LED1", ...restProps } = props

  return (
    <led
      name={name}
      supplierPartNumbers={{
        jlcpcb: ["C965799"],
      }}
      manufacturerPartNumber="XL_1608SURC_06"
      footprint={
        <footprint>
          {/*
            The XINGLIGHT datasheet numbers cathode as pad 1 and anode as
            pad 2, opposite tscircuit's generic LED source-pin numbering.
            Keep the standard schematic symbol semantics and swap only the
            physical pad-to-source-port mapping here.
          */}
          <smtpad
            portHints={["pin2", "cathode", "neg"]}
            pcbX="-0.749mm"
            pcbY="0mm"
            width="0.8mm"
            height="0.8mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin1", "anode", "pos"]}
            pcbX="0.749mm"
            pcbY="0mm"
            width="0.8mm"
            height="0.8mm"
            shape="rect"
          />
          <silkscreenpath
            route={[
              { x: -0.749, y: 0.8 },
              { x: 1.349, y: 0.8 },
              { x: 1.349, y: -0.8 },
              { x: -0.749, y: -0.8 },
            ]}
          />
        </footprint>
      }
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C965799.obj?uuid=d0740cb8891c49a88b6949cb978926f3",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C965799.step?uuid=d0740cb8891c49a88b6949cb978926f3",
        pcbRotationOffset: 0,
        modelOriginPosition: {
          x: -0.000012700000070253736,
          y: 0.00005079999993995443,
          z: -0.01,
        },
      }}
      {...restProps}
    />
  )
}
