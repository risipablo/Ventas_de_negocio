import { useEffect, useState } from "react";



export function FiltroProveedor({ products,setProovedorFiltrado }) {

    const [newProveedor, setFilterProveedor] = useState("")

    const filtro = () => {
        let proveedorFiltrado = products;

        if (newProveedor.trim() !=="") {
            proveedorFiltrado = proveedorFiltrado.filter(product => 
                product.proveedores && 
                product.proveedores.toLowerCase() === newProveedor.toLowerCase()
            );
        }            
        
        setProovedorFiltrado(proveedorFiltrado);
    }

    const resert = () => {
        setFilterProveedor('');
        filtro();
    }

    useEffect(() => {
        filtro();
    },[newProveedor])

    return(
        <div className="filtros">

                <input type="text" onChange={(event) => setFilterProveedor(event.target.value)} value={newProveedor} />

                <button className="button" onClick={resert}> <i className="fa-regular fa-circle-xmark"></i> </button>
        </div>
    )
    
}