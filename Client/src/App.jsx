import { Conversion } from "./components/conversion/conversion"
import { Gastos } from "./components/gastos/gastos"
import { Navbar } from "./components/navbar/navbar"
import { Productos } from "./components/productos/productos"
import { Ventas } from "./components/ventas/ventas"
import { BrowserRouter, Route, Routes  } from 'react-router-dom'


function App() {

  return (
    <div>

      
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={ <Ventas/>}/>
          <Route path='/lista' element={<Productos/>}/>
          <Route path="/gastos" element={ <Gastos/>}/>
          <Route path="/conversion" element={<Conversion/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
