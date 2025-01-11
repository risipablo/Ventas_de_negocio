
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,ArcElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


const VentasChart = ({ ventas }) => {
    const isMobile = window.innerWidth <= 768; 

    const ventasPorMes = ventas.reduce((acc,venta) => {

        const month = venta.month; 
        const total = venta.total;
        const conditions = venta.tp ? venta.tp.toLowerCase() : ''

        const conditionsReduce = ['debe']

        if (conditionsReduce.includes(conditions)) {
            return acc;
        }


        if(!acc[month])
            acc[month] = 0
        acc[month] += total

        return acc
    },{}) //{} valor inicial en 0

    const maxVentaMes = Object.keys(ventasPorMes).reduce((max,key) => {
            return ventasPorMes[key] > ventasPorMes[max] 
            ? key : max}, Object.keys(ventasPorMes)[0])


    const promMes = ventasPorMes[maxVentaMes]


    // Datos para el gráfico de ventas por mes
    const dataVentasPorMes = {
        labels: Object.keys(ventasPorMes), // Months
        datasets: [
            {
                label: 'Total de Ventas',
                data: Object.values(ventasPorMes), // Totals by month
                backgroundColor: Object.keys(ventasPorMes).map((proveedor) => proveedor === maxVentaMes ? 'rgba(209, 25, 25, 0.7)' : 'rgba(164, 11, 235,0.7)'),
                borderColor: 'rgba(225, 26, 26, 1)',
                hoverBackgroundColor: Object.keys(ventasPorMes).map((proveedor) => proveedor === maxVentaMes ? 'rgba(200, 25, 25)' : 'rgba(160, 11, 235)'),
                borderWidth: 1,
            },
        ],
    };


    // Ventas por año
    const ventasAño = ventas.reduce((acc,venta) => {
        const year = venta.year;
        const total = venta.total;
        const conditions = venta.tp ? venta.tp.toLowerCase() : ''

        const conditionsReduce = ['debe']

        if (conditionsReduce.includes(conditions)) {
            return acc;
        }

        if(!acc[year])
            acc[year] = 0
        acc[year] += total
        return acc

    },{})

    const maxAño = Object.keys(ventasAño).reduce((max,key) =>{
        return ventasAño[key] > ventas[max] ? key : max
    }, Object.keys(ventasAño)[0])

    const dataAño = {
        labels: Object.keys(ventasAño),
        datasets: [
          {
            label: '',
            data: Object.values(ventasAño),
            borderColor: Object.keys(ventasAño).map((producto) => producto === maxAño ? 'rgba(82, 74, 230)' : 'rgba(82, 74, 230)'),
            borderWidth: 2,
            pointStyle: 'circle',
            pointRadius: 2,
            fill: false, 
            hoverBackgroundColor: Object.keys(ventasAño).map((producto) => producto === maxAño ? 'rgba(82, 74, 230)' : 'rgba(82, 74, 230)'),
          }
        ]
      };
      


      const optionsAño = {
        responsive: true,
        maintainAspectRatio: false, 
       
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: Math.max(...Object.values(ventasAño)) * 1.2, 
                title: {
                    display: true,
                    text: 'Monto',
                    font: {
                        size: 18, 
                        family: 'Poppins, sans-serif',
                    },
                    color: '#333', 
                },
                ticks: {
                    color: '#666', 
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.3)',
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Año',
                    font: {
                        size: 14,
                        family: 'Poppins, sans-serif',
                    },
                    color: '#333', 
                },
                ticks: {
                    color: '#666', 
                },
                grid: {
                    display: false, 
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#333', 
                    font: {
                        size: 18,
                    },
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleFont: {
                    size: 18,
                    weight: 'bold',
                },
                bodyFont: {
                    size: 14,
                },
                borderColor: '#666',
                borderWidth: 1,
                callbacks: {
                    label: function(tooltipItem) {
                        return `Monto:  $ ${tooltipItem.raw.toLocaleString()} `;
                    }
                }
            },
        },
        animation: {
            duration: 1500, 
            easing: 'easeInOutCubic',
        },
        barPercentage: 0.9,
        categoryPercentage: 0.8,
    };

    // productos por mes
    const productosPorMes = ventas.reduce((acc,venta) => {
        
        const product = venta.product ? venta.product.toLowerCase() : ''
        const total = venta.total;
        const conditions = venta.tp ? venta.tp.toLowerCase() : ''

        const conditionsReduce = ['debe']

        if (conditionsReduce.includes(conditions)) {
            return acc;
        }

        if(!acc[product])
            acc[product] = 0

        acc[product] += total

        return acc
    },{})

    const productoMaximo = Object.keys(productosPorMes).reduce((max,key) => {
        return productosPorMes[key] > productosPorMes[max] ? key : max
    },Object.keys(productosPorMes)[0])

    const totalProducto = productosPorMes[productoMaximo]

   
    const dataVentasPorProducto = {
        labels: Object.keys(productosPorMes), // Products
        datasets: [
            {
                label: 'Total de Ventas por Producto',
                data: Object.values(productosPorMes), // Totals by product
                backgroundColor: Object.keys(productosPorMes).map((proveedor) => proveedor === productoMaximo ? 'rgba(209, 25, 25, 0.7)' : 'rgba(164, 11, 235,0.7)'),
                borderColor: 'rgba(225, 26, 26, 1)',
                hoverBackgroundColor: Object.keys(productosPorMes).map((proveedor) => proveedor === productoMaximo ? 'rgba(200, 25, 25)' : 'rgba(160, 11, 235)'),
                borderWidth: 1,
            },
        ],
    };


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

    // productos Mayor vendido
    const productosVendidosMes = ventas.reduce((acc, venta) => {
        const month = venta.month || '';
        const product = venta.product?.toLowerCase() || '';
        const total = venta.total || 0;
        const conditions = venta.tp ? venta.tp.toLowerCase() : ''

        const conditionsReduce = ['debe']

        if (conditionsReduce.includes(conditions)) {
            return acc;
        }

        acc[month] = acc[month] || {};
        acc[month][product] = (acc[month][product] || 0) + total;

        return acc;
    }, {});

    const productoMaximoMes = Object.keys(productosVendidosMes).reduce((result, month) => {
        const productosMes = productosVendidosMes[month];

        const maxProduct = Object.keys(productosMes).reduce(
            (max, key) => (productosMes[key] > productosMes[max] ? key : max),
            Object.keys(productosMes)[0]
        );

        result[month] = { producto: maxProduct, total: productosMes[maxProduct] };
        return result;
    }, {});

   

    const optionsVentaMaximo = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Total',
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
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const index = context.dataIndex;
                        const producto = Object.values(productoMaximoMes)[index];
                        return `${producto.producto}: $${producto.total.toLocaleString()}`;
                    },
                },
            },
        },
    };
    
    const dataVentaMaximo = {
        labels: Object.keys(productoMaximoMes), // Meses
        datasets: [
            {
                label: 'Producto más Vendido',
                data: Object.values(productoMaximoMes).map((p) => p.total), // Totales
                backgroundColor: 'rgba(164, 11, 235, 0.7)',
                borderColor: 'rgba(225, 26, 26, 1)',
                hoverBackgroundColor: 'rgba(200, 25, 25)',
                borderWidth: 1,
            },
        ],
    };


    // Metodo Pago

    const metodoPago = ventas.reduce((acc,venta) => {

        const metodo = venta.tp ? venta.tp.toLowerCase().trim().replace(/\s+/g, ' ') : ''
        const conditions = venta.tp ? venta.tp.toLowerCase() : ''

        const conditionsReduce = ['debe']

        if (conditionsReduce.includes(conditions)) {
            return acc;
        }

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

    const promMetodo = metodoPago[maxMetodo]

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
        cutout: '70%', 
        plugins: {
            legend: {
                display: true,
                position: 'top', // Coloca la leyenda arriba
                align: 'center',
                labels: {
                    color: '#333',
                    font: {
                        size: isMobile ? 12 : 18,
                    },
                    padding: isMobile ? 1 : 20,
                    boxWidth: 20,
                    boxHeight: 10,
                    generateLabels: (chart) => {
                        return chart.data.labels.map((label, index) => {
                            const value = chart.data.datasets[0].data[index];
                            return {
                                text: `${label}: $${value.toLocaleString()}`, 
                                fillStyle: chart.data.datasets[0].backgroundColor[index],
                                strokeStyle: chart.data.datasets[0].borderColor,
                                lineWidth: chart.data.datasets[0].borderWidth,
                            };
                        });
                    },
                    onHover: (event, legendItem, legend) => {
                        // Aplica un estilo hover sobre la leyenda
                        const { chart } = legend;
                        const index = legendItem.index;
                        chart.tooltip.setActiveElements([{ datasetIndex: 0, index }]);
                        chart.update();
                    },
                },
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
        layout: {
            padding: {
                top: 30, // Espacio superior para la leyenda
                bottom: 30, // Espacio inferior para la leyenda
            },
        },
    };

    const promedioVentas = ventas.reduce((acc,venta) => {
        const total = venta.total;
        const conditions = venta.tp ? venta.tp.toLowerCase() : ''

        const conditionsReduce = ['debe']

        if (conditionsReduce.includes(conditions)) {
            return acc;
        }

        const monto = total / 8

        return acc + monto

    },0)

    

    return (
        <div className="chart-container">
            
            <div className="month-container">
                <h2>Ventas por Mes</h2>
                    <div className='bar-container'>
                        <Bar data={dataVentasPorMes} options={options} />
                    </div>
            </div>

            <div className="month-container">
                <h2>Ventas por Año</h2>
                    <div className='bar-container'>
                        <Bar data={dataAño} options={optionsAño} />
                    </div>
            </div>

            <div className='product-container'>
                <h2>Producto por mes</h2>
                    <div className='bar-container'>
                        <Bar data={dataVentasPorProducto} options={options}/>
                    </div>
            </div>

            <div className="product-container">
                <h2>Producto Mayor Vendido</h2>
                <div className="bar-container">
                    <Bar data={dataVentaMaximo} options={optionsVentaMaximo} />
                </div>
            </div>

            <div className="product-container">
                <h2>Metodos de pago </h2>
                <div className="doughnut-container">
                    <Doughnut data={dataMetodoMes} options={optionsDonut2} />
                </div>
            </div>

            <div className="promedios-container">

                <div>
                    <h3> Promedio de ventas por mes </h3>
                    <div className="content-row">
                        <p>${(promedioVentas || 0).toLocaleString('en-US')}</p>
                    </div>
                </div>

                <div>
                    <h3> Producto mayor vendido </h3>
                    <div className="content-row">
                        <p>{productoMaximo}</p>
                        <p>${(totalProducto || 0).toLocaleString('en-US')}</p>
                    </div>
                </div>

                <div>
                    <h3> Metodo con mayor ventas </h3>
                    <div className="content-row">
                        <p>{maxMetodo}</p>
                        <p>${(promMetodo || 0).toLocaleString('en-US')}</p>
                    </div>
                </div>


                <div>
                    <h3> Mes mayor vendido </h3>
                    <div className="content-row">
                        <p>{maxVentaMes}</p>
                        <p>${(promMes || 0).toLocaleString('en-US')}</p>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default VentasChart;
