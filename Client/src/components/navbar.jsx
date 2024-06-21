
import { NavLink } from "react-router-dom"
import "./navbar.css"
import { useState } from "react";

export function Navbar(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    const closeMenu = () => {
        setIsMenuOpen(false);
    }


    return (

        <nav>
        <div className="container">
            <div className="navbar">
        
            <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
                <a href="https://risipablo.github.io/ListaLocal/">Lista</a>
                <a href="https://risipablo.github.io/ListaLocal/Convertidor.html">Conversion</a>
                <a href="https://risipablo.github.io/ListaLocal/Calculadora.html">Calculadora</a>
                <a href="https://risipablo.github.io/ListaLocal/Proveedores.html">Proveedor</a>
                <NavLink to="/" onClick={closeMenu}><a className="active">Ventas</a></NavLink>
                <NavLink  to="/gastos" onClick={closeMenu}><a className="active">Gastos</a></NavLink>
            </div>
        
            <div onClick={toggleMenu} className={`menu-icon ${isMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            </div>
        </div>
    </nav>
    )
}