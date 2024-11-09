import { useEffect, useState } from "react";
import { Buscador } from "../buscador/buscador";
import axios from "axios";
import { FiltrosProductos } from "./FiltroProductos";
import { Helmet } from 'react-helmet';
import { ScrollTop } from '../others/scrollTop';
import { Button, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { TransitionGroup } from 'react-transition-group';
import { Notificacion } from "../others/notificacion";
import { toast, Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong, faDownLong } from "@fortawesome/free-solid-svg-icons";


// const serverFront = "http://localhost:3001"
const serverFront = 'https://ventas-de-negocio.onrender.com'

export function Productos() {
    const [productos, setProductos] = useState([]);
    const [productosFiltrado, setProductosFiltrado] = useState([]);
    const [marca, setMarca] = useState("");
    const [mascota, setMascota] = useState("");
    const [edad, SetEdad] = useState("");
    const [kilo, setKilo] = useState("");
    const [condicion,setCondicion] = useState("")
    const [precio, setPrecio] = useState("");
    const [categoriaProducto, setCategoriaProducto] = useState("");
    const [showInputs, setShowInputs] = useState(true);


    useEffect(() => {
        axios.get(`${serverFront}/productos`)
            .then(response => {
                setProductos(response.data);
                setProductosFiltrado(response.data);
            })
            .catch(err => console.log(err))
    }, [])

    const addProductos = () => {
        if (marca.trim() && mascota.trim() && edad.trim() && condicion.trim() && kilo.trim() && precio.trim() && categoriaProducto.trim() !== "") {
            axios.post(`${serverFront}/add-productos`, {
                marca: marca,
                mascota: mascota,
                edad: edad,
                kilo: kilo,
                condicion: condicion,
                precio: precio,
                categoria: categoriaProducto
            })
                .then(response => {
                    const NuevoProducto = response.data;
                    setProductos(productos => [...productos, NuevoProducto])
                    setProductosFiltrado(productos => [...productos, NuevoProducto])
                    setMarca("");
                    setMascota("");
                    SetEdad("");
                    setKilo("");
                    setCondicion("")
                    setPrecio("");
                    setCategoriaProducto("");
                    toast.success('Producto agregado exitosamente!');
                })
                .catch(err => console.log(err))

        }
    }

    const resetProductos = () => {
        setCategoriaProducto("")
        setKilo("")
        setCondicion("")
        setMarca("")
        setMascota("")
        setPrecio("")
        SetEdad("")
    }

    
    const deleteProductos = (id) => {
        axios.delete(`${serverFront}/delete-productos/` + id)
            .then(response => {
                setProductos(productos.filter((producto) => producto._id !== id));
                setProductosFiltrado(productosFiltrado.filter((producto) => producto._id !== id)); // Actualiza productosFiltrado
                toast.error('Producto eliminado exitosamente!');
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
        condicion: '',
        kilo: '',
        precio: '',
    });

    const startEditing = (producto) => {
        setEditingId(producto._id);
        setEditingData({
            marca: producto.marca,
            mascota: producto.mascota,
            edad: producto.edad,
            condicion: producto.condicion,
            precio: producto.precio,
            kilo: producto.kilo,
        })
    }

    const cancelEditing = () => {
        setEditingId(null);
        setEditingData({
            marca: '',
            mascota: '',
            edad: '',
            condicion: '',
            kilo: '',
            precio: '',
        })
    }

    const saveChanges = (id) => {
        toast.promise(
            axios.patch(`${serverFront}/edit-productos/${id}`, editingData)
                .then(response => {
                    setProductos(productos.map(producto => producto._id === id ? response.data : producto));
                    setProductosFiltrado(productosFiltrado.map(producto => producto._id === id ? response.data : producto));
                    cancelEditing();
                })
                .catch(err => {
                    console.log(err);
                }),
            {
                loading: 'Guardando...',
                success: <b>Producto guardado!</b>,
                error: <b>No se pudo guardar.</b>,
            }
        );
    };

    const promoCondicion = (condicion) => {
        return condicion.toLowerCase() === 'efectivo/débito' ? 'rgba(238, 217, 62, 0.8)' : null || condicion.toLowerCase() === 'efectivo' ? 'rgba(238, 217, 62, 0.8)' : null
    }

    const [ordenar,setOrdenar] = useState(true)

    const funcionOrdenar = () => {
        const productosOrdenados = [...productosFiltrado].sort((a,b) => ordenar ? a.marca.localeCompare(b.marca) : b.marca.localeCompare(a.marca))
        setProductosFiltrado(productosOrdenados)
        setOrdenar(!ordenar)
    }


    return (
        <div className="productos-container">

            <Helmet>
                <title>Productos</title>
            </Helmet>

            <h1> Lista Oficial </h1>

            <Button
                
                onClick={() => setShowInputs(!showInputs)}
                startIcon={showInputs ? <ExpandLess /> : <ExpandMore />}
                sx={{ marginBottom: 2 }}
            >
                {showInputs ? '' : '' } 
            </Button>
            
            <TransitionGroup>
                {!showInputs && (
                    <Collapse>
                        <div className="inputs-ventas">
                            <input
                                type="text"
                                placeholder="Ingresar Marca"
                                value={marca}
                                onChange={(e) => setMarca(e.target.value)}
                            />
                            <select
                                type="text"
                                onChange={(e => setMascota(e.target.value))}
                                value={mascota}
                            >
                                <option value=""> Seleccionar Mascota </option>
                                <option value="Perro"> Perro </option>
                                <option value="Gato"> Gato </option>
                                <option value="Mixto"> Mixto </option>
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
                            
                            <div className="unidad-condicion">
                                <input
                                    type="number"
                                    placeholder="Ingresar Unidad"
                                    value={kilo}
                                    onChange={(e) => setKilo(e.target.value)}
                                />

                                <select
                                  type="text"
                                  placeholder="Condición"
                                  value={condicion}
                                  onChange={(e) => setCondicion(e.target.value)}
                                >
                                    <option value=""> Seleccionar Condición </option>
                                    <option value="-"> Ninguno </option>
                                    <option value="Efectivo/Débito"> Efectivo/Débito </option>
                                    <option value="Efectivo"> Efectivo </option>
                                </select>
                            </div>
                            

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
                    </Collapse>
                )}
            </TransitionGroup>

  

            <Buscador placeholder="Buscar productos" filtrarDatos={filtrarProductos} />
            
            <FiltrosProductos productos={productos} setProductosFiltrados={setProductosFiltrado} />
            
            <div className="productos">
                
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th> Marca 
                                    <button onClick={funcionOrdenar} className="ordenar">
                                <i>
                                    {ordenar ? <FontAwesomeIcon icon={faUpLong} /> : <FontAwesomeIcon icon={faDownLong} />}
                                </i>
                                </button></th>
                                <th>Tamaño</th>
                                <th>Mascota</th>
                                <th>Promo</th>
                                <th>Kg</th>
                                <th>Precio</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {productosFiltrado.map((element, index) =>
                                <tr key={index} style={{ background: promoCondicion(element.condicion || '')}}>
                                    <td>{editingId === element._id ?
                                        <input value={editingData.marca} onChange={(e) => setEditingData({ ...editingData, marca: e.target.value })} /> : element.marca}</td>

                                    <td>{editingId === element._id ?
                                        <input value={editingData.edad} onChange={(e) => setEditingData({ ...editingData, edad: e.target.value })} /> : element.edad}</td>
                                    
                                    <td>{editingId === element._id ?
                                        <input value={editingData.mascota} onChange={(e) => setEditingData({ ...editingData, mascota: e.target.value })} /> : element.mascota}</td>

                                    <td>{editingId === element._id ?
                                        <input value={editingData.condicion} onChange={(e) => setEditingData({ ...editingData, condicion: e.target.value })} /> : element.condicion}</td>

                                    <td>{editingId === element._id ?
                                        <input value={editingData.kilo} onChange={(e) => setEditingData({ ...editingData, kilo: e.target.value })} /> : element.kilo}</td>

                                    <td className='monto'>${editingId === element._id ?
                                        <input value={editingData.precio} onChange={(e) => setEditingData({ ...editingData, precio: e.target.value })} /> : element.precio}</td>

                                    <div className="actions">
                                        <button className="trash" onClick={() => deleteProductos(element._id, element.proveedor, element.monto)}><i className="fa-solid fa-trash"></i></button>

                                        {editingId === element._id ? (
                                            <div className='btn-edit'>
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
            <ScrollTop />
            <Notificacion/>
            <Toaster/>
        </div>
    )
}
