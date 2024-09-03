
import { Bar } from 'react-chartjs-2';
import '../../chart/chart.css'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GastosChart = ({gastos}) => {

    const gastosPorMes = gastos.reduce((acc,gasto) => {

        const mes = gasto.mes;
        const total = gasto.monto;

        if(!acc[mes])
            acc[mes] = 0
        acc[mes] += total

        return acc
    },{})


    const dataGastosMes = {
        labels: Object.keys(gastosPorMes),
        datasets: [
            {
                label: 'Total de Gastos',
                data: Object.values(gastosPorMes), // Totals by month
                backgroundColor: 'rgba(162, 26, 225, 0.6)',
                borderColor: 'rgba(225, 26, 26, 1)',
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

    return (
        <div>
            <div className='chart-container'>
                <h3 className="chart-title">Gastos por Mes</h3>
                <Bar data={dataGastosMes} options={options}/>
            </div>
        </div>
    )
}

export default GastosChart