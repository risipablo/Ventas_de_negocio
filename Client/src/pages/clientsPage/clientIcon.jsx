import { IconButton, Tooltip } from "@mui/material";
import { Person } from "@mui/icons-material"; 
import { useState } from "react";
import { NavLink } from "react-router-dom";

export function ClientIcon() {
    const [active, setActive] = useState(null);

    const apretar = (icon) => {
        setActive(icon);
    };

    const soltar = () => {
        setActive(null);
    };

    return (
        <NavLink to="/client" onMouseEnter={() => apretar('clientes')} onMouseLeave={soltar} className="link">
            <Tooltip title={active === 'clientes' ? "Clientes" : " "}>
                <IconButton className="icon">
                    <Person />
                </IconButton>
            </Tooltip>
        </NavLink>
    );
}