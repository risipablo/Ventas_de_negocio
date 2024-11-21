import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { NotasContext } from "../../components/notas/notasContext/notasContext";
import { IconButton, Tooltip } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';

export function NotasIcon() {
    const { cantidadNotas } = useContext(NotasContext);
    const [active, setActive] = useState(null);

    const apretar = (icon) => {
        setActive(icon);
    };

    const soltar = () => {
        setActive(null);
    };

    return (
        <NavLink to="/notas" onMouseEnter={() => apretar('notas')} onMouseLeave={soltar} className="link">
            <Tooltip title={active === 'notas' ? "Notas" : ""} arrow>
                <IconButton className="icon">
                    <AssignmentIcon fontSize="large" />
                    <span className="note-count"> {cantidadNotas()} </span>
                </IconButton>
            </Tooltip>
        </NavLink>
    );
}
