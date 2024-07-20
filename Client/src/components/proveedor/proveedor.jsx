import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button, Collapse } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { TransitionGroup } from 'react-transition-group';
import { Buscador } from "../buscador/buscador";
import axios from "axios";
import { CarritoContext } from "../carrito/carritoContext";


const serverFront = "http://localhost:3001";
// const serverFront = 'https://server-ventas.onrender.com'

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
                })
                .catch(err => console.error(err));
        }
    };

    
    const filtrarProveedores = (palabrasClave) => {
        setProveedorFiltrado(products.filter(product => {
            return palabrasClave.every(palabra =>
                product.marcas.toLowerCase().includes(palabra)
            );
        }));
    };

    const agregarProductoAlCarrito = (producto) => {
        agregarAlCarrito(producto);
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

            <div className="productos">
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
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
                                    <td>{element.marcas}</td>
                                    <td>{element.mascotas}</td>
                                    <td>{element.edades}</td>
                                    <td>{element.kilos}</td>
                                    <td>{element.precios}</td>
                                    <td> <button className="agregar-prod" onClick={() => agregarProductoAlCarrito(element)}>Agregar</button> </td>
                                    
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
            
        </div>
    );
}
