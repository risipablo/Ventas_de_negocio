import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, Button, Collapse, Skeleton } from '@mui/material';
import { Delete, Settings, Save, Cancel, ExpandLess, ExpandMore } from '@mui/icons-material';
import { TransitionGroup } from 'react-transition-group';
import { toast, Toaster } from 'react-hot-toast';
import { ScrollTop } from "../others/scrollTop";
import { Buscador } from "../buscador/buscador";
import useSound from 'use-sound'
import digital from "../../assets/digital.mp3"
import ok from "../../assets/ok.mp3"
import { Modal } from "../others/modal/modal";

// const serverFront = 'http://localhost:3001'
    const serverFront = 'https://ventas-de-negocio.onrender.com'


export function Stock() {
    const [stock, setStock] = useState([]);
    const [stockFiltrados, setStockFiltrados] = useState([]);
    const [brands, setBrands] = useState('');
    const [size, setSize] = useState('');
    const [pet, setPet] = useState('');
    const [newKg, setNewKg] = useState('');
    const [amount, setAmount] = useState('');
    const [estado, setEstado] = useState('');
    const [condition, setCondition] = useState('');
    const [showInputs, setShowInputs] = useState(true);
    const [palabraClave, setPalabraClave] = useState([])
    const [play] = useSound(digital)
    const [play2] = useSound(ok)
    const [loading, setLoading] = useState(true)




    useEffect(() => {
        axios.get(`${serverFront}/stock`)
            .then(response => {
                setAmount(() => {
                    console.log(response.data);
                    setStock(response.data);
                    setStockFiltrados(response.data)
                    setLoading(false)
                },1000)
            })
            .catch(err => {
                console.error("Error al obtener stock:", err); 
                setLoading(false)
            });
    }, []);

    const addStock = () => {
        if (brands.trim() && size.trim() && pet.trim() && newKg.trim() && amount.trim() && condition.trim() !== "" && estado.trim() !== "")  {
            axios.post(`${serverFront}/add-stock`, {
                brands: brands,
                size: size,
                pet: pet,
                kg: newKg,
                amount: amount,
                condition: condition,
                estado: estado,
            })
            .then(response => {
                const nuevoStock = response.data;
                setStock(stock => [...stock, nuevoStock]);
                setStockFiltrados(stock => [...stock,nuevoStock]);
                clearFields();
                toast.success(`Se agrego producto en el stock`);
                play()
            })
            .catch(err => console.log(err));
        }
    };

    const deleteStocks = (id) => {
        axios.delete(`${serverFront}/delete-stock/${id}`)
            .then(() => {
                setStock(stock.filter((stoc) => stoc._id !== id));
                setStockFiltrados(stock.filter((stoc) => stoc._id !== id));
                toast.error(`Se elimino producto en el stock`);
            })
            .catch(err => console.log(err));
    };

    const clearFields = () => {
        setBrands('');
        setSize('');
        setPet('');
        setNewKg('');
        setAmount('');
        setCondition('');
        setEstado('');
    };

    const FiltrarStock = (palabrasClave) => {
        setPalabraClave(palabrasClave)
        setStockFiltrados(stock.filter(stoc => {
            return palabrasClave.every(palabra => 
                stoc.brands.toLowerCase().includes(palabra) ||
                stoc.size.toLowerCase().includes(palabra) ||
                stoc.pet.toLowerCase().includes(palabra) ||
                stoc.kg.toLowerCase().includes(palabra) ||
                stoc.condition.toLowerCase().includes(palabra) ||
                stoc.estado.toLowerCase().includes(palabra)
            )
        }))
    }


    const condicionStock = (condition) => {
        return condition.toLowerCase() === 'sin stock' ? 'rgba(218, 8, 25, 0.4)' : null || condition.toLowerCase() === 'no vigente' ? 'rgba(150, 8, 8, 0.4)' : null
    }

    const [editingId, setEditingId] = useState(null); 
    const [editingData, setEditingData] = useState({
        brands: '',
        pet: '',
        size: '',
        kg: '',
        amount: '',
        estado: '',
        condition: ''
    });

    // Edición de datos
    const startEditing = (stock) => {
        setEditingId(stock._id);
        setEditingData({
            brands: stock.brands,
            pet: stock.pet,
            size: stock.size,
            kg: stock.kg,
            amount: stock.amount,
            condition: stock.condition,
            estado: stock.estado,
        });
    };
    
    // Cancelar edición
    const cancelEditing = () => {
        setEditingId(null);
        setEditingData({
            brands: '',
            pet: '',
            size: '',
            kg: '',
            amount: '',
            condition: '',
            estado: ''
        });
    };

    // Guardar cambios
    const saveChanges = (id) => {
        toast.promise(
            axios.patch(`${serverFront}/edit-stock/${id}`, editingData)
            .then(response => {
                const updatedStock = stock.map(stoc => stoc._id === id ? response.data : stoc);
                setStock(updatedStock);
                setStockFiltrados(updatedStock.filter(stoc => {
                    return palabraClave.every(palabra => 
                        stoc.brands.toLowerCase().includes(palabra) ||
                        stoc.size.toLowerCase().includes(palabra) ||
                        stoc.pet.toLowerCase().includes(palabra) ||
                        stoc.kg.toLowerCase().includes(palabra) ||
                        stoc.estado.toLowerCase().includes(palabra) ||
                        stoc.condition.toLowerCase().includes(palabra)
                    )
                }));
                cancelEditing();
                toast.success("Producto actualizado", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "light",
                    closeOnClick: true,
                    pauseOnHover: false,
                    transition: Bounce,
                });
                play2();
            })
            .catch(err => {console.log(err)}),
    
            {
                loading: 'Guardando...',
                success: <b>Producto guardado!</b>,
                error: <b>No se pudo guardar.</b>,
            }
        )
    };
    const [toogleCheck, setToogleCheck] = useState(null)
    const [selectedStock, setSelectedStock] = useState([])

    const handleChange = (id) => {
        setSelectedStock((prev) => prev.includes(id) ? prev.filter(stockId => stockId !== id):[...prev,id])
    }

    const deleteManyStock = (ids) => {
        axios.delete(`${serverFront}/delete-many-stocks/`,{data:{ids}})
        .then(response => {
            setStock(stock => stock.filter(stoc => !ids.includes(stoc._id)))
            setStockFiltrados(stockFiltrados.filter(stoc => !ids.includes(stoc._id)))
            toast.error(`${response.data.message}`, {
                position: 'top-center',
            });
            setSelectedStock([])
        })
        .catch(err => console.error("Error deleting tasks:", err));
    }

    const cleanManyProductos = () => {
        setSelectedStock("")
    }


    const [showModal,setShowModal] = useState(false)

    const deleteAllStock = () => {
        setShowModal(true)
    }

    const deleteAll = () => {
        axios.delete(`${serverFront}/deleteAll`)
        .then(response => {
            setStock([])
            setStockFiltrados([])
            setShowModal(false)
            toast.error('Todo el inventario ha sido eliminado', {
                position: 'top-center',
            });
            
        }).catch(err => {
            console.error(err);
            toast.error('Error al eliminar el inventario', {
                position: 'top-center',
            });
        });
    }



    return (
        <div className="productos-container">
            <Helmet>
                <title>Stock</title>
            </Helmet>
            
            <h1>Stock de Productos</h1>

            <Button
                
                onClick={() => setShowInputs(!showInputs)}
                startIcon={showInputs ? <ExpandLess /> : <ExpandMore />}
                sx={{ marginBottom: 2 }}
            >
                {showInputs ? '' : '' } 
            </Button>

            <TransitionGroup>
                {
                    !showInputs && (
                        <Collapse>
                        <div className="inputs-ventas">
                            <input
                                type="text"
                                placeholder="Ingresar Producto"
                                value={brands}
                                onChange={(e) => setBrands(e.target.value)}
                            />
                            <select
                                type="text"
                                placeholder="Ingresar Tamaño"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                            >
                                <option value=""><em>Seleccionar Tamaño</em></option>
                                <option value="Cachorro">Cachorro</option>
                                <option value="Mini Adulto">Mini Adulto</option>
                                <option value="Adulto">Adulto</option>
                                <option value="Senior">Senior</option>
                                <option value="Urinary">Urinary</option>
                                <option value="Hipoalergenico">Hipoalergenico</option>
                                <option value="Light">Light</option>
                                <option value="Lata">Lata</option>
                                <option value="Bolsitas">Bolsitas</option>


                            </select>

                            <select value={pet} onChange={(e) => setPet(e.target.value)}>
                                <option value=""><em>Seleccionar Tipo</em></option>
                                <option value="Perro">Perro</option>
                                <option value="Gato">Gato</option>
                                <option value="Piedras">Piedras</option>
                                <option value="Shampoo">Shampoo</option>
                                <option value="Indumentaria">Indumentaria</option>
                            </select>

                            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                                <option value=""><em>Seleccionar Estado</em></option>
                                <option value="Cerrado">Cerrado</option>
                                <option value="Suelto">Suelto</option>
                            </select>

                            <input
                                type="text"
                                placeholder="Ingresar Kilos"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Ingresar Cantidad"
                                value={newKg}
                                onChange={(e) => setNewKg(e.target.value)}
                            />
                            <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                                <option value=""><em>Seleccionar Estado</em></option>
                                <option value="Stock">Stock</option>
                                <option value="Sin Stock">Sin Stock</option>
                                <option value="No Vigente">No Vigente</option>
                            </select>
                        </div>

                            <div className='botones'>
                                <button className="agregar" onClick={addStock}>Agregar</button>
                                <button className='limpiar' onClick={clearFields}>Limpiar</button>
                            </div>

                        </Collapse>
                    )
                
                }

            </TransitionGroup>




            <Buscador placeholder="Buscar Productos" filtrarDatos={FiltrarStock} />

            {selectedStock.length > 0 && (
                <div className="container-manyproducts">
                    <button className="delete-many" onClick={() => deleteManyStock(selectedStock)}>
                        <i class="fa-solid fa-trash"></i>
                    </button>

                    <button className="broom" onClick={() => cleanManyProductos(selectedStock)}>
                        <i class="fa-solid fa-broom"></i>
                    </button>
                </div>
            )}

            <button onClick={deleteAllStock} className="deleteAll">Eliminar todo</button>
        

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TableContainer component={Paper} sx={{ mt: 2}}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}></TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Producto</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Tamaño</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Tipo</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Condición</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Kilos </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Cantidad</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Estado</TableCell>
                                <TableCell> </TableCell>
                                <TableCell> </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            { loading ? (
                                [...Array(8)].map((_,index) => (
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
                            
                            stockFiltrados.map((element, index) => (
                                <TableRow
                                 key={index} 
                                 style={{ background: condicionStock(element.condition || '')}}
                                 onClick={() => setToogleCheck(toogleCheck === element._id ? null:element._id)}
                                 >

                                <TableCell> 
                                    {(toogleCheck === element._id || selectedStock.includes(element._id)) && (
                                        <input type="checkbox" checked={selectedStock.includes(element._id)} onChange={() => handleChange(element._id)} />
                                    )}
                                </TableCell>

                                   
                                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' }, p: { xs: 0.5, sm: 1 }, textAlign: 'center' }}>
                                        {editingId === element._id ? (
                                            <input
                                                type="text"
                                                value={editingData.brands}
                                                onChange={(e) => setEditingData({ ...editingData, brands: e.target.value })}
                                            />
                                        ) : (
                                            element.brands
                                        )}
                                    </TableCell>


                                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' }, p: { xs: 0.5, sm: 1 }, textAlign: 'center' }}>
                                        {editingId === element._id ? (
                                            <input
                                                type="text"
                                                value={editingData.size}
                                                onChange={(e) => setEditingData({ ...editingData, size: e.target.value })}
                                            />
                                        ) : (
                                            element.size
                                        )}
                                    </TableCell>

                                     <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' }, p: { xs: 0.5, sm: 1 }, textAlign: 'center' }}>
                                        {editingId === element._id ? (
                                            <select
                                                value={editingData.pet}
                                                onChange={(e) => setEditingData({ ...editingData, pet: e.target.value })}
                                            >
                                                <option value="Perro">Perro</option>
                                                <option value="Gato">Gato</option>
                                                <option value="Piedras">Piedras</option>
                                                <option value="Shampoo">Shampoo</option>
                                                <option value="Indumentaria">Indumentaria</option>
                                            </select>
                                        ) : (
                                            element.pet
                                        )}
                                    </TableCell>

                                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' }, p: { xs: 0.5, sm: 1 }, textAlign: 'center' }}>
                                        {editingId === element._id ? (
                                            <input
                                                type="text"
                                                value={editingData.estado}
                                                onChange={(e) => setEditingData({ ...editingData, estado: e.target.value })}
                                            />
                                        ) : (
                                            element.estado
                                        )}
                                    </TableCell>


                                    
                                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' }, p: { xs: 0.5, sm: 1 }, textAlign: 'center' }}>
                                        {editingId === element._id ? (
                                            <select
                                                value={editingData.estado}
                                                onChange={(e) => setEditingData({ ...editingData, estado: e.target.value })}
                                            >
                                                <option value="Cerrado">Cerrado</option>
                                                <option value="Suelto">Suelto</option>
                                            </select>
                                        ) : (
                                            element.amount
                                        )}
                                    </TableCell>

                                    
                                   
                                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' }, p: { xs: 0.5, sm: 1 }, textAlign: 'center' }}>
                                        {editingId === element._id ? (
                                            <input
                                                type="number"
                                                value={editingData.kg}
                                                onChange={(e) => setEditingData({ ...editingData, kg: e.target.value })}
                                            />
                                        ) : (
                                            element.kg
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' }, p: { xs: 0.5, sm: 1 }, textAlign: 'center' }}>
                                        {editingId === element._id ? (
                                            <select
                                                value={editingData.condition}
                                                onChange={(e) => setEditingData({ ...editingData, condition: e.target.value })}
                                            >
                                                <option value="Stock">Stock</option>
                                                <option value="Sin Stock">Sin Stock</option>
                                                <option value="No Vigente">No Vigente</option>
                                            </select>
                                        ) : (
                                            element.condition
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' }, p: { xs: 0.5, sm: 1 } }}>
                                        {editingId === element._id ? (
                                            <>
                                                <IconButton onClick={() => saveChanges(element._id)}>
                                                    <Save />
                                                </IconButton>
                                                <IconButton onClick={cancelEditing}>
                                                    <Cancel />
                                                </IconButton>
                                            </>
                                        ) : (
                                            <IconButton onClick={() => startEditing(element)}>
                                                <Settings />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => deleteStocks(element._id)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Toaster/>
                
            </div>
            < Modal show={showModal} onClose={() => setShowModal(false)} onConfirm={deleteAll}/> 
            <ScrollTop/>
        </div>
    );
}

