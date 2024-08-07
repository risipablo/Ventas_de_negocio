import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const StockContext = createContext();

export function StockProvider({ children }) {
    const [cantidadStock,setCantidadStock] = useState([])

    const serverFront = "http://localhost:3001";
    // const serverFront = 'https://server-ventas.onrender.com';

    useEffect(() => {
        axios.get(`${serverFront}/stock`)
        .then(response => {
            setCantidadStock(response.data)
        })
        .catch(err => console.log(err))
    },[])

    const actualizarStock = (id,nuevaCantidad) => {
        axios.patch(`${serverFront}/sumar-stock/${id}`, {amount:nuevaCantidad})
        .catch(err => console.log(err))
    }

    const sumarStock = (index) => {
        setCantidadStock((prevStock) => 
            prevStock.map((item,i) => {
                if (i === index) {
                    const nuevaCantidad = item.amount + 1;
                    actualizarStock(item._id, nuevaCantidad);
                    return {...item, amount:nuevaCantidad};
                }
                    return item;
            })    
        )
    }

    const restarStock = (index) => {
        setCantidadStock((prevStock) => 
            prevStock.map((item,i) => {
                if (i === index && item.acount > 0) {
                    const nuevaCantidad = item.amount - 1;
                    actualizarStock(item._id, nuevaCantidad);
                    return {...item, amount:nuevaCantidad};
                }
                    return item;
            })    
        )
    }


    return(
        <StockContext.Provider value={{cantidadStock, sumarStock, restarStock}} >
            {children}
        </StockContext.Provider>
    )

}


