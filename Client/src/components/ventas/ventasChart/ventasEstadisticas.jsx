import { useEffect, useState } from 'react'
import "../../chart/chart.css"
import VentasChart from './ventasChart'
import axios from 'axios';
import { FiltrosVentaChart } from './filtrosVenChart.jsx';



export function VentasEstadisticas(){

    const [ventas,setVentas] = useState([]);
    const [ventasFiltradas, setVentasFiltradas] = useState([]);

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