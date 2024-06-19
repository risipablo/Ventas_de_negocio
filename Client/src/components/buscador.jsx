import { useState } from "react";
import "./buscador.css";

export function Buscador({ filtrarVentas }) {
    const [buscar, setBuscar] = useState('');

    const buscarChange = (event) => {
        const value = event.target.value;
        setBuscar(value)
        const palabraClave = value.trim().toLowerCase().split(/\s+/);
        filtrarVentas(palabraClave)
    };



    return (
        <div className="buscador-container">
            <input 
                type="text" 
                placeholder="Buscar ventas" 
                value={buscar}
                onChange={buscarChange}
                className="buscador-input" 
            />
        </div>
    );
}
