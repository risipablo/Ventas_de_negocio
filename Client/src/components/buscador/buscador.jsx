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
            <input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="buscador-input"
                onKeyDown={(e) => e.key === 'Enter' && buscarInput(e)}
            />
            <div className="search-icon" >
                {searching ?
                    <CloseIcon className="icon" onClick={Reset} />
                    :
                    <SearchIcon className="icon" onClick={buscarInput} />
                }
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