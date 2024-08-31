import { createContext, useEffect, useState } from "react";



export const CarritoContext = createContext();
const carritoInicial = [];
  const serverFront = 'http://localhost:3001'

export function CarritoProvider({ children }) {
    const [carrito,setCarrito] = useState(() => {
    

      const storedCart = localStorage.getItem('carrito')
      return storedCart ? JSON.parse(storedCart) : carritoInicial 
    });

    useEffect(() => {
      localStorage.setItem('carrito',JSON.stringify(carrito))
    })

    const agregarAlCarrito = (producto) => {
        setCarrito((prevCarrito) => {
            const productoExistente = prevCarrito.find((item) => item._id === producto._id);
;
            if (productoExistente) {
                return prevCarrito.map((item) =>
                    item._id === producto._id ? { ...item, cantidad: item.cantidad + 1, precioTotal:item.cantidad * item.precios } : item
                );
                
            } else {
                return [...prevCarrito, { ...producto, cantidad: 1, precioTotal:producto.precios }];
            }
        });
    
    };

    const handleSumar = (index) => {
        setCarrito((prevCarrito) =>
          prevCarrito.map((item, i) =>
            i === index ? { ...item, cantidad: item.cantidad + 1, precioTotal: item.precios * (item.cantidad + 1) } : item
          )
        );
      };
    
      const handleRestar = (index) => {
        setCarrito((prevCarrito) =>
          prevCarrito.map((item, i) =>
            i === index ? { ...item, cantidad: item.cantidad > 0 ? item.cantidad - 1 : 0, precioTotal: item.precios * (item.cantidad - 1) } : item
          )
        );
      };


    const vaciarCarrito = () => {
        setCarrito([])
    }

    const cantidadCarrito = () => {
      return carrito.reduce((acumulador,prod) => acumulador + prod.cantidad, 0)
    }


    const precioTotal = () => {
        return carrito.reduce((acumulador,prod) => acumulador + prod.precios * prod.cantidad, 0)
    }
    
    const eliminarProd = (index) => {
        const eliminar = carrito.filter((_,i) => i !== index)
        setCarrito(eliminar)
    }


   
    return(
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, vaciarCarrito, eliminarProd, precioTotal,handleRestar,handleSumar,cantidadCarrito}}>
            {children}
        </CarritoContext.Provider>
        
    )
}

