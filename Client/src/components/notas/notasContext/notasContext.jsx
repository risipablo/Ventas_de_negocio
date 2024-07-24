import { createContext, useEffect, useState } from "react";


export const NotasContext = createContext();
const notasInicial = [];

export function NotasProvider({children}){

    const [isNotas,isSetNotas] = useState(() => {
        const storedNotas = localStorage.getItem('isNotas')
        return storedNotas ? JSON.parse(storedNotas) : notasInicial
    });

    useEffect(() => {
        localStorage.setItem('isNotas', JSON.stringify(isNotas))
    })

    const agregarNotas = (note) => {
        isSetNotas((prevNotas) => {
            const NotasExistentes = prevNotas.find((item)=> note._id === note._id)

            if(NotasExistentes) {
                return prevNotas.map((item) => 
                item._id === note._id ? {...item, cantidad:item + 1 } : item
                )
            } else {
                return [...prevNotas, {...note, cantidad:1}]
            }
        })
    } 

    return(
        <NotasContext.Provider value={{ isNotas, agregarNotas}}>
            {children}
        </NotasContext.Provider>
    )
}
