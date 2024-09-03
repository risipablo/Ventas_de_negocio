
import {NavLink} from "react-router-dom"

export function Chart() {

    return(
        <div className="container-estadisticas">
            <NavLink to="/ventas-chart">
                Ventas
            </NavLink>

            <NavLink to="/gastos-chart">
                Gastos
            </NavLink>
        </div>
    )
}