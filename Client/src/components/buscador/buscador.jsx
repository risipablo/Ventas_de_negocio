import { useState } from "react";
import "../../styles/buscador.css";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

export function Buscador({ placeholder, filtrarDatos }) {
    
    const [inputValue, setInputValue] = useState('') 
    const [searching, setSearching] = useState(false)


    const buscarInput = (event) => {

        event.preventDefault();
            const palabraClave = inputValue.toLowerCase().split(/\s+/).filter(palabra => palabra.trim() !== '')
            filtrarDatos(palabraClave)
            setSearching(true)
            
    }


    const Reset = () => {
        setInputValue("");
        filtrarDatos([])
        setSearching(false)
    }


  return (
        <div className="buscador-container">
            <div className="buscador-wrapper">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="buscador-input"
                    onKeyDown={(e) => e.key === 'Enter' && buscarInput(e)}
                />
                {searching && (
                    <CloseIcon className="clear-icon" onClick={Reset} />
                )}
                <button className="search-button" onClick={buscarInput}>
                    <SearchIcon className="search-icon" />
                </button>
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