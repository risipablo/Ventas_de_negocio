import { useEffect, useState } from 'react'
// import "../../ estilos chart.css"
import VentasChart from './ventasChart.jsx'
import axios from 'axios';
import { FiltrosVentaChart } from '../../../components/hooks/filtros/filtrosVenChart.jsx';



export function VentasEstadisticas(){

    const [ventas,setVentas] = useState([]);
    const [ventasFiltradas, setVentasFiltradas] = useState([]);

    // const serverFront = 'http://localhost:3001'
    const serverFront = 'https://ventas-de-negocio.onrender.com'


    useEffect(() => {
        axios.get(`${serverFront}/ventas`)
        .then(response => {
            setVentas(response.data)
            setVentasFiltradas(response.data)
        })
        .catch(err => console.log(err))
    },[])

    return(
        <div className="ventas-chart">
            <h2> Ventas Estadisticas </h2>

            <FiltrosVentaChart ventas={ventas} setVentasFiltradas={setVentasFiltradas}/>

            <VentasChart ventas={ventasFiltradas}/>
        </div>

    )
}