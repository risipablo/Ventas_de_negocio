import axios from 'axios';
import { useEffect, useState } from "react";
import "./ventas.css"
import { Buscador } from '../buscador/buscador';
import { Filtros } from './filtros';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const serverFront = "http://localhost:3001";
const serverFront = 'https://server-ventas.onrender.com'

export function Ventas() {
    const [ventas, setVentas] = useState([]);
    const [ventasFiltradas, setVentasFiltradas] = useState([]);
    const [newDay, setDay] = useState(""); // Ingreso de dia
    const [newMonth, setMonth] = useState(""); // Ingreso de mes
    const [newTp, setTp] = useState(""); // Tipo de pago 
    const [newProduct, setProducto] = useState(""); // Ingreso de producto
    const [newTotal, setTotal] = useState(""); // Ingreso de monto
    const [newBoleta, setBoleta] = useState(""); // Ingreso de boleta (no obligatorio)

    useEffect(() => {
        axios.get(`${serverFront}/ventas`)
            .then(response => {
                setVentas(response.data);
                setVentasFiltradas(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    const addVentas = () => {
        if (newTotal.trim() && newDay.trim() && newMonth.trim() && newProduct.trim() && newTp.trim() !== "") {
            axios.post(`${serverFront}/add-ventas`, {
                day: newDay,
                month: newMonth,
                tp: newTp,
                product: newProduct,
                total: newTotal,
                boleta: newBoleta // Añadir boleta a la solicitud
            })
            .then(response => {
                const nuevaVenta = response.data;
                setVentas(ventas => [...ventas, nuevaVenta]);
                setVentasFiltradas(ventas => [...ventas, nuevaVenta]);
                setTotal("");
                setMonth("");
                setDay("");
                setProducto("");
                setTp("");
                setBoleta(""); // Resetear el campo boleta
                toast.success(
                    ` Se agregó ${newProduct} $${newTotal}`,
                    {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "light"
                  });
            })
            .catch(err => console.log(err));
        }
    };

    const deleteVentas = (id, product, total) => {
        axios.delete(`${serverFront}/delete-ventas/` + id)
        .then(response => {
            setVentas(ventas.filter((venta) => venta._id !== id));
            setVentasFiltradas(ventas.filter((venta) => venta._id !== id));
            toast.error(
                `Se eliminó ${product} $${total}`,
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
        .catch(err => console.log(err));
    };

    const resetVentas = () => {
        setDay("");
        setMonth("");
        setProducto("");
        setTp("");
        setTotal("");
        setBoleta(""); // Resetear el campo boleta
    };

    const filtrarVentas = (palabrasClave) => {
        setVentasFiltradas(ventas.filter(venta => {
            return palabrasClave.every(palabra => 
                venta.day.toLowerCase().includes(palabra) ||
                venta.month.toLowerCase().includes(palabra) ||
                venta.tp.toLowerCase().includes(palabra) ||
                venta.product.toLowerCase().includes(palabra) ||
                venta.total.toString().includes(palabra)
            );
        }));
    };

    // Editar gastos
    const [editId, setEditId] = useState(null);
    const [editingId, setEditingId] = useState({
        day: '',
        month: '',
        tp:'',
        product: '',
        total:'',
        boleta: ''
    });

    const editing = (venta) => {
        setEditId(venta._id);
        setEditingId({
            day:venta.day,
            month:venta.month,
            tp:venta.tp,
            product:venta.product,
            total:venta.total,
            boleta:venta.boleta
        });
    }

    const cancelEdit = () => {
        setEditId(null);
        setEditingId({
            day: '',
            month: '',
            tp:'',
            product: '',
            total:'',
            boleta: ''
        });
    }

    const saveEdit = (id) => {
        axios.patch(`${serverFront}/edit-ventas/${id}`, editingId)
        .then(response => {
            setVentas(ventas.map(venta => venta._id === id ? response.data : venta));
            setVentasFiltradas(ventasFiltradas.map(venta => venta._id === id ? response.data : venta));
            cancelEdit();
            toast.success("Producto actualizado ", {
                position: "top-center",
                autoClose: 2000,
                theme: "light",
                transition: Bounce,
            });
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="venta-container">
            <h1>Ingresos de ventas</h1>

            <div className="inputs-ventas"> 

                <select type="text"
                    onChange={(event => setDay(event.target.value))}
                    value={newDay}
                >
                    <option value=""> Seleccionar Día</option>
                    {[...Array(31)].map((_,index) => (
                        <option key={index + 1} value={index + 1}> {index + 1} </option>
                    ))}
                </select>
                
                <select
                    onChange={(event => setMonth(event.target.value))}
                    value={newMonth}
                >
                    <option value="">Seleccionar Mes</option>
                    <option value="Enero">Enero</option>
                    <option value="Febrero">Febrero</option>
                    <option value="Marzo">Marzo</option>
                    <option value="Abril">Abril</option>
                    <option value="Mayo">Mayo</option>
                    <option value="Junio">Junio</option>
                    <option value="Julio">Julio</option>
                    <option value="Agosto">Agosto</option>
                    <option value="Septiembre">Septiembre</option>
                    <option value="Octubre">Octubre</option>
                    <option value="Noviembre">Noviembre</option>
                    <option value="Diciembre">Diciembre</option>
                </select>
                

                <select
                    onChange={(event) => setTp(event.target.value)}
                    value={newTp}
                >
                    <option value=""> Seleccionar tipo de pago </option>
                    <option value="Debito "> Visa Débito </option>
                    <option value="Debito "> Cabal Débito </option>
                    <option value="Debito "> Master Débito </option>
                    <option value="Debito"> Naranja Débito</option>
                    <option value="Credito ">Visa Crédito </option>
                    <option value="Credito ">Master Crédito </option>
                    <option value="Credito "> Naranja Crédito </option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Mercado Pago">Mercado Pago</option>
                </select>

                <input 
                    type="text"
                    placeholder='Ingresar número de cupo'
                    onChange={(event => setBoleta(event.target.value))}
                    value={newBoleta}
                />
                   
                
                <input type="text"
                    placeholder="Ingresar producto" 
                    onChange={(event => setProducto(event.target.value))}
                    value={newProduct}
                />

                <input type="number" 
                    placeholder="Ingresar importe"             
                    onChange={(event => setTotal(event.target.value))}
                    value={newTotal}
                />
 
            </div>

            <div className='botones'>
                <button className="agregar" onClick={addVentas}> Agregar </button>
                <button className='limpiar' onClick={resetVentas}> Limpiar </button>  
            </div>

            <Buscador placeholder="Buscar ventas" filtrarDatos={filtrarVentas} />
            <Filtros ventas={ventas} setVentasFiltradas={setVentasFiltradas}/>

            <div className="productos">
                <div className='table-responsive'>
                    <table>
                        <thead>
                            <tr>
                                <th> Día </th>
                                <th> Mes </th>
                                <th> Forma de Pago </th>
                                <th> Número de Cupo </th>
                                <th> Descripción </th>
                                <th> Importe </th>
                                <th ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventasFiltradas.map((element, index) => 
                            <tr key={index}>
                                <td>{element.day}</td>
                                <td>{element.month}</td>
                                <td>{editId === element._id ?
                                    <input value={editingId.tp} onChange={(e) => setEditingId({...editingId, tp: e.target.value})}/>  : element.tp}</td>
                                
                                <td>{editId === element._id ?
                                    <input value={editingId.boleta} onChange={(e) => setEditingId({...editingId, boleta: e.target.value })}/> : element.boleta}</td>

                                <td>{editId === element._id ?
                                    <input value={editingId.product} onChange={(e) => setEditingId({...editingId, product: e.target.value })}/> : element.product}</td>

                                <td>${editId === element._id ?
                                    <input value={editingId.total} onChange={(e) => setEditingId({...editingId, total: e.target.value})}/> : element.total}</td>

                                <div className="actions">
                                    <button className="trash" onClick={() => deleteVentas(element._id, element.product, element.total)}> <i className="fa-solid fa-trash"></i> </button>
                                    
                                    {editId === element._id ? (
                                    <div className='btn-edit'>
                                        <button className="check" onClick={() => saveEdit(element._id)}><i className="fa-solid fa-check"></i></button>
                                        <button className="cancel" onClick={cancelEdit}><i className="fa-solid fa-ban"></i></button>
                                    </div>
                                        ) : (
                                            <button className="edit" onClick={() => editing(element)}><i className="fa-solid fa-gear"></i></button>
                                        )}
                                </div>
                            </tr>
                            )}
                        </tbody>
                    </table>
                    <ToastContainer/>
                </div>
            </div>
        </div>
    );
}
