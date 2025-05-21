import { useEffect, useState } from "react";
import "../../../styles/filtros.css";

export function FiltrosVentaChart({ ventas, setVentasFiltradas }) {
    const [filterMonth, setFilterMonth] = useState('');
    const [number, setNumber] = useState('');
    const [pago, setPago] = useState('');
    const [produc,setProduc] = useState('')
    const [produc2,setProduc2] = useState('') // productos juntos
    const [años, setAños] = useState('')
    const [mesInicio, setMesInicio] = useState('');
    const [mesFin, setMesFin] = useState('');

    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];


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

        if (produc2.trim() !== "") {
            const normalizedInput = produc2.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
            ventasFiltradas = ventasFiltradas.filter(venta => 
                venta.product.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedInput)
            );
        }

        if (años.trim() !== "") {
            ventasFiltradas = ventasFiltradas.filter(
                (venta) => venta.year && venta.year.toLowerCase() === años.toLowerCase()
            );
        }

        // Aplicar el filtro a los meses seleccionados
        if (mesInicio && mesFin) {
        //  Buscar el indice del primer mes y del mes final
            const indexInicio = meses.indexOf(mesInicio.toLowerCase());
            const indexFinal = meses.indexOf(mesFin.toLowerCase());

        // Filtrar las ventas para quedarse solo con las que estan en el rango
            ventasFiltradas = ventasFiltradas.filter(venta => {
            // Obtener el indicie del mes de la venta
                const indexVenta = meses.indexOf(venta.month.toLowerCase())
            // Devuelve solo las ventas que esnten en el rango entre el inicio y el final
                return indexVenta >= indexInicio && indexVenta <= indexFinal;
            })
    }

        setVentasFiltradas(ventasFiltradas);
    };

    const ResetFilter = () => {
        setFilterMonth("");
        setNumber("");
        setPago("");
        setProduc("")
        setProduc2('')
        setAños('')
        setMesInicio('')
        setMesFin('')
        setVentasFiltradas(ventas);
    };

    useEffect(() => {
        filtros();
    }, [filterMonth, number, pago, produc, produc2,años ,ventas, mesFin,mesInicio]); 

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
                onChange={(event => setAños(event.target.value))}
                value={años}
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
                <option value="Debe"> Debe </option>
                <option value="Efectivo">Efectivo</option>
                <option value="Mercado Pago">Mercado Pago</option>
            </select>

            <input
                type="text"
                placeholder="Productos separados"
                value={produc}
                onChange={(e => setProduc(e.target.value))}
            />

            <input
                type="text"
                placeholder="Productos juntos"
                value={produc2}
                onChange={(e) => setProduc2(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setProduc2(e.target.value)}
            />


        
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
       
            


            <button className="button" onClick={ResetFilter}>
                <i className="fa-regular fa-circle-xmark"></i>
            </button>
        </div>
    );
}
