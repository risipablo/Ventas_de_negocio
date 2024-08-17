import { Gastos } from "./components/gastos/gastos"
import { Conversion } from "./components/conversion/conversion"
import { Navbar } from "./components/navbar/navbar"
import { Productos } from "./components/productos/productos"
import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import { Notas } from "./components/notas/notas"
import { Proveedor } from "./components/proveedor/proveedor"
import { Carrito } from "./components/carrito/carrito"
import { CarritoProvider } from "./components/carrito/carritoContext"
import { NotasProvider } from "./components/notas/notasContext/notasContext"
import { Stock } from "./components/stock/stock"
import { StockProvider } from "./components/stock/stockContext/stockContext"
import { Archivos } from "./components/archivos/archivo"
import { Ventas } from "./components/ventas/ventas"



function App() {

  return (
    <div>
      <CarritoProvider>
      <NotasProvider>
      <StockProvider>

      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={ <Ventas />}/>
          <Route path='/lista' element={<Productos/>}/>
          <Route path="/gastos" element={<Gastos/>}/>
          <Route path="/proveedor" element={<Proveedor/>}/>
          <Route path="/conversion" element={<Conversion/>}/>
          <Route path="/archivos" element={<Archivos/>}/>
          <Route path="/notas" element={<Notas/>}/>
          <Route path="/stock" element={<Stock/>} />
          <Route path="/carrito" element={<Carrito/>} />
        </Routes>
      </BrowserRouter>

      </StockProvider>
      </NotasProvider>
      </CarritoProvider>


      
    </div>
  )
}

export default App
