import { Link } from "react-router-dom";
import { CarritoContext } from "./carritoContext";
import { useContext, useState } from "react";
import { Badge, IconButton, Tooltip } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./carrito.css"; 

export function Shop() {
    const { cantidadCarrito } = useContext(CarritoContext);
    const [active, setActive] = useState(null);

    const open = (icon) => {
        setActive(icon);
    };

    const close = () => {
        setActive(null);
    };

    return (
        <>
            <Link to="/carrito" onMouseEnter={() => open('carrito')} onMouseLeave={close} className="cart-link">
                <Tooltip title={active === 'carrito' ? "Carrito" : ""} arrow>
                    <IconButton >
                        <ShoppingCartIcon className="icon" />
                        <span  className="cart-count"> {cantidadCarrito()} </span>
                    </IconButton>
                </Tooltip>
            </Link>
        </>
    );
}



