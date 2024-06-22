
import { useEffect, useState } from "react"
import "./gastos.css"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { FiltrosGastos } from "./filtrosGastos";



// const serverFront = "http://localhost:3001";
const serverFront = 'https://server-ventas.onrender.com'



export function Gastos(){
    const[gastos,setGastos] = useState([]);
    const[gastosFiltrados, setGastosFiltrados] = useState([])
    const[proveedor,setProveedor] = useState('')
    const[dia,setDia] = useState('')
    const[mes,setMes] = useState('')
    const[factura,setFactura] = useState('')
    const[monto,setMonto] = useState('')
    const[estado,setEstado] = useState('')

    useEffect(() => {
        axios.get(`${serverFront}/gastos`)
          .then(response => 
            {
                setGastos(response.data);
                setGastosFiltrados(response.data);
            })
          .catch(err => console.log(err));
      }, []);


    const addGastos = () => {
        if(proveedor.trim() && dia.trim() && mes.trim() && factura.trim()  && monto.trim() && estado.trim() !=="" ) {
            axios.post(`${serverFront}/add-gastos`, {
                proveedor:proveedor,
                dia:dia,
                mes:mes,
                factura:factura,
                monto:monto,
                estado:estado
            })
            .then(response => {
                const nuevoGasto = response.data;
                setGastos(gastos => [...gastos,nuevoGasto]);
                setGastosFiltrados(gastos => [...gastos, nuevoGasto]);
                setProveedor("");
                setDia("");
                setEstado('');
                setFactura('');
                setMes('');
                setMonto('');
                toast.success(
                    ` Se agrego ${proveedor} $${monto}`,
                    {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "light"
                  });
            })
            .catch(err => console.log(err))
        }
    }

    const resertGastos = () => {
        setDia('')
        setEstado('')
        setFactura('')
        setMes('')
        setMonto('')
        setProveedor('')
    }

    const deleteGastos = (id) => {
        axios.delete(`${serverFront}/delete-gastos/` + id)
        .then(response => {
            setGastos(gastos.filter((gasto) => gasto._id !== id))
        })
        .catch( err => console.log(err));
    }

    // const filtrarGastos = (palabrasClave) => {
    //     setGastosFiltrados(gastos.filter(gasto => {
    //         return palabrasClave.every(palabra => 
    //             gasto.proveedor.toLowerCase().includes(palabra) ||
    //             gasto.dia.toLowerCase().includes(palabra) ||
    //             gasto.mes.toLowerCase().includes(palabra) ||
    //             gasto.factura.toLowerCase().includes(palabra) ||
    //             gasto.estado.toLowerCase().includes(palabra) || 
    //             gasto.total.toString().includes(palabra)
    //         );
    //     }));
    // };



    return(
        <div className="gastos-container">
            <h1>Gastos Mensuales</h1>

            <div className="inputs-gastos">

                <select
                    onChange={(event) => setProveedor(event.target.value)}
                    value={proveedor}
                >
                    <option value="">Elegir Proveedor</option>
                    <option value="Forastero">Forastero</option>
                    <option value="Chubutin">Chubutin</option>
                    <option value="Amadeo S.R.L">Amadeo</option>
                    <option value="Don Tomas">Don Tomas</option>
                    <option value="Nutripet">Nutripet</option>
                    <option value="Popy">Popy</option>
                    <option value="Nutrisur">Nutrisur</option>
                    <option value="Kro Line">Kro Line</option>
                    <option value="Mercaba">Mercaba</option>
                    <option value="Cancid">Cancid</option>
                    <option value="Indumentaria">Indumentaria</option>
                    <option value="Otros">Otros</option>
                </select>

                <select 
                    onChange={(event) => setDia(event.target.value)}
                    value={dia}
                 >
                    <option value="">Elegir Día</option>
                    {[...Array(31)].map((_,index) => (
                        <option key={ index + 1 } value={ index + 1 }>{ index + 1 }</option>
                    ))}
                </select>

                <select
                    onChange={(event) => setMes(event.target.value)}
                    value={mes}
                >
                    <option value="">Elegir Mes</option>
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

                <input
                    type="text"
                    placeholder="Ingresar número de boleta"
                    onChange={(event) => setFactura(event.target.value)}
                    value={factura}
                />

                <input
                    placeholder="Ingresar monto"
                    onChange={(event) => setMonto(event.target.value)}
                    value={monto}
                />

                <select 
                     onChange={(event) => setEstado(event.target.value)}
                     value={estado}
                >
                    <option value="">Seleccionar Estado</option>
                    <option value="Pagado">Pagado</option>
                    <option value="Impago">Impago</option>
                </select>

            </div>

            
            <div className='botones'>
                    <button className="agregar" onClick={addGastos}> Agregar </button>
                    <button className='limpiar' onClick={resertGastos}> Limpiar </button>  
            </div>

            <FiltrosGastos gastos={gastos} setGastosFiltrados={setGastosFiltrados}/>

            <div className="productos">
                <table>
                    <thead>
                        <tr>
                            <th>Proveedor</th>
                            <th>Dia</th>
                            <th>Mes</th>
                            <th>Factura</th>
                            <th>Monto</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {gastosFiltrados.map((element,index) =>
                        <tr key={index}>
                            <td>{element.proveedor}</td> 
                            <td>{element.dia}</td> 
                            <td>{element.mes}</td> 
                            <td>{element.factura}</td> 
                            <td>${element.monto}</td>
                            <td>{element.estado}</td> 
                            <div className="delete"> 
                                <button onClick={() => deleteGastos(element._id)}><i className="fa-solid fa-trash"></i></button>
                            </div>
                        </tr>
                        )}
                    </tbody>
                </table>
                <ToastContainer/>
            </div>

        </div>
    )
}