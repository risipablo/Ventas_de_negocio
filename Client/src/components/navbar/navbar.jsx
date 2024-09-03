
import { NavLink } from "react-router-dom"
import "./navbar.css"
import { useState } from "react";
import { Shop } from "../carrito/shop";
import { Box } from '@mui/material';
import { NotasIcon } from "../notas/notasIcon";
import { StockIcon } from "../stock/stockIcon";
import { ArchivoIcon } from "../archivos/archivoIcon";
import ListAltIcon from '@mui/icons-material/ListAlt';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import StoreIcon from '@mui/icons-material/Store';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';


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

                            <NavLink to="/lista" onClick={closeMenu}>
                                <ListAltIcon /> <a className="active"> Lista </a>
                            </NavLink>

                            <NavLink to="/conversion" onClick={closeMenu}>
                                <CompareArrowsIcon /> <a className="active"> Conversion </a>
                            </NavLink>

                            <a href="https://risipablo.github.io/ListaLocal/Calculadora.html" className="active">
                                <span className="calculator-icon">🧮</span> Calculadora
                            </a>

                            <NavLink to="/proveedor" onClick={closeMenu}>
                                <StoreIcon /> <a className="active"> Proveedor </a>
                            </NavLink>

                            <NavLink to="/" onClick={closeMenu}>
                                <AttachMoneyIcon /> <a className="active"> Ventas </a>
                            </NavLink>

                            <NavLink to="/gastos" onClick={closeMenu}>
                                <MoneyOffIcon /> <a className="active"> Gastos </a>
                            </NavLink>

                            <NavLink to="/estadisticas" onClick={closeMenu}>
                                <a className="active"> Estadisticas </a>
                            </NavLink>
                        </div>
                
                    <div onClick={toggleMenu} className={`menu-icon ${isMenuOpen ? 'open' : ''}`}>
                        
                            <span></span>
                            <span></span>
                            <span></span>
                       
                    </div>

                    <Box className="icon-container" display="flex" alignItems="center" position="relative">
                        <ArchivoIcon/>
                        <StockIcon/>
                        <NotasIcon/>
                        <Shop />
                    </Box>
                </div>
            </div>
        </nav>
    )
}


 