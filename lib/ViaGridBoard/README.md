# ViaGridBoard

ViaGrid-compatible prototyping board for tscircuit.

## Features

- Standard sizes: Small (8x12), Medium (12x18), Large (16x24)
- Custom dimensions support
- 0.6mm drill holes, 1.2mm pads, 2.54mm pitch
- Pin labeling: A1, A2, B1, B2, etc.
- 3mm board margins

## Usage

```tsx
import { ViaGridBoard } from "@tscircuit/common"

// Standard medium size (12x18)
<ViaGridBoard name="VG1" size="medium" />

// Small size (8x12)
<ViaGridBoard name="VG2" size="small" />

// Large size (16x24)
<ViaGridBoard name="VG3" size="large" />

// Custom dimensions
<ViaGridBoard name="VG4" size="custom" rows={6} cols={8} />
```

## Specs

- Pitch: 2.54mm
- Via drill: 0.6mm
- Via pad: 1.2mm
- Margins: 3mm

## Sizes

| Size   | Grid | 
|--------|---------|
| Small  | 8x12    |
| Medium | 12x18   |
| Large  | 16x24   |