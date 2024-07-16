import { Gastos } from "./components/gastos/gastos"
import { Conversion } from "./components/conversion/conversion"

import { Navbar } from "./components/navbar/navbar"
import { Productos } from "./components/productos/productos"
import { Ventas } from "./components/ventas/ventas"
import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import { Notas } from "./components/notas/notas"
import { Proveedor } from "./components/proveedor/proveedor"


function App() {

  return (
    <div>

      
      <BrowserRouter>
        <Navbar/>
        
        <Routes>
          <Route path="/" element={ <Ventas/>}/>
          <Route path='/lista' element={<Productos/>}/>
          <Route path="/gastos" element={<Gastos/>}/>
          <Route path="/proveedor" element={<Proveedor/>}/>
          <Route path="/conversion" element={<Conversion/>}/>
          <Route path="/notas" element={<Notas/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
