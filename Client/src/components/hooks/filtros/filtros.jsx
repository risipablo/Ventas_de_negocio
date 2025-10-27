import { useEffect, useState } from "react";
import "../../../styles/filtros.css";
import { Tooltip } from "@mui/material";
import TodayIcon from '@mui/icons-material/Today';

export function Filtros({ ventas, setVentasFiltradas }) {
    const [filterMonth, setFilterMonth] = useState(''); // mes
    const [number, setNumber] = useState(''); // dia
    const [pago, setPago] = useState(''); 
    const [año,setAño] = useState('')

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
        if (año.trim() !== "") {
            ventasFiltradas = ventasFiltradas.filter(
                (venta) => venta.year && venta.year.toLowerCase() === año.toLowerCase()
            );
        }


        setVentasFiltradas(ventasFiltradas);
    };

    const ResetFilter = () => {
        setFilterMonth("");
        setNumber("");
        setPago("");
        setAño("")
        setVentasFiltradas(ventas);
    };

    const fechaHoy = () => {
        const hoy = new Date();
        setNumber(String(hoy.getDate()))
        const meses =  ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
        setFilterMonth(meses[hoy.getMonth()])
        setAño(String(hoy.getFullYear()))
      }

    useEffect(() => {
        filtros();
    }, [filterMonth, number, pago,año,ventas]); 

 


    return (
        <>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                <Tooltip title="Fecha de hoy" arrow>
                    <button
                        onClick={fechaHoy}
                        style={{
                        background: 'rgba(255,255,255,0.85)',
                        border: '2px solid #222',
                        borderRadius: '8px',
                        padding: '6px 10px',
                        cursor: 'pointer',
                        transition: 'box-shadow 0.2s, border-color 0.2s'
                        }}
                        onMouseOver={e => {
                        e.currentTarget.style.boxShadow = '0 0 10px #222';
                        e.currentTarget.style.borderColor = '#3c82f6';
                        }}
                        onMouseOut={e => {
                        e.currentTarget.style.boxShadow = '';
                        e.currentTarget.style.borderColor = '#222';
                        }}
                    >
                        <TodayIcon sx={{ color: '#111' }} />
                    </button>
                </Tooltip>
            </div>


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
                onChange={(e) => setFilterMonth(e.target.value)}
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
                        onChange={(event => setAño(event.target.value))}
                        value={año}
                    >
                        <option value="">Seleccionar Año</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
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
                <option value="Qr">Qr</option>
                <option value="Debe">Debe</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Mercado Pago">Mercado Pago</option>
            </select>

            


            <button className="button" onClick={ResetFilter}>
                <i className="fa-regular fa-circle-xmark"></i>
            </button>
            </div>

        </>
    );
}
