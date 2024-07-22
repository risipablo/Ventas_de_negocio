import { Link } from "react-router-dom";
import { CarritoContext } from "./carritoContext";
import { useContext } from "react";
import "./carrito.css"

export function Shop(){

    const {cantidadCarrito} = useContext(CarritoContext)

    return(
        <>
            <Link to="/carrito" className="cart-link">
                <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                <span className="cart-count">{cantidadCarrito ()}</span>
            </Link>
        </>
    )
}