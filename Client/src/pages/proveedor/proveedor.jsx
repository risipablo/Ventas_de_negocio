import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button, Collapse, Skeleton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { TransitionGroup } from 'react-transition-group';
import { Buscador } from "../../components/buscador/buscador";
import axios from "axios";
import { toast, Toaster } from 'react-hot-toast';
import { CarritoContext } from "../../components/carrito/carritoContext";
import { ScrollTop } from "../../components/others/scrollTop";
import { FiltroProveedor } from "../../components/hooks/filtros/filtroProveedor";
import useSound from 'use-sound'
import digital from "../../assets/digital.mp3"
import ok from "../../assets/ok.mp3"



// const serverFront = "http://localhost:3001";
const serverFront = "https://ventas-de-negocio.onrender.com"

export function Proveedor() {
    const [showInputs, setShowInputs] = useState(true);
    const [products, setProducts] = useState([]);
    const [proveedorFiltrado, setProveedorFiltrado] = useState([]);
    const [newProveedor, setNewProveedor] = useState("");
    const [newMarca, setNewMarca] = useState("");
    const [newMascota, setNewMascota] = useState("");
    const [newEdad, setNewEdad] = useState("");
    const [newKilo, setNewKilo] = useState("");
    const [newPrecio, setNewPrecio] = useState("");
    const [play] = useSound(digital)
    const [play2] = useSound(ok)
    const [loading, setLoading] = useState(true)


    const { agregarAlCarrito } = useContext(CarritoContext)

    useEffect(() => {
        axios.get(`${serverFront}/proveedors`)
            .then(response => {
                setTimeout(() => {
                    setProducts(response.data);
                    setProveedorFiltrado(response.data);
                    setLoading(false)    
                })
                
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            });
    }, []);

    const addProductos = () => {
        if (newProveedor.trim() && newMarca.trim() && newEdad.trim() && newKilo.trim() && newPrecio.trim() && newMascota.trim() !== " ") {
            axios.post(`${serverFront}/add-proveedors`, {
                proveedores: newProveedor,
                marcas: newMarca,
                mascotas: newMascota,
                edades: newEdad,
                kilos: newKilo,
                precios: newPrecio,
            })
                .then(response => {
                    const nuevoProducto = response.data;
                    setProducts(productos => [...productos, nuevoProducto]);
                    setProveedorFiltrado(productos => [...productos, nuevoProducto]);
                    setNewKilo("");
                    setNewMarca("");
                    setNewPrecio("");
                    setNewProveedor("");
                    setNewEdad("");
                    setNewMascota("");
                    toast.success(`Se agrego ${newMarca}, ${newEdad} de ${newProveedor}`);
                    play()
                })
                .catch(err => console.error(err));
        }
    };

    const deleteProveedors = (id) =>{
        axios.delete(`${serverFront}/delete-proveedors/` + id)
        .then(response => {
            setProducts(products.filter((product) => product._id !== id));
            setProveedorFiltrado(products.filter((product) => product._id !== id))
            toast.error('Producto eliminado exitosamente!');
        })
        .catch(err => console.log(err))
    }


    const [palabrasClave, setPalabraClave] = useState([])
    const filtrarProveedores = (palabrasClave) => {
        setPalabraClave(palabrasClave)
        setProveedorFiltrado(products.filter(product => {
            return palabrasClave.every(palabra =>
                product.marcas.toLowerCase().includes(palabra)||
                product.precios.toString().includes(palabra)||
                product.proveedores.toLowerCase().includes(palabra)||
                product.edades.toLowerCase().includes(palabra)||
                product.kilos.toLowerCase().includes(palabra)||
                product.mascotas.toLowerCase().includes(palabra)
            );
        }));
    };

    const agregarProductoAlCarrito = (producto) => {
        toast.success(`Se agrego ${producto.marcas} ${producto.mascotas} ${producto.kilos} $${producto.precios}`);
        agregarAlCarrito(producto)
        play()

    };

 
    const [editingId, setEditingId] = useState(null);
    const [editingData, setEditingData] = useState({
        proveedores:'',
        marcas: '',
        mascotas: '',
        edades: '',
        kilos: '',
        precios: '',
    });


    const startEditing = (product) => {
        setEditingId(product._id);
        setEditingData({
            proveedores:product.proveedores,
            marcas:product.marcas,
            mascotas:product.mascotas,
            edades:product.edades,
            precios:product.precios,
            kilos:product.kilos,
            
        })
    }


    const cancelEditing = () => {
        setEditingId(null);
        setEditingData({
            marcas: '',
            mascotas: '',
            edades: '',
            kilos: '',
            precios: '',
            proveedores:''
        })
    }

    const saveChanges = (id) => {
        console.log(`cambios guardados: ${id}`)
        toast.promise(
            axios.patch(`${serverFront}/edit-proveedors/${id}`, editingData)
            .then(response => {
                setProducts(products.map(product => product._id === id ? response.data : product));
                setProveedorFiltrado(products.filter(product => {
                    return palabrasClave.every(palabra =>
                        product.marcas.toLowerCase().includes(palabra)||
                        product.precios.toString().includes(palabra)||
                        product.proveedores.toLowerCase().includes(palabra)||
                        product.edades.toLowerCase().includes(palabra)||
                        product.kilos.toLowerCase().includes(palabra)||
                        product.mascotas.toLowerCase().includes(palabra)
                    );
                }));;
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
        )

    }

    const [toogleCheck, setToogleCheck] = useState(null)
    const [selectedNotes, setSelectedNotes] = useState([])

    const handleChange = (id) => {
        setSelectedNotes((prev) => prev.includes(id) ? prev.filter(noteId => noteId !== !id):[...prev,id])
    }

    const deleteManyProveedores = (ids) => {
        axios.delete(`${serverFront}/delete-many-proveedores/`, {data:{ids}})
        .then(response => {
            setProducts(note => note.filter(not => !ids.includes(not._id)))
            setProveedorFiltrado(proveedorFiltrado.filter(not => !ids.includes(not._id)))
            toast.error(`${response.data.message}`, {
                position: 'top-center',
            });
        })
        .catch(err => console.error("Error deleting tasks:", err));
    }

    const cleanManyProductos = () => {
        setSelectedNotes("")
    }



    return (
        <div className="productos-container">
            <Helmet>
                <title>Proveedores</title>
            </Helmet>

            <h1>Lista Proveedores</h1>

            <Button
                onClick={() => setShowInputs(!showInputs)}
                startIcon={showInputs ? <ExpandLess /> : <ExpandMore />}
                sx={{ marginBottom: 2 }}
            >
                {showInputs ? '' : ''}
            </Button>

            <TransitionGroup>
                {showInputs && (
                    <Collapse>
                        <div className="inputs-productos">
                            <input
                                type="text"
                                placeholder="Ingresar Proveedor"
                                value={newProveedor}
                                onChange={(e) => setNewProveedor(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Ingresar Marca"
                                value={newMarca}
                                onChange={(e) => setNewMarca(e.target.value)}
                            />
                            <select
                                value={newMascota}
                                onChange={(e) => setNewMascota(e.target.value)}
                            >
                                <option value="">Seleccionar Mascota</option>
                                <option value="Perro">Perro</option>
                                <option value="Gato">Gato</option>
                                <option value="Mixto">Mixto</option>
                            </select>
                            <select
                                value={newEdad}
                                onChange={(e) => setNewEdad(e.target.value)}
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
                            <input
                                type="text"
                                placeholder="Ingresar Unidad"
                                value={newKilo}
                                onChange={(e) => setNewKilo(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Ingresar Precio"
                                value={newPrecio}
                                onChange={(e) => setNewPrecio(e.target.value)}
                            />
                        </div>
                        <div className="botones">
                            <button className="agregar" onClick={addProductos}>Agregar</button>
                            
                            <button className="limpiar" onClick={() => {
                                setNewProveedor("");
                                setNewMarca("");
                                setNewMascota("");
                                setNewEdad("");
                                setNewKilo("");
                                setNewPrecio("");
                            }}>Limpiar</button>
                        </div>
                    </Collapse>
                )}
            </TransitionGroup>

            {selectedNotes.length > 0 && (
                    <div className="container-manyproducts">
                        <button className="delete-many" onClick={() => deleteManyProveedores(selectedNotes)}>
                            <i class="fa-solid fa-trash"></i>
                        </button>

                        <button className="broom" onClick={() => cleanManyProductos(selectedNotes)}>
                            <i class="fa-solid fa-broom"></i>
                        </button>
                    </div>
                )}
 

            <Buscador placeholder="Buscar productos" filtrarDatos={filtrarProveedores} />
            <FiltroProveedor products={products} setProveedorFiltrado={setProveedorFiltrado}/>

            <div className="productos">
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th> </th>
                                <th>Proveedor</th>
                                <th>Marca</th>
                                <th>Mascota</th>
                                <th>Edad</th>
                                <th>Unidad</th>
                                <th>Precio</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(8)].map((_, index) => (
                                    <tr key={index}>
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
                                proveedorFiltrado.map((element, index) => (
                                    <tr key={index} onClick={() => setToogleCheck(toogleCheck === element._id ? null:element._id)}>
                                        
                                        <td> 
                                            {(toogleCheck === element._id || selectedNotes.includes(element._id)) && (
                                                <input type="checkbox" checked={selectedNotes.includes(element._id)} onChange={() => handleChange(element._id)} />
                                            )}
                                        </td>
                                        <td>{editingId === element._id ?
                                            <input value={editingData.proveedores} onChange={(e) => setEditingData({ ...editingData, proveedores: e.target.value })} /> : element.proveedores}</td>
                                        <td>{editingId === element._id ?
                                            <input value={editingData.marcas} onChange={(e) => setEditingData({ ...editingData, marcas: e.target.value })} /> : element.marcas}</td>
                                        <td>{editingId === element._id ?
                                            <input value={editingData.mascotas} onChange={(e) => setEditingData({ ...editingData, mascotas: e.target.value })} /> : element.mascotas}</td>
                                        <td>{editingId === element._id ?
                                            <input value={editingData.edades} onChange={(e) => setEditingData({ ...editingData, edades: e.target.value })} /> : element.edades}</td>
                                        <td>{editingId === element._id ?
                                            <input value={editingData.kilos} onChange={(e) => setEditingData({ ...editingData, kilos: e.target.value })} /> : element.kilos}</td>
                                        <td className="monto"> $ {editingId === element._id ? 
                                            <input value={editingData.precios} onChange={(e) => setEditingData({ ...editingData, precios: e.target.value })} /> : element.precios}</td>
                                        
                                        <td> <button className="agregar-prod" onClick={() => agregarProductoAlCarrito(element)}>Agregar</button> </td>
    
                                        <div className="actions">
                                        
                                            <button className="trash" onClick={() => deleteProveedors(element._id, element.proveedor, element.monto)}><i className="fa-solid fa-trash"></i></button>
    
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
                                ))
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
            <Toaster/>
            <ScrollTop/>
        </div>
    );
}
