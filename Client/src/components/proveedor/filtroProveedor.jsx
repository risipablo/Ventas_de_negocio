import { useEffect, useState } from "react"




export function FiltroProveedor({products, setProveedorFiltrado}) {
    const [filterProveedor,setFilterProveedor] = useState('');
    const [filterMarca, setFilterMarca] = useState('');
    const [filterEdad, setFilterEdad] = useState('');
    const [filterMascota, setFilterMascota] = useState('');

    const filterProv = () => {
        let proveedorFiltrado = products;

        if (filterProveedor.trim() !== '') {
            proveedorFiltrado = proveedorFiltrado.filter(product => product.proveedores.toLowerCase() === filterProveedor.toLowerCase())
        }

        if (filterMarca.trim() !== '') {
            proveedorFiltrado = proveedorFiltrado.filter(product => product.marcas.toLowerCase() === filterMarca.toLowerCase())
        }


        if (filterMascota.trim() !== '') {
            proveedorFiltrado = proveedorFiltrado.filter(product => product.mascotas.toLowerCase() === filterMascota.toLowerCase());
        }

        if (filterEdad.trim() !== '') {
            proveedorFiltrado = proveedorFiltrado.filter(product => product.edades.toLowerCase() === filterEdad.toLowerCase());
        }


        setProveedorFiltrado(proveedorFiltrado)
    }

    const ResetFilter = () => {
        setFilterProveedor('')
        setFilterMarca('')
        setFilterMascota('')
        setFilterEdad('')
        setProveedorFiltrado(products)
    }

    useEffect(() => {
        filterProv()
    },[filterProveedor, filterEdad, filterMascota , filterMarca, products])

    return(
        <div className="filtros">

            <select
                onChange={(event) => setFilterProveedor(event.target.value)}
                value={filterProveedor} >
                <option value="">Seleccionar Proveedor</option>
                <option value="Popy">Popy</option>
                <option value="Forastero">Forastero</option>
                <option value="Can Cid">Can Cid</option>
                <option value="Nutripet">Nutripet</option>
                <option value="Nutrisur">Nutrisur</option>
                <option value="Amadeo">Amadeo</option>
                <option value="Don Tomas">Don Tomas</option>
                <option value="Chubutin">Chubutin</option>
                <option value="Kro Line">Kro Line</option>
            </select>

            <select
                type="text" onChange={(event) => setFilterMarca(event.target.value)} 
                value={filterMarca} >
                    <option value="">Seleccionar Marcas</option>
                    <option value="Agility">Agility</option>
                    <option value="Biopet">Biopet</option>
                    <option value="Nutricare">Nutricare</option>
                    <option value="Royal Canin">Nutripet</option>
                    <option value="Cat Chow">Nutrisur</option>
                    <option value="Dog Chow">Amadeo</option>
                    <option value="Gati">Don Tomas</option>
                    <option value="Balanced">Chubutin</option>
                    <option value="Pretal">Pretal</option>
            </select>

            <select
                value={filterMascota}
                onChange={(e) => setFilterMascota(e.target.value)}
            >
                <option value="">Seleccionar Mascota</option>
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
                <option value="Mixto">Mixto</option>
            </select>

            <select
                value={filterEdad}
                onChange={(e) => setFilterEdad(e.target.value)}
            >
                <option value="">Seleccionar Edad</option>
                <option value="Adulto">Adulto</option>
                <option value="Mini Adulto">Mini Adulto</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Mini Puppy">Mini Puppy</option>
                <option value="Derma Adulto">Derma Adulto</option>
                <option value="Derma Mini Adulto">Derma Mini Adulto</option>
                <option value="Urinary">Urinary</option>
                <option value="Senior">Senior</option>
                <option value="Criadores">Criadores</option>
                <option value="Lata">Lata</option>
                <option value="Pouch">Pouch</option>
                <option value="Mini Adulto Active Mind">Mini Adulto Active Mind</option>
                <option value="Weight Control">Weight Control</option>
                <option value="Colchoneta"> Colchoneta </option>
            </select>


        

                <button className="button" onClick={ResetFilter}> <i className="fa-regular fa-circle-xmark"></i> </button>
        </div>
    )
    
}