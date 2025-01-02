import { useEffect, useState } from 'react'
// import "../../ estilos chart.css"
import VentasChart from '../../../components/chartComponent/ventasChart.jsx'
import axios from 'axios';
import { FiltrosVentaChart } from '../../../components/hooks/filtrosChart/filtrosVenChart.jsx';
import { Total } from '../../../components/others/totalUtils.jsx';
import { ScrollTop } from '../../../components/others/scrollTop.jsx';



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

            <tr className='total'>
                <span> Total: ${Total({ventas:ventasFiltradas})}</span>
               
            </tr>
  

            <VentasChart ventas={ventasFiltradas}/>

            <ScrollTop/>
        </div>

    )
}