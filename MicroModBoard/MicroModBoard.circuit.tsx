import { MicroModBoard } from "./index"

export default function TestCircuit() {
  return (
    <board width="30mm" height="25mm">
      <MicroModBoard 
        name="U1" 
        pcbX="0mm" 
        pcbY="0mm"
      />
    </board>
  )
}