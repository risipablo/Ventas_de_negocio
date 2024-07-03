import { useEffect, useState } from "react";
import { Buscador } from "../buscador/buscador";
import axios from "axios";
import { ToastContainer,toast,Bounce } from "react-toastify";
import { FiltrosProductos } from "./FiltroProductos";



// const serverFront = "http://localhost:3001";
const serverFront = 'https://server-ventas.onrender.com'



export function Productos(){
    const [productos ,setProductos] = useState([]);
    const [productosFiltrado, setProductosFiltrado] = useState([]);
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
            setProductosFiltrado(response.data);
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
                setProductosFiltrado(productos=> [...productos, NuevoProducto])
                setMarca("");
                setMascota("");
                SetEdad("");
                setKilo("");
                setPrecio("");
                setCategoriaProducto("");
                toast.success("Producto agregado ", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "light",
                    transition: Bounce,
                });
            })
            .catch(err => console.log(err))
        }
    }

    const resetProductos = () => {
        setCategoriaProducto("")
        setKilo("")
        setMarca("")
        setMascota("")
        setPrecio("")
        SetEdad("")
    }


    const deleteProductos = (id) => {
        axios.delete(`${serverFront}/delete-productos/` + id )
        .then(response => {
            setProductos(productos.filter((producto) => producto._id !== id))
            toast.error(
                `Se elimino producto `,
                {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                }
            )
        })
        .catch(err => console.log(err))
    }

    const filtrarProductos = (palabrasClave) => {
        setProductosFiltrado(productos.filter(producto => {
            return palabrasClave.every(palabra => 
                producto.marca.toLowerCase().includes(palabra) ||
                producto.edad.toLowerCase().includes(palabra) ||
                producto.mascota.toLowerCase().includes(palabra) ||
                producto.kilo.toLowerCase().includes(palabra) ||
                producto.categoria.toLowerCase().includes(palabra) ||
                producto.precio.toString().includes(palabra) 
            );
        }));
    }

    const [editingId, setEditingId] = useState(null); 
    const [editingData, setEditingData] = useState({
        marca: '',
        mascota: '',
        edad: '',
        kilo: '',
        precio: '',
    });

    const startEditing = (producto) => {
        setEditingId(producto._id);
        setEditingData({
            marca:producto.marca,
            mascota:producto.mascota,
            edad:producto.edad,
            precio:producto.precio,
            kilo:producto.kilo,
        })
    }

    const cancelEditing = () => {
        setEditingId(null);
        setEditingData({
            marca: '',
            mascota: '',
            edad: '',
            kilo: '',
            precio: '',
        })
    }

    const saveChanges = (id) => {
        console.log(`Saving changes for product ID: ${id}`);
        axios.patch(`${serverFront}/edit-productos/${id}`, editingData)
            .then(response => {
                setProductos(productos.map(producto => producto._id === id ? response.data : producto));
                setProductosFiltrado(productosFiltrado.map(producto => producto._id === id ? response.data : producto));
                cancelEditing();
                toast.success("Producto actualizado ", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "light",
                    transition: Bounce,
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    


    return(
        <div className="productos-container">
            <h1> Lista Oficial </h1>

            <div className="inputs-ventas">

                <select 
                    type="text" 
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
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

                <select 
                    type="text"
                    onChange={(e => setMascota(e.target.value))}
                    value={mascota} 
                >
                    <option value=""> Seleccionar Mascota </option>
                    <option value="Perro"> Perro </option>
                    <option value="Gato"> Gato </option>
                </select>

                <select type="text" value={edad} onChange={(e => SetEdad(e.target.value))} >
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

                <input 
                        type="number" 
                        placeholder="Ingresar Unidad " 
                        value={kilo}
                        onChange={(e => setKilo(e.target.value))}
                />
                <input 
                        type="number" 
                        placeholder="Ingresar Precio" 
                        value={precio}
                        onChange={(e => setPrecio(e.target.value))}
                />
                    
                <select type="text" value={categoriaProducto} onChange={e => setCategoriaProducto(e.target.value)}>
                    <option value=""> Seleccionar Categoria </option>
                    <option value="Alimento"> Alimento </option>
                    <option value="Accesorio"> Accesorio </option>
                    <option value="Indumentaria"> Indumentaria </option>
                    <option value="Humedo"> Humedo </option>
                    <option value="Snack"> Snack </option>
                    <option value="Pipeta"> Pipeta </option>
                    <option value="Higiene"> Higiene </option>
                    <option value="Hueso"> Hueso </option>
                </select>

            </div>

            <div className='botones'>
                <button className="agregar" onClick={addProductos} > Agregar </button>
                <button className='limpiar' onClick={resetProductos} > Limpiar </button>  
            </div>

            <Buscador placeholder= "Buscar productos" filtrarDatos={filtrarProductos} />
            <FiltrosProductos productos={productos} setProductosFiltrados={setProductosFiltrado}/>

            <div className="productos">
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Marca</th>
                                <th>Tamaño</th>
                                <th>Mascota</th>
                                <th>Kg</th>
                                <th>Precio</th>
                                <th></th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {productosFiltrado.map((element,index) => 
                                <tr key={index}>
                                    <td>{editingId === element._id ?
                                        <input value={editingData.marca} onChange={(e) => setEditingData({...editingData, marca: e.target.value })}/> : element.marca}</td>

                                   
                                    <td>{editingId === element._id ?
                                        <input value={editingData.edad} onChange={(e) => setEditingData({...editingData, edad: e.target.value })}/> :element.edad}</td>
                                    
                                    <td>{editingId === element._id ?
                                        <input value={editingData.mascota} onChange={(e) => setEditingData({...editingData, mascota: e.target.value })}/> :element.mascota}</td>

                                    <td>{editingId === element._id ?
                                        <input value={editingData.kilo} onChange={(e) => setEditingData({...editingData, kilo: e.target.value })}/> :element.kilo}</td>

                                    <td>${editingId === element._id ?
                                        <input value={editingData.precio} onChange={(e) => setEditingData({...editingData, precio: e.target.value })}/> :element.precio}</td>

                                    <div className="actions"> 
                                    <button className="trash" onClick={() => deleteProductos(element._id, element.proveedor, element.monto)}><i className="fa-solid fa-trash"></i></button>

                                                {editingId === element._id ? (
                                    <div  className='btn-edit'>
                                        <button className="check" onClick={() => saveChanges(element._id)}><i className="fa-solid fa-check"></i></button>
                                        <button className="cancel" onClick={cancelEditing}><i className="fa-solid fa-ban"></i></button>
                                    </div>
                                        ) : (
                                            <button className="edit" onClick={() => startEditing(element)}><i className="fa-solid fa-gear"></i></button>
                                        )}
                                    
                                </div>

                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}