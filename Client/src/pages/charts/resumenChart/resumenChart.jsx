import axios from "axios"
import { useEffect, useState } from "react"
import { ResumenEstadisticas } from "../../../components/chartComponent/resumenChart"

export function ResumenChart(){
        const serverFront = 'http://localhost:3001'
        // const serverFront = 'https://ventas-de-negocio.onrender.com'

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
            <h2>  Resumen por año </h2>
            <ResumenEstadisticas gastos={gastosFiltrados}/>
            
        </div>
    )
}