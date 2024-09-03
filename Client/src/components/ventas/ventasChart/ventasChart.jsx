import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../../chart/chart.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VentasChart = ({ ventas }) => {


    const ventasPorMes = ventas.reduce((acc,venta) => {

        const month = venta.month; 
        const total = venta.total;

        if(!acc[month])
            acc[month] = 0
        acc[month] += total

        return acc
    },{}) //{} valor inicial en 0


    const productosPorMes = ventas.reduce((acc,venta) => {
        
        const product = venta.product;
        const total = venta.total;

        if(!acc[product])
            acc[product] = 0

        acc[product] += total

        return acc
    },{})

    // Datos para el gráfico de ventas por mes
    const dataVentasPorMes = {
        labels: Object.keys(ventasPorMes), // Months
        datasets: [
            {
                label: 'Total de Ventas',
                data: Object.values(ventasPorMes), // Totals by month
                backgroundColor: 'rgba(162, 26, 225, 0.6)',
                borderColor: 'rgba(225, 26, 26, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Data for the sales by product chart
    const dataVentasPorProducto = {
        labels: Object.keys(productosPorMes), // Products
        datasets: [
            {
                label: 'Total de Ventas por Producto',
                data: Object.values(productosPorMes), // Totals by product
                backgroundColor: 'rgba(26, 162, 225, 0.6)',
                borderColor: 'rgba(26, 225, 162, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Options for the charts
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Monto Total',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Mes / Producto',
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    return (
        <div>
            <div className="chart-container">
                <h3 className="chart-title">Ventas por Mes</h3>
                <Bar data={dataVentasPorMes} options={options} />
            </div>
            <div className='chart-container'>
                <h3 className="chart-title">Producto por mes</h3>
                <Bar data={dataVentasPorProducto} options={options}/>
            
            </div>

        </div>
    );
};

export default VentasChart;
