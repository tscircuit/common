import { gzipSync } from "node:zlib"
import { test, expect } from "bun:test"

test("temporary CI snapshot diagnostics", async () => {
  const child = Bun.spawn(
    [
      process.execPath,
      "node_modules/tscircuit/cli.mjs",
      "snapshot",
      "--update",
    ],
    { stdout: "inherit", stderr: "inherit" },
  )
  expect(await child.exited).toBe(0)
  for (const path of [
    "examples/MicrocontrollerRP2040WithUsbC/__snapshots__/MicrocontrollerRP2040WithUsbC.circuit-pcb.snap.svg",
    "lib/Microcontroller_RP2040/__snapshots__/Microcontroller_RP2040.circuit-pcb.snap.svg",
  ]) {
    const encoded = gzipSync(Buffer.from(await Bun.file(path).text())).toString(
      "base64",
    )
    console.log(`RP2040_SVG_BEGIN ${path}`)
    for (let offset = 0; offset < encoded.length; offset += 1000)
      console.log(`RP2040_SVG_DATA ${encoded.slice(offset, offset + 1000)}`)
    console.log("RP2040_SVG_END")
  }
}, 180_000)
