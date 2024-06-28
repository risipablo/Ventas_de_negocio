
import { NavLink } from "react-router-dom"
import "./navbar.css"
import {  useState } from "react";

export function Navbar(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.classList.toggle('open', !isMenuOpen);
    };


    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.classList.remove('open');
    }


    return (

        <nav>
            <div className={`overlay ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu}></div>
                <div className="container">
                    <div className="navbar">           
                    <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
                        <NavLink to="/lista" onClick={closeMenu}> <a className="active"> Lista </a></NavLink>
                        <NavLink to="/conversion" onClick={closeMenu}> <a className="active">Conversion</a></NavLink>
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