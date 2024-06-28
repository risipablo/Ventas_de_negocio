import { useEffect, useState } from "react";
import { Buscador } from "../buscador/buscador";
import axios from "axios";




// const serverFront = "http://localhost:3001";
const serverFront = 'https://server-ventas.onrender.com'




export function Productos(){
    const [productos ,setProductos] = useState([]);
    // const [productoFiltrado, setProductoFiltrado] = useState([]);
    const [marca, setMarca] = useState("")
    const [mascota, setMascota] = useState("")
    const [edad, SetEdad] = useState("")
    const [kilo, setKilo] = useState("")
    const [precio, setPrecio] = useState("")
    const [categoriaProducto, setCategoriaProducto] = useState("")

    useEffect(() => {
        axios.get(`${serverFront}/productos`)
        .then(response => {
            setProductos(response.data);
        })
        .catch(err => console.log(err))
    },[])

    const addProductos = () => {
        if (marca.trim() && mascota.trim() && edad.trim() && kilo.trim() && precio.trim() && categoriaProducto.trim() !== ""){
            axios.post(`${serverFront}/add-productos`, {
                marca: marca,
                mascota: mascota,
                edad:edad,
                kilo: kilo,
                precio: precio,
                categoria: categoriaProducto
            })
            .then(response => {
                const NuevoProducto = response.data;
                setProductos(productos => [...productos, NuevoProducto])
                setMarca("");
                setMascota("");
                SetEdad("");
                setKilo("");
                setPrecio("");
                setCategoriaProducto("");
            })
            .catch(err => console.log(err))
        }
    }

    return(
        <div className="productos-container">
            <h1> Lista Oficial </h1>

            <div className="inputs-ventas">

                <select 
                    type="text" 
                    value={marca}
                    onChange={(e => setMarca(e.target.value))}
                >
                    <option value=""> Seleccionar Marca </option>
                    <option value="Biopet"> Biopet </option>
                </select>

                <select 
                    type="text"
                    onChange={(e => setMascota(e.target.value))}
                    value={mascota} 
                >
                    <option value=""> Seleccionar Mascota </option>
                    <option value="Perro"> Perro </option>
                </select>

                <select type="text" value={edad} onChange={(e => SetEdad(e.target.value))} >
                    <option value=""> Seleccionar Edad </option>
                    <option value="Adulto"> Adulto </option>
                </select>

                <select type="number" value={kilo} onChange={(e => setKilo(e.target.value))} >
                    <option value=""> Seleccionar Kilos </option>
                    <option value="20"> 20 </option>
                </select>

                <input 
                        type="text" 
                        placeholder="Ingresar Precio" 
                        value={precio}
                        onChange={(e => setPrecio(e.target.value))}
                />
                    
                <select type="text" value={categoriaProducto} onChange={e => setCategoriaProducto(e.target.value)}>
                    <option value=""> Seleccionar Categoria </option>
                    <option value="Alimento"> Alimento </option>
                </select>

            </div>

            <div className='botones'>
                <button className="agregar" onClick={addProductos} > Agregar </button>
                <button className='limpiar' > Limpiar </button>  
            </div>

            <Buscador placeholder= "Buscar productos"  />

            <div className="productos">
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th> Marca </th>
                                <th> Mascota </th>
                                <th> Edad </th>
                                <th> Kg </th>
                                <th> Precio </th>
                                <th className="delets"> </th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {productos.map((element,index) => 
                                <tr key={index}>
                                    <td>{element.marca}</td>
                                    <td>{element.mascota}</td>
                                    <td>{element.edad}</td>
                                    <td>{element.kilo} </td>
                                    <td>${element.precio}</td>
                                    <td></td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    )
}