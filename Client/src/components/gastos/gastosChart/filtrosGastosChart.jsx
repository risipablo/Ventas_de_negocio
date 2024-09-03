import { useEffect, useState } from "react";
import "../../ventas/filtros.css"


export function FiltrosGastoChart({gastos, setGastosFiltrados}){

    const [proveedors, setProveedors] = useState('')
    const [setMes, isSetMes] = useState('')

    const filtros = () => {
        let gastosFiltrados = gastos;

        if(proveedors.trim() !== '')
            gastosFiltrados = gastosFiltrados.filter(gasto => gasto.proveedor.toLowerCase() === proveedors.toLowerCase())
    
        if(setMes.trim() !== '')
            gastosFiltrados = gastosFiltrados.filter(gasto => gasto.mes.toLowerCase() === setMes.toLowerCase())

        setGastosFiltrados(gastosFiltrados)
    }

    useEffect(() => {
        filtros()
    },[proveedors,setMes,gastos])

    return(
        <div className="filtros">
            
            <select
                    onChange={(event) => setProveedors(event.target.value)}
                    value={proveedors}
                >
                    <option value="">Elegir Proveedor</option>
                    <option value="Forastero">Forastero</option>
                    <option value="Chubutin">Chubutin</option>
                    <option value="Amadeo S.R.L">Amadeo</option>
                    <option value="Don Tomas">Don Tomas</option>
                    <option value="Nutripet">Nutripet</option>
                    <option value="Popy">Popy</option>
                    <option value="Nutrisur">Nutrisur</option>
                    <option value="Kro Line">Kro Line</option>
                    <option value="Mercaba">Mercaba</option>
                    <option value="Cancid">Cancid</option>
                    <option value="Indumentaria">Indumentaria</option>
                    <option value="Otros">Otros</option>
                </select>

                <select
                    onChange={(event) => 
                        isSetMes(event.target.value)}
                    value={setMes}
                >
                    <option value="">Elegir Mes</option>
                    <option value="Enero">Enero</option>
                    <option value="Febrero">Febrero</option>
                    <option value="Marzo">Marzo</option>
                    <option value="Abril">Abril</option>
                    <option value="Mayo">Mayo</option>
                    <option value="Junio">Junio</option>
                    <option value="Julio">Julio</option>
                    <option value="Agosto">Agosto</option>
                    <option value="Septiembre">Septiembre</option>
                    <option value="Octubre">Octubre</option>
                    <option value="Noviembre">Noviembre</option>
                    <option value="Diciembre">Diciembre</option>
                </select>
        </div>
    )
}