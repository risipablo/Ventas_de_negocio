export const Total = ({ventas}) => {

    let monto = 0
    ventas.forEach(product => {
        if(product.tp && product.tp.toLowerCase() === 'debe')
            monto == product.tp
        monto += product.total
    });

    return monto.toLocaleString('en-US');
}