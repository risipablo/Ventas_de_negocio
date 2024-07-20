import { createContext, useState } from "react";


export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [carrito,setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        setCarrito((prevCarrito) => {
            const productoExistente = prevCarrito.find((item) => item._id === producto._id);
            if (productoExistente) {
                return prevCarrito.map((item) =>
                    item._id === producto._id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            } else {
                return [...prevCarrito, { ...producto, cantidad: 1 }];
            }
        });
    };


    const vaciarCarrito = () => {
        setCarrito([])
    }

    const precioTotal = () => {
        return carrito.reduce((acumulador,prod) => acumulador + prod.precios * prod.cantidad, 0)
    }
    const eliminarProd = (index) => {
        const eliminar = carrito.filter((_,i) => i !== index)
        setCarrito(eliminar)
    }

   
    return(
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, vaciarCarrito, eliminarProd, precioTotal}}>
            {children}
        </CarritoContext.Provider>
    )
}

