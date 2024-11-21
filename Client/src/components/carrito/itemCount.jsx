import { useContext, useState } from "react";
import "../../styles/carrito.css"
import { CarritoContext } from "./carritoContext";

function ItemCount ({InitialCantidad,handleRestar,handleSumar}){
    const {carrito} = useContext(CarritoContext)
    const [cantidad,setCantidad] = useState(InitialCantidad);

    const decrecer = () => {
        if(cantidad > 0)
        setCantidad(cantidad - 1 )
        handleRestar()
    }

    const crecer = () => {
        setCantidad(cantidad + 1 )
        handleSumar()
    }

  
    return(
        <div className="item-count">
            <button onClick={decrecer}> - </button>
            <p> {cantidad} </p>
            <button onClick={crecer}> + </button>
        </div>
    )
}

export default ItemCount;