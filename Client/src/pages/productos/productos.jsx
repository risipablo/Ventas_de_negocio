import React, { useEffect, useMemo, useState } from "react";
import { Buscador } from "../../components/buscador/buscador";
import axios from "axios";
import { FiltrosProductos } from "../../components/hooks/filtros/FiltroProductos";
import { Helmet } from 'react-helmet';
import { ScrollTop } from '../../components/others/scrollTop';
import { Button, Collapse, Skeleton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { TransitionGroup } from 'react-transition-group'
import { toast, Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong, faDownLong } from "@fortawesome/free-solid-svg-icons";
import useSound from 'use-sound'
import digital from "../../assets/digital.mp3"
import ok from "../../assets/ok.mp3"
import { Debounce } from "../../components/others/debounce/debounce";
import { Recordatorio } from "../../components/recordatorios/recordatorios";


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
    const [toogleCheck, setToogleCheck] = useState(null)
    const [play] = useSound(digital)
    const [play2] = useSound(ok)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        axios.get(`${serverFront}/productos`)
            .then(response => {
                setTimeout(() => {
                    setProductos(response.data);
                    setProductosFiltrado(response.data);
                    setLoading(false)
                },1000)
            })
            .catch(err => {console.log(err)
                setLoading(false)
            })
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
                    play();
                })
                .catch(err => console.log(err))

        }
    }

    const handleAddProductos = useMemo(() => Debounce(addProductos,100), [addProductos])

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

    // Eliminar varias tareas
    const [selectedTasks, setSelectedTasks] = useState([])

    const handleChange = (id) => {
        setSelectedTasks((prev) => prev.includes(id) ? prev.filter(prodId => prodId !== id): [...prev,id])
    }

    const deletedManyProducts = (ids) => {
        axios.delete(`${serverFront}/delete-many-productos/`, {data:{ids}})
        .then(response => {
            setProductos(producto => producto.filter(prod => !ids.includes(prod._id)))
            setProductosFiltrado(productosFiltrado.filter(prod => !ids.includes(prod._id)))
            toast.error(`${response.data.message}`, {
                position: 'top-center',
            });
        })
        .catch(err => console.error("Error deleting tasks:", err));
    }

    const cleanManyProductos = () => {
        setSelectedTasks("")
    }

    const [palabrasClave, setPalabrasClaves] = useState([])

    const filtrarProductos = (palabrasClave) => {
        setPalabrasClaves(palabrasClave)
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
                    const uptadteProductos = productos.map(producto => producto._id === id ? response.data : producto)
                    setProductos(uptadteProductos);
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
                    cancelEditing();
                    play2()
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

  
    const [ordenar,setOrdenar] = useState(true)

    const funcionOrdenar = () => {
        const productosOrdenados = [...productosFiltrado].sort((a,b) => ordenar ? a.marca.localeCompare(b.marca) : b.marca.localeCompare(a.marca))
        setProductosFiltrado(productosOrdenados)
        setOrdenar(!ordenar)
    }

    const promoCondicion = (condicion) => {
        return condicion.toLowerCase() === 'efectivo/débito' ? 'rgba(238, 217, 62, 0.8)' : null || condicion.toLowerCase() === 'efectivo' ? 'rgba(238, 217, 62, 0.8)' : null || condicion.toLowerCase() === 'no actualizado' ? 'rgba(230, 48, 31, 0.8)' : null 
    }


    const ordenarPrecio = () => {
        const productosOrdenados = [...productosFiltrado].sort((a,b) => ordenar ? a.precio - b.precio : b.precio - a.precio)
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
                        <div className="inputs-productos">
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
                                    <option value="No Actualizado"> No Actualizado </option>
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
                            <button className="agregar" onClick={handleAddProductos} > Agregar </button>
                            <button className='limpiar' onClick={resetProductos} > Limpiar </button>
                        </div>
                    </Collapse>
                )}
            </TransitionGroup>

            {selectedTasks.length > 0 && (
                <div className="container-manyproducts">
                    <button className="delete-many" onClick={() => deletedManyProducts(selectedTasks)}>
                        <i class="fa-solid fa-trash"></i>
                    </button>

                    <button className="broom" onClick={() => cleanManyProductos(selectedTasks)}>
                        <i class="fa-solid fa-broom"></i>
                    </button>
                </div>


               
            )}
 

            <Buscador placeholder="Buscar productos" filtrarDatos={filtrarProductos} />
            
            <FiltrosProductos productos={productos} setProductosFiltrados={setProductosFiltrado} />
            
            <div className="productos">
                
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th className="checkbox"></th>
                                <th> Marca 
                                    <button onClick={funcionOrdenar} className="ordenar">
                                <i>
                                    {ordenar ? <FontAwesomeIcon icon={faUpLong} /> : <FontAwesomeIcon icon={faDownLong} />}
                                </i>
                                </button></th>
                                <th>Tamaño</th>
                                <th>Mascota</th>
                                <th className="promo">Promo</th>
                                
                                <th>Kg</th>
                                <th>Precio 
                                <button onClick={ordenarPrecio} className="ordenar">
                                <i>
                                    {ordenar ? <FontAwesomeIcon icon={faUpLong} /> : <FontAwesomeIcon icon={faDownLong} />}
                                </i>
                                </button>
                                </th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                             
                                   
                                    [...Array(8)].map((_, index) => (
                                        <tr key={index}  >
                                            
                                            <td><Skeleton variant="text" width={80} animation="wave" /></td>
                                            <td><Skeleton variant="text" width={80} animation="wave" /></td>
                                            <td><Skeleton variant="text" width={80} animation="wave" /></td>
                                            <td><Skeleton variant="text" width={80} animation="wave" /></td>
                                            <td><Skeleton variant="text" width={80} animation="wave" /></td>
                                            <td><Skeleton variant="text" width={80} animation="wave" /></td>
                                            <td><Skeleton variant="text" width={80} animation="wave" /></td>
                                            <td><Skeleton variant="text" width={80} animation="wave" /></td>
                                        </tr>
                                    ))
                                

                            ) : (
                                productosFiltrado.map((element, index) => (
                                    <React.Fragment key={index}>
                                    
                                    <tr 
                                        style={{ background: promoCondicion(element.condicion || '')}}
                                        onClick={() => setToogleCheck(toogleCheck === element._id ? null:element._id)}
                                    >

                                        <td> 
                                            {(toogleCheck === element._id || selectedTasks.includes(element._id)) && (

                                                <input type="checkbox" checked={selectedTasks.includes(element._id)} onChange={() => handleChange(element._id)} /> 
                                            )}
                                            
                                        </td>
                                        
                                        <td>{element.marca}</td>

                                        <td>{element.edad}</td>
                                        
                                        <td>{element.mascota}</td>

                                        <td className="promo">{element.condicion}</td>

                                        <td>{element.kilo}</td>

                                        <td className='monto'>${element.precio.toLocaleString('en-US')}</td>

                                        <td className="actions">
                                            <button className="trash" onClick={() => deleteProductos(element._id, element.proveedor, element.monto)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>

                                            {editingId === element._id ? (
                                             null
                                            ) : (
                                                <button className="edit" onClick={() => startEditing(element)}><i className="fa-solid fa-gear"></i></button>
                                            )}

                                        </td>
                                    </tr>

                                    {editingId === element._id && (
                                        <tr className="edit-row">
                                            <td></td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={editingData.marca}
                                                    onChange={(e) => setEditingData({ ...editingData, marca: e.target.value })}
                                                />
                                            </td>

                                            <td>
                                                <input
                                                    type="text"
                                                    value={editingData.edad}
                                                    onChange={(e) => setEditingData({ ...editingData, edad: e.target.value })}
                                                />
                                            </td>

                                            <td>
                                                <select
                                                    type="text"
                                                    value={editingData.mascota}
                                                    onChange={(e) => setEditingData({ ...editingData, mascota: e.target.value })}
                                                >
                                                    <option value=""> Seleccionar Mascota </option>
                                                    <option value="Perro"> Perro </option>
                                                    <option value="Gato"> Gato </option>
                                                    <option value="Mixto"> Mixto </option>
                                                </select>
                                            </td>

                                            <td>
                                                <select
                                                    type="text"
                                                    value={editingData.condicion}
                                                    onChange={(e) => setEditingData({ ...editingData, condicion: e.target.value })}
                                                >
                                                    <option value=""> Seleccionar Condición </option>
                                                    <option value="-"> Ninguno </option>
                                                    <option value="Efectivo/Débito"> Efectivo/Débito </option>
                                                    <option value="Efectivo"> Efectivo </option>
                                                    <option value="No Actualizado"> No Actualizado </option>
                                                </select>
                                            </td>

                                            <td>
                                                <input
                                                    type="number"
                                                    value={editingData.kilo}
                                                    onChange={(e) => setEditingData({ ...editingData, kilo: e.target.value })}
                                                />
                                            </td>

                                            <td>
                                                <input
                                                    type="number"
                                                    value={editingData.precio}
                                                    onChange={(e) => setEditingData({ ...editingData, precio: e.target.value })}
                                                />
                                            </td>

                                            <td className="actions"> 
                                                <div className='btn-edit'>
                                                    <button className="check" onClick={() => saveChanges(element._id)}><i className="fa-solid fa-check"></i></button>
                                                    <button className="cancel" onClick={cancelEditing}><i className="fa-solid fa-ban"></i></button>
                                                </div>
                                            </td>

                                        </tr>
                                        )}

                                    </React.Fragment>
                                ))
                            )}
                        </tbody>

                    </table>

                </div>
            </div>
            <ScrollTop />
            <Recordatorio/>
            <Toaster/>
        </div>
    )
}
