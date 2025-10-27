
import { useEffect, useState } from "react";
import "../../styles/ventas.css"
import { Buscador } from '../../components/buscador/buscador';
import { Filtros } from '../../components/hooks/filtros/filtros';
import 'react-toastify/dist/ReactToastify.css';
import {config} from "../../components/config/index"
import { ScrollTop } from '../../components/others/scrollTop';
import { toast, Toaster } from 'react-hot-toast';
import axios from "axios";
import useSound from 'use-sound'
import cash from '../../assets/cash.mp3'
import ok from '../../assets/ok.mp3'
import { ClipLoader } from "react-spinners";
import { keyframes } from "@emotion/react";
import { Notificacion } from "../../components/others/notificacion/notificacion";
import { debounce, IconButton, Tooltip } from "@mui/material";
import TodayIcon from '@mui/icons-material/Today';
import UndoIcon from '@mui/icons-material/Undo';
import React from "react";
import ReactPaginate from 'react-paginate';
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";



 export function Ventas() {
    const [ventas, setVentas] = useState([]);
    const [ventasFiltradas, setVentasFiltradas] = useState([]);
    const [newDay, setDay] = useState(""); // Ingreso de dia
    const [newMonth, setMonth] = useState(""); // Ingreso de mes
    const [newTp, setTp] = useState(""); // Tipo de pago 
    const [newProduct, setProducto] = useState(""); // Ingreso de producto
    const [newTotal, setTotal] = useState(""); // Ingreso de monto
    const [newBoleta, setBoleta] = useState(""); // Ingreso de boleta 
    const [newYear,setNewYear] = useState('')
    const [play] = useSound(cash)
    const [play2] = useSound(ok)
    const [loading, setLoading] = useState(true)
   
    const fadeInOut = keyframes`
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  `;

  const serverFront = config.Api


    useEffect(() => {
        axios.get(`${serverFront}/ventas`)
            .then(response => {
                setTimeout(() => {
                    setVentas(response.data);
                    setVentasFiltradas(response.data);
                    setLoading(false);
                },1000)
            })
            .catch(err => {
                console.log(err);
            setLoading(false)});
    }, []);

    const addVentas = () => {
        if (newTotal.trim() && newDay.trim() && newMonth.trim() && newYear.trim() && newProduct.trim() && newBoleta.trim() && newTp.trim() !== "") {
            axios.post(`${serverFront}/add-ventas`, {
                day: newDay,
                month: newMonth,
                year: newYear,
                tp: newTp,
                product: newProduct,
                total: newTotal,
                boleta: newBoleta
            })
            .then(response => {
                const nuevaVenta = response.data;
                setVentas(ventas => [...ventas, nuevaVenta]);
                setVentasFiltradas(ventas => [...ventas, nuevaVenta]);
                setTotal("");
                setMonth("");
                setNewYear("")
                setDay("");
                setProducto("");
                setTp("");
                setBoleta(""); // Resetear el campo boleta
                play()
                toast.success(`Se agrego ${newProduct} $${newTotal}`);
            })
            .catch(err => console.log(err));
        }
    };

    const handleAddVentas = debounce(() => {
        addVentas();
    }, 100);


    const deleteVentas = (id, product, total) => {
        axios.delete(`${serverFront}/delete-ventas/${id}`)
        .then(() => {
            const updatedVentas = ventas.filter((venta) => venta._id !== id);
            setVentas(updatedVentas);
            setVentasFiltradas(updatedVentas)
            toast.success(`Se elimino ${product} $${total}`);
        })
        .catch(err => console.log(err));
    };

    const resetVentas = () => {
        setDay("");
        setMonth("");
        setNewYear("")
        setProducto("");
        setTp("");
        setTotal("");
        setBoleta(""); // Resetear el campo boleta
    };


    const [palabrasClave, setPalabrasClave] = useState([])

    const filtrarVentas = (palabrasClave) => {
        setPalabrasClave(palabrasClave)
        setVentasFiltradas(ventas.filter(venta => {
            return palabrasClave.every(palabra => 
                venta.day.toLowerCase().includes(palabra) ||
                venta.month.toLowerCase().includes(palabra) ||
                (venta.boleta || '').toLowerCase().includes(palabra) ||
                venta.tp.toLowerCase().includes(palabra) ||
                venta.product.toLowerCase().includes(palabra) ||
                venta.total.toString().includes(palabra)
            );
        }));
    };


    // Condicion de pago cliente 
    const condicionPago = (tp) => {
        return tp && tp.toLowerCase() === 'debe' ? 'rgba(218, 8, 25, 0.4)' : null;
    }

    // Total de monto 
    const totalMonto = (ventas) => {
        let monto = 0;

        ventas.forEach(product => {
            if(product.tp && product.tp.toLowerCase() === 'debe'){
                monto == product.tp
            } else {
                monto += product.total
            }
        });

        return monto.toLocaleString('en-US');

    }

 
      // Editar gastos
      const [editId, setEditId] = useState(null);
      const [editingId, setEditingId] = useState({
          day: '',
          month: '',
          year:'',
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
              year:venta.year,
              tp:venta.tp,
              product:venta.product,
              total:venta.total,
              boleta:venta.boleta,
          });
      }
      const cancelEdit = () => {
          setEditId(null);
          setEditingId({
              day: '',
              month: '',
              year:'',
              tp:'',
              product: '',
              total:'',
              boleta: ''
          });
      }

      const saveEdit = (id) => {
        toast.promise(
            axios.patch(`${serverFront}/edit-ventas/${id}`, editingId)
            .then(response => {
                const updateVentas = ventas.map(venta => venta._id === id ? response.data : venta); 
                setVentas(updateVentas);
                setVentasFiltradas(ventas.filter(venta => {
                    return palabrasClave.every(palabra => 
                        venta.day.toLowerCase().includes(palabra) ||
                        venta.month.toLowerCase().includes(palabra) ||
                        (venta.boleta || '').toLowerCase().includes(palabra) ||
                        venta.tp.toLowerCase().includes(palabra) ||
                        venta.product.toLowerCase().includes(palabra) ||
                        venta.total.toString().includes(palabra)
                    );
                }));
                cancelEdit();
                play2()
            })
            .catch(err => console.log(err)),

            {
                loading: 'Guardando...',
                success: <b>Producto guardado!</b>,
                error: <b>No se pudo guardar.</b>,
            }

        )
      }

      const ultimaIngresadaVenta = (ventas) => {
        if (ventas.length === 0) {
            return 'No hay ventas ingresadas'
        } else {
            const ultimaVenta = ventas[ventas.length - 1];
            return `${ultimaVenta.day} de ${ultimaVenta.month} ${ultimaVenta.product} $${ultimaVenta.total} `
        }
      }

      // Actualizar fecha

    const fechaHoy = () => {
        const hoy = new Date();
        setDay(String(hoy.getDate()))
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        setMonth(meses[hoy.getMonth()])
        setNewYear(String(hoy.getFullYear()))
      }

    const fechaAyer = () => {
        const ayer = new Date();
        ayer.setDate(ayer.getDate() - 1)
        setDay(String(ayer.getDate()))
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        setMonth(meses[ayer.getMonth()])
        setNewYear(String(ayer.getFullYear()))
      }

      const [order,setOrder] = useState(true)

      const diaOrden = () => {
        const diaFilter = [...ventasFiltradas].sort((a,b) => {
            const dia1 = parseInt(a.day)
            const dia2 = parseInt(b.day)

            return order ? dia1 - dia2 : dia2 - dia1
        })
        setVentasFiltradas(diaFilter)
        setOrder(!order)
      }

      const [currentPage,setCurrentPage] = useState(0)
      const [itemPerPage, setItemsPerPage] = useState(12)

      const pageCount = Math.ceil(ventasFiltradas.length / itemPerPage )
      const offset = currentPage * itemPerPage
      const currentItems = ventasFiltradas.slice(offset, offset + itemPerPage)



    return (
        <div className="venta-container">
            <h1>Ingresos de ventas</h1>


            <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                <Tooltip title="Fecha de ayer" arrow>
                    <button
                        onClick={fechaAyer}
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
                        <UndoIcon sx={{ color: '#111' }} />
                    </button>
                </Tooltip>

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
                        <TodayIcon sx={{ color: '#111' }} />
                    </button>
                </Tooltip>
            </div>


            <div className='inputs-ventas' > 
      
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
                        onChange={(event => setNewYear(event.target.value))}
                        value={newYear}
                    >
                        <option value="">Seleccionar Año</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                    </select>
              

                <select
                    onChange={(event) => setTp(event.target.value)}
                    value={newTp}
                >
                    <option value=""> Seleccionar tipo de pago </option>
                    <option value="Visa Débito" > Visa Débito </option>
                    <option value="Visa PrePago"> Visa PrePago </option>
                    <option value="Naranja Débito"> Naranja Débito</option>
                    <option value="Cabal Débito"> Cabal Débito </option>
                    <option value="Master Débito"> Master Débito </option>
                    <option value="Naranja Débito"> Naranja Débito</option>
                    <option value="Visa Crédito">Visa Crédito </option>
                    <option value="Master Crédito">Master Crédito</option>
                    <option value="Naranja Crédito"> Naranja Crédito </option>
                    <option value="Qr">Qr</option>
                    <option value="Debe"> Debe </option>
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
                <button className="agregar" onClick={handleAddVentas}> Agregar </button>
                <button className='limpiar' onClick={resetVentas}> Limpiar </button>  
            </div>



            
            <Buscador placeholder="Buscar ventas" filtrarDatos={filtrarVentas} />

            
            <Filtros ventas={ventas} setVentasFiltradas={setVentasFiltradas}/>

            <div className="totales">
                <tr > <td>Ultima venta: {ultimaIngresadaVenta(ventasFiltradas)}</td></tr>
                <tr className='total'>
                    <td> Total: ${totalMonto(ventasFiltradas)}</td>
                </tr>
            </div>
           

        
            
            <div className="productos">
                <div className='table-responsive'>
                    <table>
                        <thead>
                            <tr>
                                <th> Día 
                                    <IconButton onClick={diaOrden}  size="small" sx={{ color: "rgb(245, 243, 239)" }}>
                                        {order ? <ArrowDownward/> : <ArrowUpward/>}
                                    </IconButton>    
                                </th>
                                <th> Mes </th>
                                <th> Año </th>
                                <th> Forma de Pago </th>
                                <th> Número de Cupo </th>
                                <th> Descripción </th>
                                <th> Importe </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (

                                  <tr>
                                  <td colSpan="8" style={{ textAlign: "center" }}>
                                      <ClipLoader color={"#36D7B7"} size={50} />
                                      <p style={{ color: "#36D7B7", animation: `${fadeInOut} 1s infinite` }}>
                                          Cargando ventas...
                                      </p>
                                  </td>
                                </tr>
                
                            ) : (
                                currentItems.map((element, index) => (
                                    <React.Fragment key={index}>
                             
                                    <tr style={{ background: condicionPago(element.tp || '') }}>

                                        <td>{element.day}</td>

                                        <td>{element.month}</td>

                                         <td>{element.year}</td>

                                        <td>{element.tp}</td>

                                        <td className="texto-notas">{element.boleta}</td>

                                        <td className="texto-notas">{element.product}</td>
                                            
                                        <td className='monto'>${element.total}</td>

                                        <td className="actions">
                                            <button className="trash" onClick={() => deleteVentas(element._id, element.product, element.total)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                            
                                            {editId === element._id ? (
                                           null
                                            ) : (
                                                <button className="edit" onClick={() => editing(element)}>
                                                    <i className="fa-solid fa-gear"></i>
                                                </button>
                                            )}
                                        </td>
                                    </tr>

                                    {editId === element._id && (
                                        <tr className="edit-row">
                                            <td>
                                                <select value={editingId.day} onChange={(e) => setEditingId({...editingId, day: e.target.value})}>
                                                    <option value=""> Seleccionar Día</option>
                                                        {[...Array(31)].map((_,index) => (
                                                            <option key={index + 1} value={index + 1}> {index + 1} </option>
                                                        ))}
                                                </select>
                                            </td>

                                            <td>
                                         
                                                <select value={editingId.month} onChange={(e) => setEditingId({ ...editingId, month: e.target.value })}>
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
                                            
                                            </td>

                                            <td>
                                                <select value={editingId.year} onChange={(e) => setEditingId({ ...editingId, year: e.target.value })}>
                                                    <option value="">Seleccionar Año</option>
                                                    <option value="2024">2024</option>
                                                    <option value="2025">2025</option>
                                                    <option value="2026">2026</option>
                                                </select>
                                            </td>

                                            <td>
                                                <select
                                                onChange={(event) => setEditingId({...editingId, tp: event.target.value})}
                                                value={editingId.tp}
                                                >
                                                <option value=""> Seleccionar tipo de pago </option>
                                                <option value="Visa Débito" > Visa Débito </option>
                                                <option value="Visa PrePago"> Visa PrePago </option>
                                                <option value="Naranja Débito"> Naranja Débito</option>
                                                <option value="Cabal Débito"> Cabal Débito </option>
                                                <option value="Master Débito"> Master Débito </option>
                                                <option value="Naranja Débito"> Naranja Débito</option>
                                                <option value="Visa Crédito">Visa Crédito </option>
                                                <option value="Master Crédito">Master Crédito</option>
                                                <option value="Naranja Crédito"> Naranja Crédito </option>
                                                <option value="Debe"> Debe </option>
                                                <option value="Efectivo">Efectivo</option>
                                                <option value="Mercado Pago">Mercado Pago</option>
                                            </select>
                                        </td>

                                        <td>
                                            <input value={editingId.boleta} onChange={(e) => setEditingId({ ...editingId, boleta: e.target.value })} />                                             
                                        </td>

                                        <td>
                                            <input value={editingId.product} onChange={(e) => setEditingId({ ...editingId, product: e.target.value })} />
                                        </td>

                                        <td>
                                            <input value={editingId.total} onChange={(e) => setEditingId({ ...editingId, total: e.target.value })} />
                                        </td>
                                        
                                        <td className="actions">
                                            <div className='btn-edit'>
                                                <button className="check" onClick={() => saveEdit(element._id)}>
                                                    <i className="fa-solid fa-check"></i>
                                                </button>
                                                <button className="cancel" onClick={cancelEdit}>
                                                    <i className="fa-solid fa-ban"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    )}
                              
                                </React.Fragment>

                                )))}
                        </tbody>
                        <tfoot>
                            <tr className='total'>
                                <td>Total</td>
                                <td colSpan="5"></td>
                                <td>${totalMonto(ventasFiltradas)}</td>
                                <td></td>
                            </tr>

                            
                        </tfoot>
    

                    </table>

                    
                    <Notificacion/>
                    <Toaster />
                    <ScrollTop />
     
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

        </div>
    );
}


  
                                        