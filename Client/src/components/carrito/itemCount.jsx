import { useState } from "react";
import "./carrito.css"

function ItemCount ({InitialCantidad}){

    const [cantidad,setCantidad] = useState(InitialCantidad);

    const handleRestar = () => {
        if(cantidad > 0)
        setCantidad(cantidad - 1 )
    }

    const handleSumar = () => {
        setCantidad(cantidad + 1 )
    }


    return(
        <div className="item-count">
            <button onClick={handleRestar}> - </button>
            <p> {cantidad} </p>
            <button onClick={handleSumar}> + </button>
        </div>
    )
}

export default ItemCount;