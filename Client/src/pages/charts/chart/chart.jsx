import { NavLink } from "react-router-dom";
import ventas from "../../../components/Images/ventas.png";
import gastos from "../../../components/Images/gastos.png";
import "../../../styles/chart.css"

export function Chart() {
    return (
        <div className="container-estadisticas">
            
            <NavLink to="/ventas-chart" className="chart-link">
                <img src={ventas} alt="Ventas" className="chart-image" />
                <span>Ventas</span>
            </NavLink>

            <NavLink to="/gastos-chart" className="chart-link">
                <img src={gastos} alt="Gastos" className="chart-image" />
                <span>Gastos</span>
            </NavLink>

            <NavLink to="/resumen-chart" className='chart-link'>
                <span> Resumen </span>
            </NavLink>
        </div>
    );
}
