import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,ArcElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);



const VentasChart = ({ ventas }) => {
    const isMobile = window.innerWidth <= 768; 

    const ventasPorMes = ventas.reduce((acc,venta) => {

        const month = venta.month; 
        const total = venta.total;

        if(!acc[month])
            acc[month] = 0
        acc[month] += total

        return acc
    },{}) //{} valor inicial en 0


    const productosPorMes = ventas.reduce((acc,venta) => {
        
        const product = venta.product ? venta.product.toLowerCase() : ''
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



    // Metodo Pago

    const metodoPago = ventas.reduce((acc,venta) => {

        const metodo = venta.tp ? venta.tp.toLowerCase().trim().replace(/\s+/g, ' ') : ''

        const metodoFinal = metodo === 'efectivo' ? 'efectivo' :
                            metodo === 'Visa Débito' ? 'Visa Debito' : 
                            metodo === 'visa crédito' ? 'Visa Crédito' : 
                            metodo === 'Master Débito' ? 'Master Débito ' : 
                            metodo === 'Cabal Débito' ? 'cabal débito' : 
                            metodo === 'Naranja Crédito' ? 'naranja crédito' : 
                            metodo === 'Master Crédito' ? 'master crédito' : 
                            metodo === 'mercado pago' ? 'Mercado Pago' :
                            venta.tp;

        const total = venta.total

        if(!acc[metodoFinal])
            acc[metodoFinal] = 0

        acc[metodoFinal] += total

        return acc
    },{})

    const maxMetodo = Object.keys(metodoPago).reduce((max,key) => {
        return metodoPago[key] > metodoPago[max] ? key : max;
    }, Object.keys(metodoPago)[0])

    const dataMetodoMes = {
        labels: Object.keys(metodoPago),
        datasets: [
            {
                label: 'Total de Ventas',
                data: Object.values(metodoPago),
                backgroundColor: Object.keys(metodoPago).map((venta) => venta === maxMetodo ? 'rgba(242, 23, 23,0.7)' : 'rgba(162, 26, 225, 0.6)'),
                borderColor: 'rgba(255, 255, 255)', 
                borderWidth: 8, 
                hoverOffset: 8, 
            }
        ]
    }

    const optionsDonut2 = {
        responsive: true,
        cutout: '60%', 
        plugins: {
            legend: {
                display: true,
                position: 'left',
                labels: {
                    color: '#333', 
                    font: {
                        size: isMobile ? 12 : 18,
                    },
                    padding: isMobile ? 1  : 12, 
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0)',
                titleFont: {
                    size: 12,
                    weight: 'bold',
                },
                bodyFont: {
                    size: 16,
                },
                borderColor: '#666',
                borderWidth: 1,
                callbacks: {
                    label: function(tooltipItem) {
                        return `Monto: $ ${tooltipItem.raw.toLocaleString()} `;
                    }
                }
            },
        },
        animation: {
            animateScale: true, 
            animateRotate: true,
        },
    };


    return (
        <div className="chart-container">

            <div className="month-container">
                <h2>Ventas por Mes</h2>
                    <div className='bar-container'>
                        <Bar data={dataVentasPorMes} options={options} />
                    </div>
            </div>

            <div className='product-container'>
                <h2>Producto por mes</h2>
                    <div className='bar-container'>
                        <Bar data={dataVentasPorProducto} options={options}/>
                    </div>
            </div>

            <div className="metodo-container">
                <h2>Metodos de pago </h2>
                <div className="doughnut-container">
                    <Doughnut data={dataMetodoMes} options={optionsDonut2} />
                </div>
            </div>

        </div>
    );
};

export default VentasChart;
