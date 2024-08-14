import { useEffect, useState } from "react";



export function FiltroProveedor({ products,setProovedorFiltrado }) {

    const [proveedorFilter, setProovedorFilter] = useState('')
    // const [newMarca, setNewMarca] = useState("");
    // const [mascotaFilter, setMascotaFilter] = useState('')

    const filtro = () => {
        let proveedorFiltrado = products;

        if (proveedorFilter.trim() !=="") {
            proveedorFiltrado = proveedorFiltrado.filter(product => product.proveedor && product.proveedor.toLowerCase() === proveedorFilter.toLowerCase())
        }

        // if(mascotaFilter.trim() !==""){
        //     proveedorFiltrado = proveedorFiltrado.filter(product => product.mascotas && product.mascotas.toLowerCase() === mascotaFilter.toLowerCase())
        // }
        
        setProovedorFiltrado(proveedorFiltrado);
    }

    const resert = () => {
        // setMascotaFilter('')
        setProovedorFilter('')
        setProovedorFiltrado(products)
    }

    useEffect(() => {
        filtro()
    },[proveedorFilter])

    return(
        <div className="filtros">

                <input type="text" onChange={(event) => setProovedorFilter(event.target.value)} value={proveedorFilter} />

                <button className="button" onClick={resert}> <i className="fa-regular fa-circle-xmark"></i> </button>
        </div>
    )
    
}