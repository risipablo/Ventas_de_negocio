
import React, { useEffect, useState } from "react"
import "../../styles/gastos.css"
import axios from "axios"
import { FiltrosGastos } from "../../components/hooks/filtros/filtrosGastos";
import { Buscador } from "../../components/buscador/buscador";
import { Helmet } from 'react-helmet';
import {ScrollTop} from '../../components/others/scrollTop'
import { toast, Toaster } from 'react-hot-toast';
import useSound from 'use-sound'
import digital from "../../assets/digital.mp3"
import ok from "../../assets/ok.mp3"
import { Skeleton, Tooltip } from "@mui/material";
import { config } from "../../components/config";
import { Today } from "@mui/icons-material";
import ReactPaginate from "react-paginate";


// const serverFront = 'http://localhost:3001'
const serverFront = config.Api


export function Gastos(){
    const[gastos,setGastos] = useState([]);
    const[gastosFiltrados, setGastosFiltrados] = useState([])
    const[proveedor,setProveedor] = useState('')
    const[dia,setDia] = useState('')
    const[mes,setMes] = useState('')
    const[factura,setFactura] = useState('')
    const[monto,setMonto] = useState('')
    const[estado,setEstado] = useState('')
    const [año,setAño] = useState('')
    const [play] = useSound(digital)
    const [play2] = useSound(ok)
    const [loading,setLoading] = useState(true)



    useEffect(() => {
        axios.get(`${serverFront}/gastos`)
        .then(response => {
            setTimeout(() => {
                setGastos(response.data)
                setGastosFiltrados(response.data)
                setLoading(false)    
            },1000)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    },[])




    const addGastos = () => {
        if(proveedor.trim() && dia.trim() && mes.trim() && año.trim() && factura.trim() && monto.trim() && estado.trim() !== "" ) {
            axios.post(`${serverFront}/add-gastos`, {
                proveedor:proveedor,
                dia:dia,
                mes:mes,
                año:año,
                factura:factura,
                monto: monto, 
                estado:estado
            })
            .then(response => {
                const nuevoGasto = response.data;
                setGastos([...gastos, nuevoGasto]);
                setGastosFiltrados([...gastos, nuevoGasto]);
                setProveedor("");
                setDia("");
                setEstado('');
                setFactura('');
                setMes('');
                setAño('')
                setMonto('');
                toast.success(`Se agrego ${proveedor} $${monto}`);
                play()
            })
            .catch(err => console.log(err))
        }
    }

    const resertGastos = () => {
        setDia('')
        setEstado('')
        setFactura('')
        setMes('')
        setAño('')
        setMonto('')
        setProveedor('')
    }

    const deleteGastos = (id, proveedor, monto) => {
        axios.delete(`${serverFront}/delete-gastos/` + id)
        .then(response => {
            setGastos(gastos.filter((gasto) => gasto._id !== id))
            setGastosFiltrados(gastosFiltrados.filter((gasto) => gasto._id !== id))
            toast.error(`Se elimino ${proveedor} $${monto} correctamente `);
        })
        .catch( err => console.log(err));
    }

    const [palabrasClave, setPalabrasClave] = useState([])

    const filtrarGastos = (palabrasClave) => {
        setPalabrasClave(palabrasClave)
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
            total += products.monto
        });

        return total.toLocaleString('en-US');
    }



    // Estados para edicion
    const [editingId, setEditingId] = useState(null); 
    const [editingData, setEditingData] = useState({
        proveedor: '',
        dia: '',
        mes: '',
        año:'',
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
            año: gasto.año,
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
            año: '',
            factura: '',
            monto: '',
            estado: ''
        });
    };

    // Guardar cambios
    const saveChanges = (id) => {
        toast.promise(
            axios.patch(`${serverFront}/edit-gastos/${id}`, editingData)
            .then(response => {
                const updateGastos = gastos.map(gasto => gasto._id === id ? response.data : gasto)
                setGastos(updateGastos);
                setGastosFiltrados(updateGastos.filter(gasto => {
                    return palabrasClave.every(palabra => 
                        gasto.proveedor.toLowerCase().includes(palabra) ||
                        gasto.dia.toLowerCase().includes(palabra) ||
                        gasto.mes.toLowerCase().includes(palabra) ||
                        gasto.factura.toLowerCase().includes(palabra) ||
                        gasto.estado.toLowerCase().includes(palabra) || 
                        gasto.monto.toString().includes(palabra) 
                    );
                }));
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
    };

    const lastGasto = (gastos) => {
        if (gastos.length === 0) {
            return 'No hay registro del ultimo gasto'
        } else {
            const ultimoGasto = gastos[gastos.length - 1]
            return `${ultimoGasto.proveedor}  $${ultimoGasto.monto} ${ultimoGasto.estado}`
        }
    }


    const fechaHoy = () => {
        const hoy = new Date()
        setDia(String(hoy.getDate()))
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        setMes(meses[hoy.getMonth()])
        setAño(String(hoy.getFullYear()))
    }

    const [currentPage,setCurrentPage] = useState(0)
    const [itemPerPage, setItemsPerPage] = useState(12)

    const pageCount = Math.ceil(gastosFiltrados.length / itemPerPage )
    const offset = currentPage * itemPerPage
    const currentItems = gastosFiltrados.slice(offset, offset + itemPerPage)
    

    return(
        <div className="gastos-container">
            
            <Helmet>
                <title> Gastos</title>
            </Helmet>

            <h1>Gastos Mensuales</h1>

                <Tooltip title="Fecha de hoy" arrow>
                    <button
                        onClick={fechaHoy}
                        style={{
                        background: 'rgba(255,255,255,0.85)',
                        border: '2px solid #222',
                        borderRadius: '8px',
                        padding: '6px 10px',
                        cursor: 'pointer',
                        transition: 'box-shadow 0.2s, border-color 0.2s'
                        }}
                        onMouseOver={e => {
                        e.currentTarget.style.boxShadow = '0 0 10px #222';
                        e.currentTarget.style.borderColor = '#3c82f6';
                        }}
                        onMouseOut={e => {
                        e.currentTarget.style.boxShadow = '';
                        e.currentTarget.style.borderColor = '#222';
                        }}
                    >
                        <Today sx={{ color: '#111' }} />
                    </button>
                </Tooltip>

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
                    <option value="Arenza">Arenza</option>
                    <option value="Conurbano Distribucion">Conurbano Distribucion</option>
                    <option value="PPF">PPF</option>
                    <option value="Indumentaria">Indumentaria</option>
                    <option value="Huesos">Huesos</option>
                    <option value="Distribuidora Star">Distribuidora Star</option>
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

                <select
                        onChange={(event => setAño(event.target.value))}
                        value={año}
                    >
                        <option value="">Seleccionar Año</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
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

            <div className="totales">
                <tr > <td>Ultimo gasto: {lastGasto(gastosFiltrados)}</td></tr>
                <tr className='total'>
                    <td> Total: ${totalMonto(gastosFiltrados)}</td>
                </tr>
            </div>

            <div className="productos">
                <div className='table-responsive'>
                    <table>
                        <thead>
                            <tr>
                                <th>Proveedor</th>
                                <th>Dia</th>
                                <th>Mes</th>
                                <th>Año</th>
                                <th>Factura</th>
                                <th>Monto</th>
                                <th>Estado</th>
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
                                currentItems.map((element, index) => (
                                    <React.Fragment key={index}>

                                    <tr>
                                        
                                        <td>{element.proveedor}</td>
                                        
                                        <td>{element.dia}</td>
                                        
                                        <td>{element.mes}</td>
                                        
                                        <td>{element.año}</td>
                                        
                                        <td>{element.factura}</td>

                                        <td className='monto'>${element.monto}</td>
                                        
                                        <td style={{ background: condicionEstado(element.estado || '') }}>{ element.estado}</td>
                                        
                                        <td className="actions">
                                            <button className="trash" onClick={() => deleteGastos(element._id, element.proveedor, element.monto)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                            {editingId === element._id ? (
                                              null
                                            ) : (
                                                <button className="edit" onClick={() => startEditing(element)}>
                                                    <i className="fa-solid fa-gear"></i>
                                                </button>
                                            )}
                                        </td>
                                    </tr>

                                    {editingId === element._id && (
                                        <tr className="edit-row">
                                            <td>
                                                <select 
                                                    value={editingData.proveedor}
                                                    onChange={(event) => setEditingData({ ...editingData, proveedor: event.target.value })}
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
                                                    <option value="Arenza">Arenza</option>
                                                    <option value="Conurbano Distribucion">Conurbano Distribucion</option>
                                                    <option value="PPF">PPF</option>
                                                    <option value="Indumentaria">Indumentaria</option>
                                                    <option value="Otros">Otros</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select 
                                                    value={editingData.dia}
                                                    onChange={(event) => setEditingData({ ...editingData, dia: event.target.value })}
                                                >
                                                    <option value="">Elegir Día</option>
                                                    {[...Array(31)].map((_,index) => (
                                                        <option key={ index + 1 } value={ index + 1 }>{ index + 1 }</option>
                                                    ))}
                                                </select>
                                            </td>

                                            <td>
                                                <select 
                                                    value={editingData.mes}
                                                    onChange={(event) => setEditingData({ ...editingData, mes: event.target.value })}
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
                                            </td>
                                            <td>
                                                <select 
                                                    value={editingData.año}
                                                    onChange={(event) => setEditingData({ ...editingData, año: event.target.value })}
                                                >
                                                    <option value="">Seleccionar Año</option>
                                                    <option value="2024">2024</option>
                                                    <option value="2025">2025</option>
                                                    <option value="2026">2026</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={editingData.factura}
                                                    onChange={(event) => setEditingData({ ...editingData, factura: event.target.value })}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={editingData.monto}
                                                    onChange={(event) => setEditingData({ ...editingData, monto: event.target.value })}
                                                />
                                            </td>
                                            <td>
                                                <select 
                                                    value={editingData.estado}
                                                    onChange={(event) => setEditingData({ ...editingData, estado: event.target.value })}
                                                >
                                                    <option value="">Seleccionar Estado</option>
                                                    <option value="Pagado">Pagado</option>
                                                    <option value="Impago">Impago</option>
                                                </select>
                                            </td>
                                            <td className="actions">
                                                <div className='btn-edit'>
                                                    <button className="check" onClick={() => saveChanges(element._id)}>
                                                        <i className="fa-solid fa-check"></i>
                                                    </button>
                                                    <button className="cancel" onClick={cancelEditing}>
                                                        <i className="fa-solid fa-ban"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                </React.Fragment>
                                ))
                            )}
                        </tbody>
                        
                        <tfoot>
                            <tr className='total'>
                                <td>Total </td>
                                <td colSpan="4"> </td>
                                <td> ${totalMonto(gastosFiltrados)}</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                {
                    pageCount > 1 && (
                        <ReactPaginate
                        previousLabel="Anterior"
                        nextLabel="Siguiente"
                        pageCount={pageCount}
                        onPageChange={({ selected }) => setCurrentPage(selected)}
                        containerClassName="pagination"
                        activeClassName="active"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item previous"
                        previousLinkClassName="page-link"
                        nextClassName="page-item next"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item break"
                        breakLinkClassName="page-link"
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        />
                    )
                }
            </div>
            <Toaster/>
            <ScrollTop/>
        </div>
    )
}