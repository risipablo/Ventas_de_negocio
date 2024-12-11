import axios from "axios"
import { useEffect, useState } from "react"
import GastosChart from "../../../components/chartComponent/gastosChart"
import { FiltrosGastoChart } from "../../../components/hooks/filtrosChart/filtrosGastosChart"
import { ScrollTop } from "../../../components/others/scrollTop"





export function GastosEstadisticas(){
        // const serverFront = 'http://localhost:3001'
        const serverFront = 'https://ventas-de-negocio.onrender.com'

        const [gastos,setGastos] = useState([])
        const [gastosFiltrados, setGastosFiltrados] = useState([])

        useEffect(() => {
            axios.get(`${serverFront}/gastos`)
            .then(response => {
                setGastos(response.data)
                setGastosFiltrados(response.data)
            })
            .catch(err => console.log(err))
        },[])

    return(
        <div className="ventas-chart">
            <h2>  Estadisticas de Gastos</h2>
            <FiltrosGastoChart gastos={gastos} setGastosFiltrados={setGastosFiltrados}/> 
            <GastosChart gastos={gastosFiltrados}/>
            <ScrollTop/>
        </div>
    )
}