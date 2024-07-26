import { createContext, useEffect, useState } from "react";


export const NotasContext = createContext();
const notasInicial = [];

export function NotasProvider({children}){

    const [notero,setNotero] = useState(() => {
        const storedNotas = localStorage.getItem('notero')
        return storedNotas ? JSON.parse(storedNotas) : notasInicial;
    });

    useEffect(() => {
        localStorage.setItem('notero', JSON.stringify(notero))
    },[notero])

    const agregarNotas = (note) => {
        setNotero((prevNotas) => {
            const notaExistente = prevNotas.find((item) => item._id === note._id);

            if (notaExistente) {
                return prevNotas.map((item) => 
                item._id === note._id ? {...item, cantidad: item.cantidad + 1} : item );
            } else {
                return [...prevNotas, {...note, cantidad: 1}]
            }

        })
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
