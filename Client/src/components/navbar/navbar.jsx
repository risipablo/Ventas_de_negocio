
import { NavLink } from "react-router-dom"
import "./navbar.css"
import {  useContext, useState } from "react";
import { Shop } from "../carrito/shop";
import { Box, IconButton, Tooltip } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { NotasContext } from "../notas/notasContext/notasContext";


export function Navbar(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [active, setActive] = useState(null)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.classList.toggle('open', !isMenuOpen);
    };


    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.classList.remove('open');
    }

    const apretar = (icon) => {
        setActive(icon);
    }

    const soltar = () => {
        setActive(null);
    }

    // const {cantidadNotas} = useContext(NotasContext)

    return (

        <nav>
            <div className={`overlay ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu}></div>
                <div className="container">
                    <div className="navbar">           
                    <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
                        <NavLink to="/lista" onClick={closeMenu}> <a className="active"> Lista </a></NavLink>
                        <NavLink to="/conversion" onClick={closeMenu}> <a className="active">Conversion</a></NavLink>
                        <a href="https://risipablo.github.io/ListaLocal/Calculadora.html" className="active">Calculadora</a>
                        <NavLink to="/proveedor" onClick={closeMenu}> <a className="active"> Proveedor </a></NavLink>
                        <NavLink to="/" onClick={closeMenu}><a className="active">Ventas</a></NavLink>
                        <NavLink  to="/gastos" onClick={closeMenu}><a className="active">Gastos</a></NavLink>
                    </div>
                
                    <div onClick={toggleMenu} className={`menu-icon ${isMenuOpen ? 'open' : ''}`}>
                        
                            <span></span>
                            <span></span>
                            <span></span>
                       
                    </div>

                    <Box className="icon-container" display="flex" alignItems="center" position="relative">
                        <NavLink to="/notas" onMouseEnter={() => apretar('notas')} onMouseLeave={soltar} >
                            <Tooltip title={active === 'notas' ? "notas" : ""} arrow>
                                <IconButton>
                                    <AssignmentIcon fontSize="large" />
                                    {/* <span>{cantidadNotas()}</span> */}
                                </IconButton>
                            </Tooltip>
                        </NavLink>
                        <Shop />
                    </Box>
                </div>
            </div>
        </nav>
    )
}