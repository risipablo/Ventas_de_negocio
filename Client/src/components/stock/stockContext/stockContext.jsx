import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const StockContext = createContext();


export function StockProvider({ children }) {
    const [cantidadStock,setCantidadStock] = useState([])

    
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


