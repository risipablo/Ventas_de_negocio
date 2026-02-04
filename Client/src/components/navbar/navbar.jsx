
import { NavLink } from "react-router-dom"
import "../../styles/navbar.css"
import { useState } from "react";
import { Shop } from "../carrito/shop";
import { Box } from '@mui/material';
import { NotasIcon } from "../../pages/notasPage/notasIcon";
import { StockIcon } from "../../pages/stockPage/stockIcon";
import { ArchivoIcon } from "../../pages/archivosPage/archivoIcon";
import ListAltIcon from '@mui/icons-material/ListAlt';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import StoreIcon from '@mui/icons-material/Store';
import CalculateIcon from '@mui/icons-material/Calculate';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { ClientIcon } from "../../pages/clientsPage/clientIcon";



export function Navbar(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.classList.toggle('open', !isMenuOpen);
    };


    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.classList.remove('open');
    }

    const toggleSubmenu = () => {
        setIsSubmenuOpen(!isSubmenuOpen);
    };

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

                            <NavLink to="/calculadora" onClick={closeMenu}>
                                <CalculateIcon/>  <a className="active"> Calculadora </a>
                            </NavLink>
                   
                            <NavLink to="/proveedor" onClick={closeMenu}>
                                <StoreIcon /> <a className="active"> Proveedor </a>
                            </NavLink>

                            <NavLink to="/" onClick={closeMenu}>
                                <AttachMoneyIcon /> <a className="active"> Ventas </a>
                            </NavLink>

                            <NavLink to="/gastos" onClick={closeMenu}>
                                <MoneyOffIcon /> <a className="active"> Gastos </a>
                            </NavLink>

                            <NavLink to="/estadisticas"   onClick={closeMenu}>
                            <QueryStatsIcon /> <a onClick={toggleSubmenu}> Estadisticas </a>
                            </NavLink>

                            <div className={`submenu ${isSubmenuOpen ? 'open' : ''}`} >
                                <NavLink to="/ventas-chart" onClick={closeMenu}>
                                    <a className="submenu-item">Ventas</a>
                                </NavLink>
                                <NavLink to="/gastos-chart" onClick={closeMenu}>
                                    <a className="submenu-item">Gastos</a>
                                </NavLink>
                            </div>
                        </div>
                
                    <div onClick={toggleMenu} className={`menu-icon ${isMenuOpen ? 'open' : ''}`}>
                        
                            <span></span>
                            <span></span>
                            <span></span>
                       
                    </div>

                    <Box className="icon-container" display="flex" alignItems="center" position="relative">
                        <ClientIcon/>
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


 