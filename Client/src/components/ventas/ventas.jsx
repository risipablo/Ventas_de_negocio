import axios from 'axios';
import { useEffect, useState } from "react";
import "./ventas.css"
import { Buscador } from './buscador';
import { Filtros } from './filtros';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  const serverFront = "http://localhost:3001";
    // const serverFront = 'https://server-ventas.onrender.com'


export function Ventas() {
    const [ventas, setVentas] = useState([]);
    const [ventasFiltradas, setVentasFiltradas] = useState([]);
    const [newDay, setDay] = useState(""); // Ingreso de dia
    const [newMonth, setMonth] = useState(""); // Ingreso de mes
    const [newTp, setTp] = useState(""); // Tipo de pago 
    const [newProduct, setProducto] = useState(""); // Ingreso de producto
    const [newTotal, setTotal] = useState(""); // Ingreso de monto

    
    useEffect(() => {
        axios.get(`${serverFront}/ventas`)
            .then(response => {
                setVentas(response.data);
                setVentasFiltradas(response.data);
            })
            .catch(err => console.log(err));
    }, [serverFront]);



    const addVentas = () => {
        if (newTotal.trim() && newDay.trim() && newMonth.trim() && newProduct.trim() && newTp.trim() !== "") {
            axios.post(`${serverFront}/add-ventas`, {
                day: newDay,
                month: newMonth,
                tp: newTp,
                product: newProduct,
                total: newTotal
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
                toast.success(
                    ` Se agrego ${newProduct} ${newTotal}`,
                    {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "light"
                  });
            })
            .catch(err => console.log(err));
        }
    };

    const deleteVentas = (id) => {
        axios.delete(`${serverFront}/delete-ventas/` + id)
        .then(response => {
            setVentas(ventas.filter((venta) => venta._id !== id));
            setVentasFiltradas(ventas.filter((venta) => venta._id !== id));
        })
        .catch(err => console.log(err));
    };

    const resetVentas = () => {
        setDay("");
        setMonth("");
        setProducto("");
        setTp("");
        setTotal("");
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

    


    return (
        <div className="venta-container">
            <h1>Ingresos de ventas</h1>

            <div className="inputs"> 

                <select type="text"
                    onChange={(event => setDay(event.target.value))}
                    value={newDay}
                >
                    <option value=""> Selecionar Dia</option>
                    {[...Array(31)].map((_,index) => (
                        <option key={index + 1} value={index + 1}> {index + 1} </option>
                    ))}
                </select>
                
                <select
                    onChange={(event => setMonth(event.target.value))}
                    value={newMonth}
                >
                    <option value="">Seleccionar Mes</option>
                    <option value="enero">Enero</option>
                    <option value="febrero">Febrero</option>
                    <option value="marzo">Marzo</option>
                    <option value="abril">Abril</option>
                    <option value="mayo">Mayo</option>
                    <option value="junio">Junio</option>
                    <option value="julio">Julio</option>
                    <option value="agosto">Agosto</option>
                    <option value="septiembre">Septiembre</option>
                    <option value="octubre">Octubre</option>
                    <option value="noviembre">Noviembre</option>
                    <option value="diciembre">Diciembre</option>
                </select>
                

                <select
                    onChange={(event) => setTp(event.target.value)}
                    value={newTp}
                >
                    <option value="">Seleccionar tipo de pago</option>
                    <option value="debito">Débito</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="credito">Crédito</option>
                    <option value="mercado pago">Mercado Pago</option>
                </select>

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

            <Buscador filtrarVentas={filtrarVentas} />
            <Filtros ventas={ventas} setVentasFiltradas={setVentasFiltradas}/>
   


            <div className="productos">
                <table>
                    <thead>
                        <tr>
                            <th> Dia </th>
                            <th> Mes </th>
                            <th> Forma de Pago </th>
                            <th> Descripción </th>
                            <th> Importe </th>
                            <th className='delets'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventasFiltradas.map((element, index) => 
                        <tr key={index}>
                            <td>{element.day}</td>
                            <td>{element.month}</td>
                            <td>{element.tp}</td>
                            <td>{element.product}</td>
                            <td>${element.total}</td>
                            <div className="delete">
                                <button onClick={() => deleteVentas(element._id)}> <i className="fa-solid fa-trash"></i> </button>
                            </div>
                        </tr>
                        )}
                    </tbody>
                </table>
                <ToastContainer
                    />
            </div>
        </div>
    );
}
