export const schSections = {
  rp2040: (name: string) => `${name}__rp2040`,
  usb: (name: string) => `${name}__usb`,
  power: (name: string) => `${name}__power`,
  flash: (name: string) => `${name}__flash`,
  clock: (name: string) => `${name}__clock`,
  controls: (name: string) => `${name}__controls`,
  display: (name: string) => `${name}__display`,
  status: (name: string) => `${name}__status`,
  debug: (name: string) => `${name}__debug`,
} as const
