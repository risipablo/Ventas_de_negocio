import { useState } from 'react'
import { Ventas } from './components/ventas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Ingresos de ventas</h1>
      <Ventas/>
    </div>
  )
}

export default App
