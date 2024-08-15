// Subida de lista 
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { NavLink } from 'react-router-dom';
import { IconButton, Tooltip } from "@mui/material";


export function ArchivoIcon(){

    return(
        <div className="archivos">
            <NavLink to="/archivos">
                <Tooltip>
                    <IconButton className="icon">
                        <CreateNewFolderIcon />
                    </IconButton>
                </Tooltip>
            </NavLink>
        </div>
    )
}