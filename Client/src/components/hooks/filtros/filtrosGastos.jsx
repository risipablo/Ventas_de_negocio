import { useEffect, useState } from "react";


export function FiltrosGastos({gastos,setGastosFiltrados}){

    const [mes,setMes] = useState ('')
    const [proveedor,setProveedor] = useState ('')
    const [estado,setEstado] = useState ('')
    const [dia,setDia] = useState ('')
    const [años,setAños] = useState('')
    
  


    // Cear una funcion general
    const filtros = () => {
        let gastosFiltrados = gastos;

        if(mes.trim() !==""){
            gastosFiltrados = gastosFiltrados.filter(venta => venta.mes.toLowerCase() === mes.toLowerCase())
        }

        if(dia.trim() !==""){
            gastosFiltrados = gastosFiltrados.filter(venta => venta.dia.toLowerCase() === dia.toLowerCase())
        }

        if(proveedor.trim() !== "") {
            gastosFiltrados = gastosFiltrados.filter(venta => venta.proveedor === proveedor)
        }

        if(estado.trim() !== "") {
            gastosFiltrados = gastosFiltrados.filter(venta => venta.estado.toLowerCase() === estado.toLowerCase())
        }

        if (años.trim() !== "") {
            ventasFiltradas = ventasFiltradas.filter(
                (venta) => venta.año && venta.año.toLowerCase() === años.toLowerCase()
            );
        }

        setGastosFiltrados(gastosFiltrados)


    }


    const ResetFilter = () => {
        setEstado("")
        setMes("")
        setProveedor("")
        setDia("")
        setAños('')
        setFilterMes("")
    }


    // Con el useEffect los filtros automáticamente cada vez que los valores cambian 
    useEffect(() => {
        filtros();
    },[mes,estado,proveedor,dia,años])

    return(
             <div className="filtros">

                <select
                    onChange={(event) => setDia(event.target.value)}
                    value={dia}
                    
                >
                    <option value="">Seleccionar Dia</option>
                    {[...Array(31)].map((_,index) => (
                        <option key={index + 1} value={index + 1}> {index + 1} </option>
                    ))}
                </select>

                <select
                    onChange={(event) => setMes(event.target.value)}
                    value={mes}
                    
                >
                    <option value="">Seleccionar Mes</option>
                    <option value="enero">Enero</option>
                    <option value="febrero">Febrero</option>
                    <option value="marzo">Marzo</option>
                    <option value="abril">Abril</option>
                    <option value="mayo">Mayo</option>
                    <option value="junio">Junio</option>
                    <option value="julio">Julio</option>
                    <option value="agosto">Agosto</option>
                    <option value="septiembre">Septiembre</option>
                    <option value="octubre">Octubre</option>
                    <option value="noviembre">Noviembre</option>
                    <option value="diciembre">Diciembre</option>
                </select>

                <select
                        onChange={(event => setAños(event.target.value))}
                        value={años}
                    >
                        <option value="">Seleccionar Año</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                </select>
              

                <select
                    onChange={(event) => setProveedor(event.target.value)}
                    value={proveedor}
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
                     onChange={(event) => setEstado(event.target.value)}
                     value={estado}
                >
                    <option value="">Seleccionar Estado</option>
                    <option value="Pagado">Pagado</option>
                    <option value="Impago">Impago</option>
                </select>



                <button className="button" onClick={ResetFilter}> <i className="fa-regular fa-circle-xmark"></i> </button>
            </div>
    )
}