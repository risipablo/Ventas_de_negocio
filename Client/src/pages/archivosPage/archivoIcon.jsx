// Subida de lista 
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Link, NavLink } from 'react-router-dom';
import { IconButton, Tooltip } from "@mui/material";
import { useState } from 'react';


export function ArchivoIcon(){
    const [active,setActive] = useState(null)

    const open = (icon) => {
        setActive(icon);
    };

    const close = () => {
        setActive(null);
    };


    return(
        <div className="archivos">
            <Link to="/archivos" onMouseEnter={() => open('archivos')} onMouseLeave={close} className='cart-link'>
            <Tooltip title={active === 'archivos' ? "Archivos" : ""} arrow>
                    <IconButton className="icon">
                        <CreateNewFolderIcon />
                    </IconButton>
                </Tooltip>
            </Link>
        </div>
    )
}