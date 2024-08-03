import { IconButton, Tooltip } from "@mui/material";
import { Inventory } from "@mui/icons-material"; // Import the Material UI icon
import { useState } from "react";
import { NavLink } from "react-router-dom";

export function StockIcon() {
    const [active, setActive] = useState(null);

    const apretar = (icon) => {
        setActive(icon);
    };

    const soltar = () => {
        setActive(null);
    };

    return (
        <NavLink to="/stock" onMouseEnter={() => apretar('stock')} onMouseLeave={soltar} className="link">
            <Tooltip title={active === 'stock' ? "Stock" : " "}>
                <IconButton className="icon">
                    <Inventory />
                </IconButton>
            </Tooltip>
        </NavLink>
    );
}
