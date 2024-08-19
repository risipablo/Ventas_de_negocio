import axios from "axios";
import { useEffect, useState } from "react";
import "../ventas/ventas.css"



// const serverFront = 'http://localhost:5000'
const serverFront = 'https://server-ventas.onrender.com'

export function Ingresos() {

    const [venta, setVenta] = useState([]);
    const [newDia, setDia] = useState(""); 
    const [newMes, setMes] = useState(""); 
    const [newTp, setTp] = useState(""); 
    const [newProduct, setProducto] = useState(""); 
    const [newTotal, setTotal] = useState(""); 
    const [newBoleta, setBoleta] = useState(""); 

    useEffect(() => {
        axios.get(`${serverFront}/ingreso`)
            .then(response => {
                setVenta(response.data);
            })
            .catch(err => console.error(err));
    }, []);

    const addVentas = () => {
        if (newTotal.trim() && newDia.trim() && newMes.trim() && newProduct.trim() && newBoleta.trim() && newTp.trim() !== "") {
            axios.post(`${serverFront}/add-ingreso`, {
                day: newDia,
                month: newMes,
                tp: newTp,
                boleta: newBoleta,
                producto: newProduct,
                total: newTotal
            })
            .then(response => {
                const nuevaVenta = response.data;
                setVenta(ventas => [...ventas, nuevaVenta]);
                setBoleta('');
                setDia('');
                setMes('');
                setProducto('');
                setTotal('');
                setTp('');
            })
            .catch(err => console.error(err));
        } else {
            console.error("Por favor, complete todos los campos.");
        }
    }

    return (
        <div className="venta-container">
            <h1>Ingresos local</h1>

            <div className="inputs-ventas">
                <select 
                    onChange={(event) => setDia(event.target.value)}
                    value={newDia}
                >
                    <option value="">Seleccionar Día</option>
                    {[...Array(31)].map((_, index) => (
                        <option key={index + 1} value={index + 1}> {index + 1} </option>
                    ))}
                </select>

                <select
                    onChange={(event) => setMes(event.target.value)}
                    value={newMes}
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
                    <option value="">Seleccionar tipo de pago</option>
                    <option value="Visa Débito">Visa Débito</option>
                    <option value="Visa PrePago">Visa PrePago</option>
                    <option value="Naranja Débito">Naranja Débito</option>
                    <option value="Cabal Débito">Cabal Débito</option>
                    <option value="Master Débito">Master Débito</option>
                    <option value="Visa Crédito">Visa Crédito</option>
                    <option value="Master Crédito">Master Crédito</option>
                    <option value="Naranja Crédito">Naranja Crédito</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Mercado Pago">Mercado Pago</option>
                </select>

                <input 
                    type="text"
                    placeholder='Ingresar número de cupo'
                    onChange={(event) => setBoleta(event.target.value)}
                    value={newBoleta}
                />
                   
                <input 
                    type="text"
                    placeholder="Ingresar producto" 
                    onChange={(event) => setProducto(event.target.value)}
                    value={newProduct}
                />

                <input 
                    type="number" 
                    placeholder="Ingresar importe"             
                    onChange={(event) => setTotal(event.target.value)}
                    value={newTotal}
                />

                <div className='botones'>
                    <button className="agregar" onClick={addVentas}>Agregar</button>
                    <button className='limpiar' onClick={() => {
                        setBoleta('');
                        setDia('');
                        setMes('');
                        setProducto('');
                        setTotal('');
                        setTp('');
                    }}>Limpiar</button>  
                </div>
            </div>

            <div className="productos">
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Día</th>
                                <th>Mes</th>
                                <th>Forma de Pago</th>
                                <th>Número de Cupo</th>
                                <th>Descripción</th>
                                <th>Importe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {venta.map((element, index) => 
                                <tr key={element._id || index}>
                                    <td>{element.day}</td>
                                    <td>{element.month}</td>
                                    <td>{element.tp}</td>
                                    <td>{element.boleta}</td>
                                    <td>{element.product}</td>
                                    <td>{element.total}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}