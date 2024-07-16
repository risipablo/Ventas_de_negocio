
import { useEffect, useState } from "react"
import "./gastos.css"
import axios from "axios";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import { FiltrosGastos } from "./filtrosGastos";
import { Buscador } from "../buscador/buscador";
import { Helmet } from 'react-helmet';
import {ScrollTop} from '../others/scrollTop'


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

    const deleteGastos = (id,monto, proveedor) => {
        axios.delete(`${serverFront}/delete-gastos/` + id)
        .then(response => {
            setGastos(gastos.filter((gasto) => gasto._id !== id))
            toast.error(
                `Se elimino ${monto} $${proveedor}`,
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
        .catch( err => console.log(err));
    }

    const filtrarGastos = (palabrasClave) => {
        setGastosFiltrados(gastos.filter(gasto => {
            return palabrasClave.every(palabra => 
                gasto.proveedor.toLowerCase().includes(palabra) ||
                gasto.dia.toLowerCase().includes(palabra) ||
                gasto.mes.toLowerCase().includes(palabra) ||
                gasto.factura.toLowerCase().includes(palabra) ||
                gasto.estado.toLowerCase().includes(palabra) || 
                gasto.monto.toString().includes(palabra)
            );
        }));
    };

    const condicionEstado = (estado) => {
        return estado.toLowerCase() === 'pagado' ? 'rgba(64, 230, 67,0.8)' : 'rgba(218, 8, 25, 0.4)';
    }
    
    const totalMonto = (gastos) => {
        let total = 0;
        gastos.forEach(products => {
            if(products.estado.toLowerCase() === 'pagado')
            total += products.monto
        });

        return total;
    }




    // Estados para edicion
    const [editingId, setEditingId] = useState(null); 
    const [editingData, setEditingData] = useState({
        proveedor: '',
        dia: '',
        mes: '',
        factura: '',
        monto: '',
        estado: ''
    });

    // Edicion de datos
    const startEditing = (gasto) => {
        setEditingId(gasto._id);
        setEditingData({
            proveedor: gasto.proveedor,
            dia: gasto.dia,
            mes: gasto.mes,
            factura: gasto.factura,
            monto: gasto.monto,
            estado: gasto.estado
        });
    };
    
    // Cancelar cambios
    const cancelEditing = () => {
        setEditingId(null);
        setEditingData({
            proveedor: '',
            dia: '',
            mes: '',
            factura: '',
            monto: '',
            estado: ''
        });
    };

    // Guardar cambios
    const saveChanges = (id) => {
        axios.patch(`${serverFront}/edit-gastos/${id}`, editingData)
            .then(response => {
                setGastos(gastos.map(gasto => gasto._id === id ? response.data : gasto));
                setGastosFiltrados(gastosFiltrados.map(gasto => gasto._id === id ? response.data : gasto));
                cancelEditing();
                toast.success("Gasto actualizado ", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "light",
                    transition: Bounce,
                });
            })
            .catch(err => console.log(err));
    };



    return(
        <div className="gastos-container">
            
            <Helmet>
                <title> Gastos</title>
            </Helmet>

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



            <Buscador placeholder="Buscar gastos" filtrarDatos={filtrarGastos} />
            <FiltrosGastos gastos={gastos} setGastosFiltrados={setGastosFiltrados} />


            <div className="productos">
                <div className='table-responsive'>
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
                                <td>{editingId === element._id ?
                                    <input value={editingData.proveedor} onChange={(e) => setEditingData({ ...editingData, proveedor: e.target.value })} /> : element.proveedor}</td> 
                                
                                <td>{element.dia}</td> 
                                <td>{element.mes}</td> 
                                
                                <td> {editingId === element._id ? 
                                    <input value={editingData.factura} onChange={(e) => setEditingData({ ...editingData, factura: e.target.value })} /> : element.factura}</td> 
                                
                                <td className='monto'> ${editingId === element._id ? 
                                    <input value={editingData.monto} onChange={(e) => setEditingData({...editingData, monto: e.target.value})}/> : element.monto}</td>
                                
                                <td  style={{ background: condicionEstado(element.estado || '')}}>{editingId === element._id ?
                                <input value={editingData.estado} onChange={(e) => setEditingData({ ...editingData, estado: e.target.value })} /> : element.estado}</td>
                                
                                <div className="actions"> 
                                    <button className="trash" onClick={() => deleteGastos(element._id, element.proveedor, element.monto)}><i className="fa-solid fa-trash"></i></button>

                                                {editingId === element._id ? (
                                    <div  className='btn-edit'>
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
                        <tfoot>
                            <tr className='total'>
                                <td>Total </td>
                                <td colSpan="3"> </td>
                                <td> ${totalMonto(gastosFiltrados)}</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <ToastContainer/>
            </div>
            
            <ScrollTop/>
        </div>
    )
}