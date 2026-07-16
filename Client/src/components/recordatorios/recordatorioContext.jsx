import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { config } from "../config/index";

// crear la variable del contexto
const RecordatorioContext = createContext()

// componente del recordatorio

export const RecordatorioProvider = ({children}) => {
    const serverFront = config.Api

    const [notas,setNotas] = useState([])

    useEffect(() => {
        axios.get(`${serverFront}/recordatorio`)
        .then(response => setNotas(response.data))
        .catch(err => console.log(err))
    },[])

    const addRecordatorio = (titulo, fecha) => {
        if (!titulo.trim() || !fecha.trim()) return;
        axios.post(`${serverFront}/recordatorio`,{titulo, fecha})
        .then(res => setNotas(prev => [...prev, res.data]))
        .catch(err => console.log(err))
    }
    
    const deleteRecordatorio = (id) => {
        axios.delete(`${serverFront}/recordatorio/` + id)
        .then(response => {
            setNotas(notas.filter(nota => nota._id !== id))
        })
        .catch(err => console.log(err))
    }

    return(
        <RecordatorioContext.Provider value={{notas , addRecordatorio, deleteRecordatorio}}>
            {children}
        </RecordatorioContext.Provider>
    )
}

export const useRecordatorio = () => useContext(RecordatorioContext)