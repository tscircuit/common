import type { ChipProps } from "@tscircuit/props"

export const ArduinoShield = (props: ChipProps & { children?: any }) => (
    <group>
      <chip name={props.name} 
       pinLabels={{
        pin1: "A0",
        pin2: "A1",
        pin3: "A2",
        pin4: "A3",
        pin5: "A4",
        pin6: "A5",
        pin7: "VIN",
        pin8: "NC",
        pin9: "IOREF",
        pin10: "RES",
        pin11: "V3_3",
        pin12: "V5",
        pin13: "GND0",
        pin14: "GND1",
        pin15: "RX",
        pin16: "TX",
        pin17: "D2",
        pin18: "D3",
        pin19: "D4",
        pin20: "D5",
        pin21: "D6",
        pin22: "D7",
        pin23: "D8",
        pin24: "D9",
        pin25: "D10",
        pin26: "D11",
        pin27: "D12",
        pin28: "D13",
        pin29: "GND2",
        pin30: "AREF",
        pin31: "SDA",
        pin32: "SCL",


        

      }}
      schWidth={1.5}
      schPinArrangement={{
        leftSide:{
          direction:"top-to-bottom",
          pins:["A0","A1","A2","A3","A4","A5","IOREF","RES","VIN","V5","V3_3","AREF","GND0","GND1","GND2"]
        },
        rightSide:{
          direction:"top-to-bottom",
          pins:["RX","TX","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13","SDA","SCL"]
        }
      }}
      schPinStyle={{
        pin6:{
        marginBottom:0.5
        },
        pin16:{
          marginBottom:0.3
        }
      }}
       footprint={<footprint>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin1"]} pcbX={31.75} pcbY={-23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin2"]} pcbX={29.19} pcbY={-23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin3"]} pcbX={26.63} pcbY={-23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin4"]} pcbX={24.07} pcbY={-23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin5"]} pcbX={21.51} pcbY={-23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin6"]} pcbX={18.95} pcbY={-23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <silkscreentext text="A0" fontSize={0.8}  pcbX={31.75} pcbY={-21.99} />
       <silkscreentext text="A1" fontSize={0.8}  pcbX={29.19} pcbY={-21.99} />
       <silkscreentext text="A2" fontSize={0.8}  pcbX={26.63} pcbY={-21.99} />
       <silkscreentext text="A3" fontSize={0.8}  pcbX={24.07} pcbY={-21.99} />
       <silkscreentext text="A4" fontSize={0.8}  pcbX={21.51} pcbY={-21.99} />
       <silkscreentext text="A5" fontSize={0.8}  pcbX={18.95} pcbY={-21.99} />

       <platedhole holeDiameter={"1.016mm"} portHints={["pin7"]} pcbX={13.91} pcbY={-23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin8"]} pcbX={11.35} pcbY={-23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin9"]} pcbX={8.79} pcbY={-23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin10"]} pcbX={6.23} pcbY={-23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin11"]} pcbX={3.67} pcbY={-23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin12"]} pcbX={1.11} pcbY={-23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin13"]} pcbX={-1.11} pcbY={-23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin14"]} pcbX={-3.67} pcbY={-23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <silkscreentext text="VIN" fontSize={0.8}  pcbX={13.91}  pcbY={-21.99} />
       <silkscreentext text="GND1" fontSize={0.8}  pcbX={11.35} pcbY={-21.99} />
       <silkscreentext text="GND0" fontSize={0.8}  pcbX={8.79} pcbY={-21.99} />
       <silkscreentext text="V5" fontSize={0.8}  pcbX={6.23} pcbY={-21.99} />
       <silkscreentext text="V3_3" fontSize={0.8}  pcbX={3.67} pcbY={-21.99} />
       <silkscreentext text="RES" fontSize={0.8}  pcbX={1.11} pcbY={-21.99} />
       <silkscreentext text="IOREF" fontSize={0.8}  pcbX={-1.11} pcbY={-21.99} />
       <silkscreentext text="NC" fontSize={0.8}  pcbX={-3.67} pcbY={-21.99} />

       <platedhole holeDiameter={"1.016mm"} portHints={["pin15"]} pcbX={31.75} pcbY={23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin16"]} pcbX={29.19} pcbY={23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin17"]} pcbX={26.63} pcbY={23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin18"]} pcbX={24.07} pcbY={23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin19"]} pcbX={21.51} pcbY={23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin20"]} pcbX={18.95} pcbY={23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin21"]} pcbX={16.39} pcbY={23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin22"]} pcbX={13.83} pcbY={23.99} outerDiameter={"1.88mm"} shape="circle"/>

       <silkscreentext text="D7" fontSize={0.8}  pcbX={13.83}  pcbY={22.2} />
       <silkscreentext text="D6" fontSize={0.8}  pcbX={16.39}  pcbY={22.2} />
       <silkscreentext text="D5" fontSize={0.8}  pcbX={18.95}  pcbY={22.2} />
       <silkscreentext text="D4" fontSize={0.8}  pcbX={21.51}  pcbY={22.2} />
       <silkscreentext text="D3" fontSize={0.8}  pcbX={24.07}  pcbY={22.2} />
       <silkscreentext text="D2" fontSize={0.8}  pcbX={26.63}  pcbY={22.2} />
       <silkscreentext text="TX" fontSize={0.8}  pcbX={29.19}  pcbY={22.2} />
       <silkscreentext text="RX" fontSize={0.8}  pcbX={31.75}  pcbY={22.2} />
       
       

       <platedhole holeDiameter={"1.016mm"} portHints={["pin23"]} pcbX={9.96} pcbY={23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin24"]} pcbX={7.4} pcbY={23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin25"]} pcbX={4.84} pcbY={23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin26"]} pcbX={2.28} pcbY={23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin27"]} pcbX={-0.28} pcbY={23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin28"]} pcbX={-2.82} pcbY={23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin29"]} pcbX={-5.36} pcbY={23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin30"]} pcbX={-7.9} pcbY={23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin31"]} pcbX={-10.46} pcbY={23.99} outerDiameter={"1.88mm"} shape="circle"/>
       <platedhole holeDiameter={"1.016mm"} portHints={["pin32"]} pcbX={-12.9} pcbY={23.99} outerDiameter={"1.88mm"} shape="circle"/>

       <silkscreentext text="D8" fontSize={0.8}  pcbX={9.96}  pcbY={22.2} />
       <silkscreentext text="D9" fontSize={0.8}  pcbX={7.4}  pcbY={22.2} />
       <silkscreentext text="D10" fontSize={0.8}  pcbX={4.84}  pcbY={22.2} />
       <silkscreentext text="D11" fontSize={0.8}  pcbX={2.28}  pcbY={22.2} />
       <silkscreentext text="D12" fontSize={0.8}  pcbX={-0.28}  pcbY={22.2} />
       <silkscreentext text="D13" fontSize={0.8}  pcbX={-2.82}  pcbY={22.2} />
       <silkscreentext text="GND2" fontSize={0.8}  pcbX={-5.36}  pcbY={22.2} />
       <silkscreentext text="AREF" fontSize={0.8}  pcbX={-7.9}  pcbY={22.2} />
       <silkscreentext text="SDA" fontSize={0.8}  pcbX={-10.46}  pcbY={22.2} />
       <silkscreentext text="SCL" fontSize={0.8}  pcbX={-12.9}  pcbY={22.2} />

    


      </footprint>}/>
    </group>
  )
