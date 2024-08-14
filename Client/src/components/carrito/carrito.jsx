import { useContext, useEffect, useState } from "react";
import { CarritoContext } from "./carritoContext";
import './carrito.css'
import ItemCount from "./itemCount";



export function Carrito(){
    const { carrito, vaciarCarrito, eliminarProd, precioTotal ,handleSumar, handleRestar} = useContext(CarritoContext)


    const handleVaciar = () => {
        vaciarCarrito();
        setTotalCompra(null);
        setProveedor('');
    }

    const handleEliminar = (index) => {
        eliminarProd(index)
    }


    return(
        <div className="carrito-container">
            <h2> Gasto de compra </h2>
            <ul className="carrito-list">
                {carrito.map((producto, index) => (
                    <li key={index} className="carrito-item">
                          <h3>{producto.marcas} </h3>
                            <p>{producto.edades} </p>
                            <p>{producto.mascotas} </p>
                            <p>{producto.kilos} kg </p>
                            <p className="monto"> Costo: ${producto.precios} </p>
                            <p> Cantidad: {producto.cantidad} </p>
                            <p className="monto"> Precio Total: ${producto.precios * producto.cantidad}</p>
                            <p>{producto.proveedores}</p>

                            <ItemCount 
                             InitialCantidad={producto.cantidad} 
                             precioUnitario={producto.precios}
                             handleRestar={() => handleRestar(index)}
                             handleSumar={() => handleSumar(index)}
                             />

                          <button onClick={() => handleEliminar(index)}> <i className="fa-solid fa-trash"></i></button>
                          
                    </li>
                ))} {
                    
                    carrito.lenght > 0 ? ( 
                        <h3> Carrito vacio</h3>
                    )
                    : (
                       
                        <div className="carrito-total">
                        <h3>Total: $ {precioTotal()} </h3>
                        <button onClick={handleVaciar}> Vaciar</button>
        

                        </div> 
                        
                    )} 
            </ul>
        </div>
    )
}