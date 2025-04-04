import { useEffect, useState } from "react";
import "../../styles/buscador.css";

export function Buscador({ placeholder, filtrarDatos }) {
    
    const [inputValue, setInputValue] = useState('') 


    const buscarInput = (event) => {
        if (event.key === 'Enter'){
            const palabraClave = inputValue.toLowerCase().split(/\s+/).filter(palabra => palabra.trim() !== '')
            filtrarDatos(palabraClave)
        }
    }


    const Reset = () => {
        setInputValue("");
        filtrarDatos([])
    }


    return (
        <div className="buscador-container">
            <input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="buscador-input"
                onKeyDown={buscarInput}
            />
            <div className="search-icon">
                <i onClick={Reset} className="fa fa-x"></i>
            </div>
        </div>
    );
}


// const [buscar, setBuscar] = useState('');

    // const buscarChange = (event) => {
    //     const value = event.target.value;
    //     const palabraClave = value.trim().toLowerCase().split(/\s+/);
    //     setBuscar(value);
    //     filtrarDatos(palabraClave);
    // };