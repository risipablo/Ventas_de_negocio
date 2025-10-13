import { Gastos } from "./pages/gastos/gastos"
import { Conversion } from "./components/conversion/conversion"
import { Navbar } from "./components/navbar/navbar"
import { Productos } from "./pages/productos/productos"
import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import { Notas } from "./components/notas/notas"
import { Proveedor } from "./pages/proveedor/proveedor"
import { Carrito } from "./pages/carritoPage/carrito"
import { CarritoProvider } from "./components/carrito/carritoContext"
import { NotasProvider } from "./components/notas/notasContext/notasContext"
import { Stock } from "./components/stock/stock"
import { Ventas } from "./pages/ventas/ventas"
import FileUpload from "./components/archivos/archivo"
import { VentasEstadisticas } from "./pages/charts/ventasChart/ventasEstadisticas"
import { Chart } from "./pages/charts/chart/chart"
import { GastosEstadisticas } from "./pages/charts/gastosChart/gastosEstadisticas"
import { RecordatorioProvider } from "./components/recordatorios/recordatorioContext"
import { Calculadora } from "./components/calculadora/calculadora"




function App() {

  return (
    <div>
      <CarritoProvider>
      <NotasProvider>
      <RecordatorioProvider>

      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Ventas/>}/>
          <Route path='/lista' element={<Productos/>}/>
          <Route path="/gastos" element={<Gastos/>}/>
          <Route path="/proveedor" element={<Proveedor/>}/>
          <Route path="/conversion" element={<Conversion/>}/>
          <Route path="/archivos" element={<FileUpload/>}/>
          <Route path="/calculadora" element={<Calculadora/>}/>
          <Route path="/notas" element={<Notas/>}/>
          <Route path="/stock" element={<Stock/>} />
          <Route path="/carrito" element={<Carrito/>} />
          <Route path="/estadisticas" element={<Chart/>} />
          <Route path="/ventas-chart" element={<VentasEstadisticas />} />
          <Route path="/gastos-chart" element={<GastosEstadisticas/>} />
          {/*  */}
        </Routes>
      </BrowserRouter>

      </RecordatorioProvider>
      </NotasProvider>
      </CarritoProvider>


      
    </div>
  )
}

export default App
