import { useEffect, useState } from "react"


export function FiltrosProductos({productos,setProductosFiltrados}){

    const [marca, setFilterMarca] = useState("")
    const [edad, setFilterEdad] = useState("")
    const [mascota, setFilterMascota] = useState("")
    const [kilo, setFilterKilos] = useState("")
    const [categoria, setFilterCategoria] = useState("")

    const filtros = () =>{
        let productoFiltrado = productos;

        if(marca.trim() !=="") {
            productoFiltrado = productoFiltrado.filter(producto => producto.marca.toLowerCase() === marca.toLocaleLowerCase())
        }
        if(edad.trim() !=="") {
            productoFiltrado = productoFiltrado.filter(producto => producto.edad.toLowerCase() === edad.toLocaleLowerCase())
        }
        if(mascota.trim() !=="") {
            productoFiltrado = productoFiltrado.filter(producto => producto.mascota.toLowerCase() === mascota.toLocaleLowerCase())
        }
        if(kilo.trim() !=="") {
            productoFiltrado = productoFiltrado.filter(producto => producto.kilo.toLowerCase() === kilo.toLocaleLowerCase())
        }
        if(categoria.trim() !=="") {
            productoFiltrado = productoFiltrado.filter(producto => producto.categoria.toLowerCase() === categoria.toLocaleLowerCase())
        }


        setProductosFiltrados(productoFiltrado)
    }

    const resetFiltros = () => {
        setFilterMarca('')
        setFilterEdad('')
        setFilterMascota('')
        setFilterKilos('')
        setFilterCategoria('')
    }

    useEffect(() => {
        filtros();
    },[marca,edad,mascota,categoria,kilo,productos])


    return(
        <div className="filtros2">

            <input className="filtro-input"
                    type="text" 
                    placeholder="Ingresar Marca"
                    onChange={(event) => setFilterMarca(event.target.value)}
                    value={marca}
            />

            <select className="filtro-input"
                type="text"
                onChange={(e => setFilterMascota(e.target.value))}
                value={mascota} 
            >
                <option value=""> Seleccionar Mascota </option>
                <option value="Perro"> Perro </option>
                <option value="Gato"> Gato </option>
            </select>

            <select className="filtro-input"
            type="text" value={edad} onChange={(e => setFilterEdad(e.target.value))} >
                    <option value=""> Seleccionar Edad </option>
                    <option value="Adulto"> Adulto </option>
                    <option value="Mini Adulto"> Mini Adulto </option>
                    <option value="Cachorro"> Cachorro </option>
                    <option value="Mini Puppy"> Mini Puppy </option>
                    <option value="Derma Adulto">Derma Adulto</option>
                    <option value="Derma Adulto">Derma Mini Adulto </option>
                    <option value="Urinary"> Urinary </option>
                    <option value=" Senior"> Senior </option>
                    <option value="Criadores"> Criadores </option>
                    <option value="Lata"> Lata </option>
                    <option value="Pouch"> Pouch </option>
                    <option value="Mini Adulto Active Mind"> Mini Adulto Active Mind </option>
                    <option value="Weight Control"> Weight Control </option>
            </select>

            <input className="filtro-input" 
             placeholder="Ingresar Unidad" value={kilo} onChange={(e => setFilterKilos(e.target.value))} />

        
            <select className="filtro-input"
             type="text" value={categoria} onChange={e => setFilterCategoria(e.target.value)}>
                    <option value=""> Seleccionar Categoria </option>
                    <option value="Alimento"> Alimento </option>
                    <option value="Accesorio"> Accesorio </option>
                    <option value="Indumentaria"> Indumentaria </option>
                    <option value="Humedo"> Humedo </option>
                    <option value="Snack"> Snack </option>
                    <option value="Pipeta"> Pipeta </option>
                    <option value="Higiene"> Higiene </option>
            </select>

        <button className="button" onClick={resetFiltros}> <i className="fa-regular fa-circle-xmark"></i> </button>
    </div>
    )
}