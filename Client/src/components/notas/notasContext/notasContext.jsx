import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const NotasContext = createContext();


export function NotasProvider({children}){

    const serverFront = 'https://server-ventas.onrender.com';
// const serverFront = "http://localhost:3001";


    const [notero,setNotero] = useState([])

    useEffect(() => {
        axios.get(`${serverFront}/notas`)
        .then(response => {
            const notas = response.data.map(nota => ({...nota,cantidad:1}))
            setNotero(notas)
        })
        .catch(err => console.log(err))
    },[])

    const agregarNotas = (note) => {
        setNotero((prevNotas) => {
            const notaExistente = prevNotas.find((item) => item._id === note._id);
            if (notaExistente) {
                return prevNotas.map((item) => item._id === note._id ? { ...item, cantidad: item.cantidad + 1 } : item);
            }
            return [...prevNotas, { ...note, cantidad: 1 }];
        });
    }

    const cantidadNotas = () => {
        return notero.reduce((acumulador,note) => acumulador + note.cantidad, 0)
    }

    const eliminarNota = (id) => {
        setNotero((prevNotas) => prevNotas.filter((note) => note._id !== id))
    }

    const completarNotas = (id, completed) => {
        setNotero((prevNotas) => {
            return prevNotas.map((note) =>
                note._id === id ? { ...note, cantidad: completed ? note.cantidad - 1 : note.cantidad + 1 } : note
            );
        });
    };


    return(
        <NotasContext.Provider value={{ notero, agregarNotas, cantidadNotas,eliminarNota,completarNotas}}>
            {children}
        </NotasContext.Provider>
    )
}
