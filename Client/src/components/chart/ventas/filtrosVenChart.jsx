import { useEffect, useState } from "react";
import "../../ventas/filtros.css";

export function FiltrosVentaChart({ ventas, setVentasFiltradas }) {
    const [filterMonth, setFilterMonth] = useState('');
    const [number, setNumber] = useState('');
    const [pago, setPago] = useState('');
    const [produc,setProduc] = useState('')

    const filtros = () => {
        let ventasFiltradas = ventas;

        if (filterMonth.trim() !== "") {
            ventasFiltradas = ventasFiltradas.filter(venta => venta.month.toLowerCase() === filterMonth.toLowerCase());
        }

        if (number.trim() !== "") {
            ventasFiltradas = ventasFiltradas.filter(venta => venta.day === number);
        }

        if (pago.trim() !== "") {
            ventasFiltradas = ventasFiltradas.filter(venta => venta.tp.toLowerCase() === pago.toLowerCase());
        }

        if (produc.trim() !== "") {
            ventasFiltradas = ventasFiltradas.filter(venta => venta.product.toLowerCase() === produc.toLowerCase());
        }

        setVentasFiltradas(ventasFiltradas);
    };

    const ResetFilter = () => {
        setFilterMonth("");
        setNumber("");
        setPago("");
        setProduc("")
        setVentasFiltradas(ventas);
    };

    useEffect(() => {
        filtros();
    }, [filterMonth, number, pago, produc ,ventas]); 

    return (
        <div className="filtros">
            <select
                onChange={(event) => setNumber(event.target.value)}
                value={number}
            >
                <option value="">Seleccionar Día</option>
                {[...Array(31)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>{index + 1}</option>
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
                <option value="">Seleccionar Tipo de Pago</option>
                <option value="Visa Débito">Visa Débito</option>
                <option value="Visa PrePago">Visa PrePago</option>
                <option value="Naranja Débito">Naranja Débito</option>
                <option value="Cabal Débito">Cabal Débito</option>
                <option value="Master Débito">Master Débito</option>
                <option value="Visa Crédito">Visa Crédito</option>
                <option value="Master Crédito">Master Crédito</option>
                <option value="Naranja Crédito">Naranja Crédito</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Mercado Pago">Mercado Pago</option>
            </select>

            <input
                type="text"
                placeholder=""
                value={produc}
                onChange={(e => setProduc(e.target.value))}
            />

            <button className="button" onClick={ResetFilter}>
                <i className="fa-regular fa-circle-xmark"></i>
            </button>
        </div>
    );
}
