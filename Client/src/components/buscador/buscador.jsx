import { useEffect, useState } from "react";
import "./buscador.css";

export function Buscador({ placeholder, filtrarDatos }) {
    const [buscar, setBuscar] = useState('');

    const buscarChange = (event) => {
        const value = event.target.value;
        const palabraClave = value.trim().toLowerCase().split(/\s+/);
        setBuscar(value);
        filtrarDatos(palabraClave);
    };

    const Reset = () => {
        setBuscar("");
        filtrarDatos([])
    }


    return (
        <div className="buscador-container">
            <input
                type="text"
                placeholder={placeholder}
                value={buscar}
                onChange={buscarChange}
                className="buscador-input"
            />
            <div className="search-icon">
                <i onClick={Reset} className="fa fa-x"></i>
            </div>
        </div>
    );
}
