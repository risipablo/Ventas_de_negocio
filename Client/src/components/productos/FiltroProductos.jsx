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
    },[marca,edad,mascota,categoria,kilo])


    return(
        <div className="filtros2">

            <select className="filtro-input"
                    type="text" 
                    onChange={(event) => setFilterMarca(event.target.value)}
                    value={marca}
                >

                    <option value=""> Seleccionar Marca </option>
                    <option value="Agility">Agility</option>
                    <option value="Balanced"> Balanced </option>
                    <option value="Bandeja Sanitaria"> Bandeja Sanitaria </option>
                    <option value="Biopet"> Biopet </option>
                    <option value="Bocato"> Bocato </option>
                    <option value="Buzo Animado"> Buzo Animado </option>
                    <option value="Cat Chow"> Cat Chow </option>
                    <option value="Collar Pitbull"> Collar Pitbull </option>
                    <option value="Colchoneta Desenfundable"> Colchoneta Desenfundable </option>
                    <option value="Hueso Corbato"> Hueso Corbato  </option>
                    <option value="Dog Chow"> Dog Chow </option>
                    <option value="Eukanuba"> Eukanuba</option>
                    <option value="Excellent"> Excellent </option>
                    <option value="Gati"> Gati </option>
                    <option value="Golocan"> Golocan </option>
                    <option value="Hueso "> Grisines  </option>
                    <option value="Hueso"> Hueso 15 </option>
                    <option value="Iglu"> Iglu  </option>
                    <option value="Nutricare"> Nutricare </option>
                    <option value="Optimun"> Optimun </option>
                    <option value="Old Prince"> Old Prince  </option>
                    <option value="Hueso "> Oreja de vaca  </option>
                    <option value="Moises de Jean"> Moises de Jean </option>
                    <option value="Nidos de Corderito"> Nidos de Corderito </option>
                    <option value="Paños Pet"> Paños Pet  </option>
                    <option value="Pedigree"> Pedigree  </option>
                    <option value="Pellcats"> Pellcats </option>
                    <option value="Piedras"> Piedras Blancas </option>
                    <option value="Pipetas"> Pipetas </option>
                    <option value="Pretal Completo "> Pretal Completo  </option>
                    <option value="Pretal Solo "> Pretal Solo  </option>
                    <option value="Pechera Pitbull"> Pechera Pitbull </option>
                    <option value="Polares"> Polar </option>
                    <option value="Pro Plan"> Pro Plan </option>
                    <option value="Royal Canin"> Royal Canin </option>
                    <option value="Stone"> Stone Cat </option>
                    <option value="Sieger"> Sieger</option>
                    <option value="Shampoo"> Shampoo </option>
                    <option value="Suertudo"> Suertudo </option>
                    <option value="Wishka"> Wishka </option>

            </select>

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