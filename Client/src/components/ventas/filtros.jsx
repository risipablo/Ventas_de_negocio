import { useEffect, useState } from "react";
import "./filtros.css"

export function Filtros({ventas,setVentasFiltradas}){

    const [filterMonth,setFilterMonth] = useState ('')
    const [number,setNumber] = useState ('')
    const [pago,setPago] = useState ('')


    // Cear una funcion general
    const filtros = () => {
        let ventaFiltradas = ventas;

        if(filterMonth.trim() !==""){
            ventaFiltradas = ventaFiltradas.filter(venta => venta.month.toLowerCase() === filterMonth.toLowerCase())
        }

        if(number.trim() !== "") {
            ventaFiltradas = ventaFiltradas.filter(venta => venta.day === number)
        }

        if(pago.trim() !== "") {
            ventaFiltradas = ventaFiltradas.filter(venta => venta.tp.toLowerCase() === pago.toLowerCase())
        }


        
        setVentasFiltradas(ventaFiltradas)
  
    }


    const ResetFilter = () => {
        setFilterMonth("")
        setNumber("")
        setPago("")
    }


    // Con el useEffect los filtros automáticamente cambiar cada vez que los valores de filterMonth o number cambian 
    useEffect(() => {
        filtros();
    },[filterMonth,number,pago])

    return(
             <div className="filtros">

                <select
                    onChange={(event) => setNumber(event.target.value)}
                    value={number}
                    
                >
                    <option value="">Seleccionar Dia</option>
                    {[...Array(31)].map((_,index) => (
                        <option key={index + 1} value={index + 1}> {index + 1} </option>
                    ))}
                </select>

                <select
                    onChange={(event) => setFilterMonth(event.target.value)}
                    value={filterMonth}
                    
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
                    onChange={(event) => setPago(event.target.value)}
                    value={pago}
                >
                    <option value=""> Seleccionar tipo de pago </option>
                    <option value="Visa Débito" > Visa Débito </option>
                    <option value="Visa PrePago"> Visa PrePago </option>
                    <option value="Naranja Débito"> Naranja Débito</option>
                    <option value="Cabal Débito "> Cabal Débito </option>
                    <option value="Master Débito "> Master Débito </option>
                    <option value="Naranja Débito"> Naranja Débito</option>
                    <option value="Visa Crédito ">Visa Crédito </option>
                    <option value=" Master Crédito "> Master Crédito </option>
                    <option value="Naranja Crédito "> Naranja Crédito </option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Mercado Pago">Mercado Pago</option>
                </select>

                <button className="button" onClick={ResetFilter}> <i className="fa-regular fa-circle-xmark"></i> </button>
            </div>
    )
}