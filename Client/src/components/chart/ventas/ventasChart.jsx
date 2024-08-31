import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../../chart/chart.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VentasChart = ({ ventas }) => {

    // Agrupar ventas por mes y calcular el total
    const ventasPorMes = ventas.reduce((acc, venta) => {
        const month = venta.month;
        const total = venta.total;
        
        if (!acc[month]) {
            acc[month] = 0;
        }
        acc[month] += total;
        return acc;
    }, {});

    // Datos para el gráfico de ventas por mes
    const dataVentasPorMes = {
        labels: Object.keys(ventasPorMes), // Los meses
        datasets: [
            {
                label: 'Total de Ventas',
                data: Object.values(ventasPorMes), // Los totales por mes
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Opciones para el gráfico
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
                    text: 'Mes',
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
        </div>
    );
};

export default VentasChart;
