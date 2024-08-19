import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper } from '@mui/material';
import { Delete, Settings, Save, Cancel } from '@mui/icons-material';
import { StockContext } from "./stockContext/stockContext";
import { toast, Bounce } from 'react-toastify';

const serverFront = 'https://server-ventas.onrender.com';
// const serverFront = 'http://localhost:5000'


export function Stock() {
    const [stock, setStock] = useState([]);
    const [brands, setBrands] = useState('');
    const [size, setSize] = useState('');
    const [pet, setPet] = useState('');
    const [newKg, setNewKg] = useState('');
    const [amount, setAmount] = useState('');
    const [condition, setCondition] = useState('');

    const { cantidadStock, restarStock, sumarStock } = useContext(StockContext);

    useEffect(() => {
        axios.get(`${serverFront}/stock`)
            .then(response => {
                console.log(response.data);
                setStock(response.data);
            })
            .catch(err => {
                console.error("Error al obtener stock:", err); 
            });
    }, []);

    const addStock = () => {
        if (brands.trim() && size.trim() && pet.trim() && newKg.trim() && amount.trim() && condition.trim() !== "") {
            axios.post(`${serverFront}/add-stock`, {
                brands: brands,
                size: size,
                pet: pet,
                kg: newKg,
                amount: amount,
                condition: condition,
            })
            .then(response => {
                const nuevoStock = response.data;
                setStock(stock => [...stock, nuevoStock]);
                clearFields();
            })
            .catch(err => console.log(err));
        }
    };

    const deleteStocks = (id) => {
        axios.delete(`${serverFront}/delete-stock/${id}`)
            .then(() => {
                setStock(stock.filter((stoc) => stoc._id !== id));
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
    };

    const condicionStock = (condition) => {
        return condition.toLowerCase() === 'sin stock' ? 'rgba(218, 8, 25, 0.4)' : null;
    };

    const [editingId, setEditingId] = useState(null); 
    const [editingData, setEditingData] = useState({
        brands: '',
        pet: '',
        size: '',
        kg: '',
        amount: '',
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
            condition: stock.condition
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
            condition: ''
        });
    };

    // Guardar cambios
    const saveChanges = (id) => {
        axios.patch(`${serverFront}/edit-stock/${id}`, editingData)
            .then(response => {
                setStock(stock.map(stoc => stoc._id === id ? response.data : stoc));
                cancelEditing();
                toast.success("Producto actualizado", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "light",
                    closeOnClick: true,
                    pauseOnHover: false,
                    transition: Bounce,
                });
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="productos-container">
            <Helmet>
                <title>Stock</title>
            </Helmet>
            <h1>Stock de Productos</h1>
            <div className="inputs-ventas">
                <input
                    type="text"
                    placeholder="Ingresar Producto"
                    value={brands}
                    onChange={(e) => setBrands(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Ingresar Tamaño"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                />
                <select value={pet} onChange={(e) => setPet(e.target.value)}>
                    <option value=""><em>Seleccionar Tipo</em></option>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Piedras">Piedras</option>
                </select>
                <input
                    type="text"
                    placeholder="Ingresar Kilos"
                    value={newKg}
                    onChange={(e) => setNewKg(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Ingresar Cantidad"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
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
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TableContainer component={Paper} sx={{ mt: 2, maxWidth: '95%' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Producto</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Tamaño</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Kilos</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Cantidad</TableCell>
                                <TableCell> </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Estado</TableCell>
                                <TableCell> </TableCell>
                                <TableCell> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stock.map((element, index) => (
                                <TableRow key={index} style={{ background: condicionStock(element.condition || '')}}>
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
                                            <input
                                                type="text"
                                                value={editingData.kg}
                                                onChange={(e) => setEditingData({ ...editingData, kg: e.target.value })}
                                            />
                                        ) : (
                                            element.kg
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' }, p: { xs: 0.5, sm: 1 }, textAlign: 'center' }}>
                                        {editingId === element._id ? (
                                            <input
                                                type="number"
                                                value={editingData.amount}
                                                onChange={(e) => setEditingData({ ...editingData, amount: e.target.value })}
                                            />
                                        ) : (
                                            element.amount
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => restarStock(index)}>
                                            -
                                        </IconButton>
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
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

