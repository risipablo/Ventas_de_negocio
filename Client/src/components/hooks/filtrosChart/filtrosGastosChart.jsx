import { useEffect, useState } from "react";
import "../../../styles/filtros.css";


export function FiltrosGastoChart({gastos, setGastosFiltrados}){

    const [proveedors, setProveedors] = useState('')
    const [setMes, isSetMes] = useState('')
    const [año, setAño] = useState('');
    const [mesInicio, setMesInicio] = useState('');
    const [mesFin, setMesFin] = useState('');

    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];


    const filtros = () => {
        let gastosFiltrados = gastos;

        if(año.trim() !== '')
            gastosFiltrados = gastosFiltrados.filter(gasto => Number(gasto.año) === Number(año));

        if(proveedors.trim() !== '')
            gastosFiltrados = gastosFiltrados.filter(gasto => gasto.proveedor.toLowerCase() === proveedors.toLowerCase())
    
        if(setMes.trim() !== ''){
            gastosFiltrados = gastosFiltrados.filter(gasto => gasto.mes.toLowerCase() === setMes.toLowerCase())}

        if (mesInicio && mesFin){
            const indexInicial = meses.indexOf(mesInicio.toLowerCase());
            const indexFinal = meses.indexOf(mesFin.toLowerCase());

            gastosFiltrados = gastosFiltrados.filter(gasto => {
                const indexGasto = meses.indexOf(gasto.mes.toLowerCase())
                return indexGasto >= indexInicial && indexGasto <= indexFinal
            } )
        }


        setGastosFiltrados(gastosFiltrados)
    }

    const resertFilter = () => {
        setAño('')
        setProveedors('')
        isSetMes('')
        setMesFin('')
        setMesInicio('')
    }

    useEffect(() => {
        filtros()
    },[proveedors,año,setMes,gastos, mesFin, mesInicio])

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

                <select
                        onChange={(event => setAño(event.target.value))}
                        value={año}
                    >
                        <option value="">Seleccionar Año</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                </select>

                <select value={mesInicio} onChange={e => setMesInicio(e.target.value)}>
                    <option value="">Mes desde</option>
                        {meses.map(mes => (
                            <option key={mes} value={mes}>{mes.charAt(0).toUpperCase() + mes.slice(1)}</option>
                        ))}
                </select>
               
                <select value={mesFin} onChange={e => setMesFin(e.target.value)}>
                    <option value="">Mes hasta</option>
                    {meses.map(mes => (
                        <option key={mes} value={mes}>{mes.charAt(0).toUpperCase() + mes.slice(1)}</option>
                    ))}
                </select>
       
                

                <button className="button" onClick={resertFilter}>
                <i className="fa-regular fa-circle-xmark"></i>
            </button>
        </div>
    )
}