import type { ChipProps } from "@tscircuit/props"

type PinLabels = {
  [key: `pin${number}`]: [string]
}

const pinLabelsRightSide: PinLabels = {
  pin1: ["GND_1"],
  pin2: ["GND_2"],
  pin3: ["Ethernet_Pair3_P"],
  pin4: ["Ethernet_Pair1_P"],
  pin5: ["Ethernet_Pair3_N"],
  pin6: ["Ethernet_Pair1_N"],
  pin7: ["GND_3"],
  pin8: ["GND_4"],
  pin9: ["Ethernet_Pair2_N"],
  pin10: ["Ethernet_Pair0_N"],
  pin11: ["Ethernet_Pair2_P"],
  pin12: ["Ethernet_Pair0_P"],
  pin13: ["GND_5"],
  pin14: ["GND_6"],
  pin15: ["Ethernet_nLED3"],
  pin16: ["Fan_Tacho"],
  pin17: ["Ethernet_nLED2"],
  pin18: ["Ethernet_SYNC_OUT"],
  pin19: ["Fan_PWM"],
  pin20: ["EEPROM_nWP"],
  pin21: ["LED_nACT"],
  pin22: ["GND_7"],
  pin23: ["GND_8"],
  pin24: ["GPIO26"],
  pin25: ["GPIO21"],
  pin26: ["GPIO19"],
  pin27: ["GPIO20"],
  pin28: ["GPIO13"],
  pin29: ["GPIO16"],
  pin30: ["GPIO6"],
  pin31: ["GPIO12"],
  pin32: ["GND_9"],
  pin33: ["GND_10"],
  pin34: ["GPIO5"],
  pin35: ["ID_SC"],
  pin36: ["ID_SD"],
  pin37: ["GPIO7"],
  pin38: ["GPIO11"],
  pin39: ["GPIO8"],
  pin40: ["GPIO9"],
  pin41: ["GPIO25"],
  pin42: ["GND_11"],
  pin43: ["GND_12"],
  pin44: ["GPIO10"],
  pin45: ["GPIO24"],
  pin46: ["GPIO22"],
  pin47: ["GPIO23"],
  pin48: ["GPIO27"],
  pin49: ["GPIO18"],
  pin50: ["GPIO17"],
  pin51: ["GPIO15"],
  pin52: ["GND_13"],
  pin53: ["GND_14"],
  pin54: ["GPIO4"],
  pin55: ["GPIO14"],
  pin56: ["GPIO3"],
  pin57: ["SD_CLK"],
  pin58: ["GPIO2"],
  pin59: ["GND_15"],
  pin60: ["GND_16"],
  pin61: ["SD_DAT3"],
  pin62: ["SD_CMD"],
  pin63: ["SD_DAT0"],
  pin64: ["SD_DAT5"],
  pin65: ["GND_17"],
  pin66: ["GND_18"],
  pin67: ["SD_DAT1"],
  pin68: ["SD_DAT4"],
  pin69: ["SD_DAT2"],
  pin70: ["SD_DAT7"],
  pin71: ["GND_19"],
  pin72: ["SD_DAT6"],
  pin73: ["SD_VDD_OVERRIDE"],
  pin74: ["GND_20"],
  pin75: ["SD_PWR_ON"],
  pin76: ["VBAT"],
  pin77: ["V5_IN_1"],
  pin78: ["GPIO_VREF"],
  pin79: ["V5_IN_2"],
  pin80: ["SCL0"],
  pin81: ["V5_IN_3"],
  pin82: ["SDA0"],
  pin83: ["V5_IN_4"],
  pin84: ["CM5_V3_3_OUT_1"],
  pin85: ["V5_IN_5"],
  pin86: ["CM5_V3_3_OUT_2"],
  pin87: ["V5_IN_6"],
  pin88: ["CM5_V1_8_OUT_1"],
  pin89: ["WL_nDisable"],
  pin90: ["CM5_V1_8_OUT_2"],
  pin91: ["BT_nDisable"],
  pin92: ["PWR_Button"],
  pin93: ["nRPIBOOT"],
  pin94: ["CC1"],
  pin95: ["LED_nPWR"],
  pin96: ["CC2"],
  pin97: ["CAM_GPIO0"],
  pin98: ["GND_21"],
  pin99: ["PMIC_Enable"],
  pin100: ["CAM_GPIO1"],
} as const

const pinLabelsLeftSide: PinLabels = {
  pin1: ["USB_OTG_ID"],
  pin2: ["PCIe_CLK_nREQ"],
  pin3: ["USB_N"],
  pin4: ["PCIE_nWAKE"],
  pin5: ["USB_P"],
  pin6: ["PCIE_PWR_EN"],
  pin7: ["GND_22"],
  pin8: ["GND_23"],
  pin9: ["PCIe_nRST"],
  pin10: ["PCIe_CLK_P"],
  pin11: ["VBUS_EN"],
  pin12: ["PCIe_CLK_N"],
  pin13: ["GND_24"],
  pin14: ["GND_25"],
  pin15: ["MIPI0_D0_N"],
  pin16: ["PCIe_RX_P"],
  pin17: ["MIPI0_D0_P"],
  pin18: ["PCIe_RX_N"],
  pin19: ["GND_26"],
  pin20: ["GND_27"],
  pin21: ["MIPI0_D1_N"],
  pin22: ["PCIe_TX_P"],
  pin23: ["MIPI0_D1_P"],
  pin24: ["PCIe_TX_N"],
  pin25: ["GND_28"],
  pin26: ["GND_29"],
  pin27: ["MIPI0_C_N"],
  pin28: ["USB3_0_RX_N"],
  pin29: ["MIPI0_C_P"],
  pin30: ["USB3_0_RX_P"],
  pin31: ["GND_30"],
  pin32: ["GND_31"],
  pin33: ["MIPI0_D2_N"],
  pin34: ["USB3_0_DP"],
  pin35: ["MIPI0_D2_P"],
  pin36: ["USB3_0_DM"],
  pin37: ["GND_32"],
  pin38: ["GND_33"],
  pin39: ["MIPI0_D3_N"],
  pin40: ["USB3_0_TX_N"],
  pin41: ["MIPI0_D3_P"],
  pin42: ["USB3_0_TX_P"],
  pin43: ["HDMI1_HOTPLUG"],
  pin44: ["GND_34"],
  pin45: ["HDMI1_SDA"],
  pin46: ["HDMI1_TX2_P"],
  pin47: ["HDMI1_SCL"],
  pin48: ["HDMI1_TX2_N"],
  pin49: ["HDMI1_CEC"],
  pin50: ["GND_35"],
  pin51: ["HDMI0_CEC"],
  pin52: ["HDMI1_TX1_P"],
  pin53: ["HDMI0_HOTPLUG"],
  pin54: ["HDMI1_TX1_N"],
  pin55: ["GND_36"],
  pin56: ["GND_37"],
  pin57: ["USB3_1_RX_N"],
  pin58: ["HDMI1_TX0_P"],
  pin59: ["USB3_1_RX_P"],
  pin60: ["HDMI1_TX0_N"],
  pin61: ["GND_38"],
  pin62: ["GND_39"],
  pin63: ["USB3_1_DP"],
  pin64: ["HDMI1_CLK_P"],
  pin65: ["USB3_1_DM"],
  pin66: ["HDMI1_CLK_N"],
  pin67: ["GND_40"],
  pin68: ["GND_41"],
  pin69: ["USB3_1_TX_N"],
  pin70: ["HDMI0_TX2_P"],
  pin71: ["USB3_1_TX_P"],
  pin72: ["HDMI0_TX2_N"],
  pin73: ["GND_42"],
  pin74: ["GND_43"],
  pin75: ["MIPI1_D0_N"],
  pin76: ["HDMI0_TX1_P"],
  pin77: ["MIPI1_D0_P"],
  pin78: ["HDMI0_TX1_N"],
  pin79: ["GND_44"],
  pin80: ["GND_45"],
  pin81: ["MIPI1_D1_N"],
  pin82: ["HDMI0_TX0_P"],
  pin83: ["MIPI1_D1_P"],
  pin84: ["HDMI0_TX0_N"],
  pin85: ["GND_46"],
  pin86: ["GND_47"],
  pin87: ["MIPI1_C_N"],
  pin88: ["HDMI0_CLK_P"],
  pin89: ["MIPI1_C_P"],
  pin90: ["HDMI0_CLK_N"],
  pin91: ["GND_48"],
  pin92: ["GND_49"],
  pin93: ["MIPI1_D2_N"],
  pin94: ["MIPI1_D3_N"],
  pin95: ["MIPI1_D2_P"],
  pin96: ["MIPI1_D3_P"],
  pin97: ["GND_50"],
  pin98: ["GND_51"],
  pin99: ["HDMI0_SDA"],
  pin100: ["HDMI0_SCL"],
} as const

export const CM5Connector = (
  props: ChipProps<PinLabels> & { side: "left" | "right" },
) => {
  const pinLabels =
    props.side === "left" ? pinLabelsLeftSide : pinLabelsRightSide

  return (
    <chip
      schWidth={3}
      pinLabels={pinLabels}
      pcbRotation={90}
      schPinArrangement={{
        [props.side === "right" ? "rightSide" : "leftSide"]: {
          direction: "top-to-bottom",
          pins: [...Object.keys(pinLabels)],
        },
      }}
      supplierPartNumbers={{
        jlcpcb: ["C6782225"],
      }}
      manufacturerPartNumber="A_10164227_1001A1RLF"
      footprint={
        <footprint>
          <smtpad
            portHints={["pin100"]}
            pcbX="9.799954999999954mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin99"]}
            pcbX="9.799954999999954mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin98"]}
            pcbX="9.39990499999999mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin97"]}
            pcbX="9.39990499999999mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin96"]}
            pcbX="9.000109000000066mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin95"]}
            pcbX="9.000109000000066mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin94"]}
            pcbX="8.600058999999874mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin93"]}
            pcbX="8.600058999999874mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin92"]}
            pcbX="8.200008999999909mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin91"]}
            pcbX="8.200008999999909mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin90"]}
            pcbX="7.799958999999944mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin89"]}
            pcbX="7.799958999999944mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin88"]}
            pcbX="7.399908999999752mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin87"]}
            pcbX="7.399908999999752mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin86"]}
            pcbX="7.000112999999828mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin85"]}
            pcbX="7.000112999999828mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin84"]}
            pcbX="6.600062999999864mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin83"]}
            pcbX="6.600062999999864mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin82"]}
            pcbX="6.200012999999899mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin81"]}
            pcbX="6.200012999999899mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin80"]}
            pcbX="5.799962999999934mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin79"]}
            pcbX="5.799962999999934mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin78"]}
            pcbX="5.3999129999999695mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin77"]}
            pcbX="5.3999129999999695mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin76"]}
            pcbX="5.000117000000046mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin75"]}
            pcbX="5.000117000000046mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin74"]}
            pcbX="4.600066999999854mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin73"]}
            pcbX="4.600066999999854mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin72"]}
            pcbX="4.200016999999889mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin71"]}
            pcbX="4.200016999999889mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin70"]}
            pcbX="3.799966999999924mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin69"]}
            pcbX="3.799966999999924mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin68"]}
            pcbX="3.3999169999999594mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin67"]}
            pcbX="3.3999169999999594mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin66"]}
            pcbX="3.000120999999808mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin65"]}
            pcbX="3.000120999999808mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin64"]}
            pcbX="2.600071000000071mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin63"]}
            pcbX="2.600071000000071mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin62"]}
            pcbX="2.2000209999998788mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin61"]}
            pcbX="2.2000209999998788mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin60"]}
            pcbX="1.799970999999914mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin59"]}
            pcbX="1.799970999999914mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin58"]}
            pcbX="1.3999209999999493mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin57"]}
            pcbX="1.3999209999999493mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin56"]}
            pcbX="1.000124999999798mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin55"]}
            pcbX="1.000124999999798mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin54"]}
            pcbX="0.6000750000000608mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin53"]}
            pcbX="0.6000750000000608mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin52"]}
            pcbX="0.20002499999986867mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin51"]}
            pcbX="0.20002499999986867mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin50"]}
            pcbX="-0.20002500000009604mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin49"]}
            pcbX="-0.20002500000009604mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin48"]}
            pcbX="-0.6000750000000608mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin47"]}
            pcbX="-0.6000750000000608mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin46"]}
            pcbX="-0.9998709999999846mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin45"]}
            pcbX="-0.9998709999999846mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin44"]}
            pcbX="-1.3999210000001767mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin43"]}
            pcbX="-1.3999210000001767mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin42"]}
            pcbX="-1.7999710000001414mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin41"]}
            pcbX="-1.7999710000001414mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin40"]}
            pcbX="-2.200021000000106mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin39"]}
            pcbX="-2.200021000000106mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin38"]}
            pcbX="-2.600071000000071mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin37"]}
            pcbX="-2.600071000000071mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin36"]}
            pcbX="-2.9998669999999947mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin35"]}
            pcbX="-2.9998669999999947mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin34"]}
            pcbX="-3.3999169999999594mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin33"]}
            pcbX="-3.3999169999999594mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin32"]}
            pcbX="-3.7999670000001515mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin31"]}
            pcbX="-3.7999670000001515mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin30"]}
            pcbX="-4.200017000000116mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin29"]}
            pcbX="-4.200017000000116mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin28"]}
            pcbX="-4.600067000000081mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin27"]}
            pcbX="-4.600067000000081mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin26"]}
            pcbX="-4.999863000000005mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin25"]}
            pcbX="-4.999863000000005mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin24"]}
            pcbX="-5.399913000000197mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin23"]}
            pcbX="-5.399913000000197mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin22"]}
            pcbX="-5.799962999999934mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin21"]}
            pcbX="-5.799962999999934mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin20"]}
            pcbX="-6.200013000000126mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin19"]}
            pcbX="-6.200013000000126mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin18"]}
            pcbX="-6.600063000000205mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin17"]}
            pcbX="-6.600063000000205mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin16"]}
            pcbX="-6.999859000000129mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin15"]}
            pcbX="-6.999859000000129mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin14"]}
            pcbX="-7.399909000000093mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin13"]}
            pcbX="-7.399909000000093mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin12"]}
            pcbX="-7.799959000000172mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin11"]}
            pcbX="-7.799959000000172mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin10"]}
            pcbX="-8.200009000000136mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin9"]}
            pcbX="-8.200009000000136mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin8"]}
            pcbX="-8.600058999999987mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin7"]}
            pcbX="-8.600058999999987mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin6"]}
            pcbX="-8.999855000000025mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin5"]}
            pcbX="-8.999855000000025mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin4"]}
            pcbX="-9.399905000000103mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin3"]}
            pcbX="-9.399905000000103mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin2"]}
            pcbX="-9.799955000000068mm"
            pcbY="1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <smtpad
            portHints={["pin1"]}
            pcbX="-9.799955000000068mm"
            pcbY="-1.5400020000000723mm"
            width="0.19999959999999997mm"
            height="0.6999986mm"
            shape="rect"
          />
          <silkscreenpath
            route={[
              { x: 10.131145599999854, y: -1.4999970000000076 },
              { x: 11.299977399999989, y: -1.4999970000000076 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -11.299977400000103, y: -1.4999970000000076 },
              { x: -10.131094800000028, y: -1.4999970000000076 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -11.299977400000103, y: 1.4999969999998939 },
              { x: -11.299977400000103, y: -1.4999970000000076 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: -10.131094800000028, y: 1.4999969999998939 },
              { x: -11.299977400000103, y: 1.4999969999998939 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 11.299977399999989, y: 1.4999969999998939 },
              { x: 10.131145599999854, y: 1.4999969999998939 },
            ]}
          />
          <silkscreenpath
            route={[
              { x: 11.299977399999989, y: -1.4999970000000076 },
              { x: 11.299977399999989, y: 1.4999969999998939 },
            ]}
          />
        </footprint>
      }
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=b7c7b8811acf4e349e7efdbdb0e3674e&pn=C6782225",
        rotationOffset: { x: 0, y: 0, z: 0 },
        positionOffset: { x: 0, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}
