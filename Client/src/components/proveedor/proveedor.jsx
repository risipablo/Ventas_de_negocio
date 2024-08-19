import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button, Collapse } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { TransitionGroup } from 'react-transition-group';
import { Buscador } from "../buscador/buscador";
import axios from "axios";
import { CarritoContext } from "../carrito/carritoContext";
import { ToastContainer,toast,Bounce } from "react-toastify";
import { ScrollTop } from "../others/scrollTop";
// import { FiltroProveedor } from "./filtroProveedor";


// const serverFront = "http://localhost:5000";
const serverFront = 'https://server-ventas.onrender.com'

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

    const { agregarAlCarrito } = useContext(CarritoContext)

    useEffect(() => {
        axios.get(`${serverFront}/proveedors`)
            .then(response => {
                setProducts(response.data);
                setProveedorFiltrado(response.data);
            })
            .catch(err => console.error(err));
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
                    toast.success("Producto agregado ", {
                        position: "top-center",
                        autoClose: 2000,
                        closeOnClick: true,
                        pauseOnHover: false,
                        theme: "light",
                        transition: Bounce,
                    });
                })
                .catch(err => console.error(err));
        }
    };

    const deleteProveedors = (id) =>{
        axios.delete(`${serverFront}/delete-proveedors/` + id)
        .then(response => {
            setProducts(products.filter((product) => product._id !== id));
            setProveedorFiltrado(products.filter((product) => product._id !== id))
            toast.error('Producto eliminado', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
        })
        .catch(err => console.log(err))
    }

    
    const filtrarProveedores = (palabrasClave) => {
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
        toast.success(
            ` Se agrego ${producto.marcas} ${producto.mascotas} ${producto.kilos} $${producto.precios} `, 
            {
            position: "top-center",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: false,
            theme: "light",
            transition: Bounce,
        });
        agregarAlCarrito(producto)

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
        axios.patch(`${serverFront}/edit-proveedors/${id}`, editingData)
        .then(response => {
            setProducts(products.map(product => product._id === id ? response.data : product));
            setProveedorFiltrado(proveedorFiltrado.map(product => product._id === id ? response.data : product));
            cancelEditing();
            toast.success(
                ` Cambios guardados `, 
                {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "light",
                transition: Bounce,
            });
        })
        .catch(err => {
            console.log(err);
        });
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
                        <div className="inputs-ventas">
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

            <Buscador placeholder="Buscar productos" filtrarDatos={filtrarProveedores} />

            {/* <FiltroProveedor products={products} setProovedorFiltrado={setProveedorFiltrado} /> */}

            <div className="productos">
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
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
                            {proveedorFiltrado.map((element, index) =>
                                <tr key={index}>
                                    <td>{element.proveedores}</td>
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
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
    
            <ToastContainer/>
            <ScrollTop/>
        </div>
    );
}
