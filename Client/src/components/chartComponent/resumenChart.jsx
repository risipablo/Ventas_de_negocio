

export function ResumenEstadisticas({gastos}) {

    // const isMobile = window.innerWidth <= 768;


    const promedioGasto = (gastos) => {
        if (gastos.length === 0) 
            return 0
        const sumaTotal = gastos.reduce((total,gasto) => total + Number(gasto.monto),0)
        const total = sumaTotal / gastos.length

        return total.toLocaleString('en-US')
    }

    

    return(
        <div className="chart-container">
            <div className="promedio-container">
                <p>Promedio gasto por mes</p>
                    <span>$ {promedioGasto(gastos)}</span>
            </div>
            <div>
                <p>Total por mes </p>
            </div>
        </div>
    )
}