
import { Bar, Doughnut } from 'react-chartjs-2';
import '../../../styles/chart.css'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,ArcElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement);


const GastosChart = ({gastos}) => {
    const isMobile = window.innerWidth <= 768;

    const gastosPorMes = gastos.reduce((acc,gasto) => {

        const mes = gasto.mes;
        const total = gasto.monto;

        if(!acc[mes])
            acc[mes] = 0
        acc[mes] += total

        return acc
    },{})

    const maximoMes = Object.keys(gastosPorMes).reduce((max,key) => {
        return gastosPorMes[key] > gastosPorMes[max] ? key : max
    }, Object.keys(gastosPorMes)[0]) 


    const dataGastosMes = {
        labels: Object.keys(gastosPorMes),
        datasets: [
            {
                label: 'Total de Gastos',
                data: Object.values(gastosPorMes), // Totals by month
                backgroundColor: Object.keys(gastosPorMes).map((proveedor) => proveedor === maximoMes ? 'rgba(209, 25, 25, 0.7)' : 'rgba(164, 11, 235,0.7)'),
                borderColor: 'rgba(225, 26, 26, 1)',
                hoverBackgroundColor: Object.keys(gastosPorMes).map((proveedor) => proveedor === maximoMes ? 'rgba(200, 25, 25)' : 'rgba(160, 11, 235)'),
                borderWidth: 1,
            },
        ],
    }

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
                    text: 'Mes ',
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

    const proveedorPorMes = gastos.reduce((acc,gasto) => {
        const proveedores = gasto.proveedor;
        const total = gasto.monto;

        if(!acc[proveedores])
            acc[proveedores] = 0
        acc[proveedores] += total

        return acc
    },{})

    const maxProveedor = Object.keys(proveedorPorMes).reduce((max,key) => {
        return proveedorPorMes[key] > proveedorPorMes[max] ? key : max
    },Object.keys(proveedorPorMes)[0])

    const dataProveedor = {
        labels: Object.keys(proveedorPorMes),
        datasets: [
            {
                label: 'Total de Gasto',
                data: Object.values(proveedorPorMes),
                backgroundColor:
                    Object.keys(proveedorPorMes).map((producto) => 
                    producto === maxProveedor ? 'rgba(209, 25, 25, 0.7)': 'rgba(47, 39, 206,0.6)')
                ,
                borderColor: 'rgba(255, 255, 255, 1)', 
                borderWidth: 5, 
                hoverOffset: 10, 
            }
        ]
    };

    const optionDoghnut = {
        responsive: true,
        cutout: '20%', // Hace la dona más delgada
        plugins: {
            legend: {
                display: true,
                position: 'left',
                labels: {

                    font: {
                        size: isMobile ? 12 : 18, 
                    },
                    padding: 12, 
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro del tooltip
                titleFont: {
                    size: 14,
                    weight: 'bold',
                },
                bodyFont: {
                    size: 12,
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
        <div className='chart-container'>
            <div className='bar-container'>
                <h3 className="chart-title">Gastos por Mes</h3>
                <Bar data={dataGastosMes} options={options}/>
            </div>

            <div className="donut-container">
                <h3 className='chart-title'> Proveedores por Mes </h3>
                <Doughnut data={dataProveedor} options={optionDoghnut}></Doughnut>
            </div>
        </div>
    )
}

export default GastosChart