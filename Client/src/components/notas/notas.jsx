import { Helmet } from "react-helmet";
import "../../styles/notas.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { Accordion, AccordionSummary, Skeleton} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ScrollTop } from "../others/scrollTop";
import { NotasContext } from "./notasContext/notasContext";
import { Buscador } from "../buscador/buscador";
import { toast, Toaster } from 'react-hot-toast';
import useSound from 'use-sound'
import digital from "../../assets/digital.mp3"
import ok from "../../assets/ok.mp3"
import { Modal } from "../others/modal/modal";
import React from "react";
import { config } from "../config/index";


const serverFront = config.Api



export function Notas() {
    const [notes, setNotes] = useState([]);
    const [notesFilter, setNotesFilter] = useState([])
    const [newNota, setNewNota] = useState("");
    const [newDescription, setNewDescription] = useState("")
    const [newMeses, setNewMeses ] = useState(() => {
        return localStorage.getItem('fecha' || "00-00-0000")
    });
    const [total, setTotal] = useState("");
    const [play] = useSound(digital)
    const [play2] = useSound(ok)
    const [loading, setLoading] = useState(true)

    const { agregarNotas, completarNotas, eliminarNota } = useContext(NotasContext)
    
    
    useEffect(() => {
        axios.get(`${serverFront}/notas`)
            .then(response => {
                setTimeout(() => {
                    setNotes(response.data);
                    setNotesFilter(response.data);
                    setLoading(false); 
                }, 3000); 
            })
            .catch(err => {
                console.log(err);
                setLoading(false); 
            });
    }, []);

 
    const addNotas = () => {
        if (newNota.trim() && newMeses.trim() !== "" && newDescription.trim() !== "" && total > 0) {
            axios.post(`${serverFront}/add-notas`, 
                { notas: newNota, meses:newMeses, description:newDescription, total:total })
                .then(response => {
                    const nuevaNota = response.data;
                    setNotes(notas => [...notas, nuevaNota]);
                    setNotesFilter(notas => [...notas, nuevaNota])
                    setNewNota("");
                    setNewDescription("")
                    setNewMeses("")
                    setTotal(0)
                    agregarNotas(nuevaNota)
                    toast.success(`Se agrego nueva nota`);
                })
                .catch(err => console.log(err));
        }
    };

    const deleteNotas = (id) => {
        axios.delete(`${serverFront}/delete-notas/` + id)
        .then(response => {
            setNotes(notes.filter((note) => note._id !== id))
            setNotesFilter(notesFilter.filter((note) => note._id !== id))
            eliminarNota(id);
            toast.error(`Se elimino correctamente `);
        })
        .catch(err => console.log(err));
    }

    const FiltarNotas = (palabrasClave) => {
        setNotesFilter(notes.filter(note => {
            return palabrasClave.every(palabra => 
                note.notas.toLowerCase().includes(palabra) ||
                note.meses.toLowerCase().includes(palabra) ||
                note.description.toLowerCase().includes(palabra)
            )
        }))
    }

    const clearInput = () => {
        setNewNota("");
        setNewDescription("")
        setNewMeses('');
        setTotal(0)
    };

    const [editId, setEditId] = useState(null); 
    const [editingId, setEditingId] = useState({
        notas:'',
        meses:'',
        description:'',
        total:''
    });

    const startEditing = (note) => {
        setEditId(note._id);
        setEditingId({
            notas:note.notas,
            meses:note.meses,
            description:note.description,
            total:note.total
        })
    }

    const cancelEditing = () => {
        setEditId(null);
        setEditingId({
            notas: '',
            meses: '',
            description: '',
            total: ''
        })
    }

    const saveChanges = (id) => {
        toast.promise(
            axios.patch(`${serverFront}/edit-notas/${id}`, editingId)
            .then(response => {
                setNotes(notes.map(note => note._id === id ? response.data : note))
                setNotesFilter(notesFilter.map(note => note._id === id ? response.data : note))
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
        
 
    }

    const completedNote = (id,completed) => {
        axios.patch(`${serverFront}/completed-notas/${id}`, {completed: !completed })
        .then(response => {
        
            const completedNotes = notes.map(note => note._id === id ? response.data : note)
            setNotes(completedNotes)
            setNotesFilter(completedNotes)
            completarNotas(id, !completed)

            if(response.data.completed){
                play();
                toast.success(`Nota completada `);
            } else {
                toast.error(`Nota incompleta `);
            }
        })
        .catch(err => console.log(err))
    }
    
    const [toogleCheck, setToogleCheck] = useState(null)
    const [selectedNotes, setSelectedNotes] = useState([])

    const handleChange = (id) => {
        setSelectedNotes((prev) =>
            prev.includes(id) ? prev.filter(noteId => noteId !== id) : [...prev, id])
    }

    const deleteManyNotes = (ids) => {
        axios.delete(`${serverFront}/delete-many-notas/`, {data:{ids}})
        .then(response => {
            setNotes(note => note.filter(not => !ids.includes(not._id)))
            setNotesFilter(notesFilter.filter(not => !ids.includes(not._id)))
            toast.error(`${response.data.message}`, {
                position: 'top-center',
            });
        })
        .catch(err => console.error("Error deleting tasks:", err));
    }

    const cleanManyProductos = () => {
        setSelectedNotes("")
    }

     const [showModal,setShowModal] = useState(false)
    
        const deleteAllStock = () => {
            setShowModal(true)
        }
    
        const deleteAll = () => {
            axios.delete(`${serverFront}/delete-all-notas`)
            .then(response => {
                setNotes([])
                setNotesFilter([])
                setShowModal(false)
                toast.error('Todas las notas han sido eliminadas', {
                    position: 'top-center',
                });
                
            }).catch(err => {
                console.error(err);
                toast.error('Error al eliminar las notas', {
                    position: 'top-center',
                });
            });
        }
    


    return (
        <div className="notas-container"> 
            <Helmet>
                <title>Notas</title>
            </Helmet>

            <h1>Notas</h1>

            <Buscador placeholder="Buscar Notas " filtrarDatos={FiltarNotas}/>

            <div className="agregar-notas">

                <input 
                    type="date" 
                    placeholder="Ingresar Fecha"
                    onChange={event => setNewMeses(event.target.value)}
                    value={newMeses} 
                />

                <input 
                    type="text" 
                    placeholder="Agregar una nueva nota" 
                    onChange={event => setNewNota(event.target.value)}
                    value={newNota} 
                />

                <input 
                    type="text" 
                    placeholder="Agregar Descripcion " 
                    onChange={event => setNewDescription(event.target.value)}
                    value={newDescription} 
                />

                <input
                    type="number"
                    placeholder="Total"
                    onChange={event => setTotal(event.target.value)}
                    value={total}
                />


                <div className="botones-notas">
                    <button className="agregar" onClick={addNotas}>Agregar</button>
                    <button className="limpiar" onClick={clearInput}>Limpiar</button> 
                </div>
            </div>

            
            <Accordion 
                sx={{ 
                    mt: 2,  
                    mb: 2,  
                    boxShadow: 'none', 
                    border: 'none', 
                }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                </AccordionSummary>


                {selectedNotes.length > 0 && (
                    <div className="container-manyproducts">
                        <button className="delete-many" onClick={() => deleteManyNotes(selectedNotes)}>
                            <i class="fa-solid fa-trash"></i>
                        </button>

                        <button className="broom" onClick={() => cleanManyProductos(selectedNotes)}>
                            <i class="fa-solid fa-broom"></i>
                        </button>
                    </div>
                )}
 
            <button onClick={deleteAllStock} className="deleteAll">Eliminar todo</button>
            
                <div className="productos">
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                <th className="checkbox"></th>
                                    <th>Fecha</th>
                                    <th>Notas</th>
                                    <th>Description</th>
                                    <th>Total</th>
                                    
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    [...Array(3)].map((_, index) => (
                                        <tr key={index} className="table-responsive">
                                            <td><Skeleton variant="text" width={120} /></td>
                                            <td><Skeleton variant="text" width={120} /></td>
                                            <td><Skeleton variant="text" width={120} /></td>
                                            <td><Skeleton variant="text" width={120} /></td>
                                            <td><Skeleton variant="text" width={120} /></td>
                                        </tr>
                                    ))
                                ) : ( notesFilter.map((element, index) => (

                                    <React.Fragment key={index}>
                                        <tr
                                            className={element.completed ? "completed-note" : ""}
                                            onClick={() => setToogleCheck(toogleCheck === element._id ? null : element._id)}
                                        >
                                            <td>
                                                {(toogleCheck === element._id || selectedNotes.includes(element._id)) && (
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedNotes.includes(element._id)}
                                                        onChange={() => handleChange(element._id)}
                                                    />
                                                )}
                                            </td>

                                            <td>{element.meses}</td>
                                            <td >{element.notas}</td>
                                            <td className="descripcion">{element.description}</td>
                                            <td className="total2">$ {element.total}</td>

                                            <td className="actions2">
                       
                                                <button
                                                    className={element.completed ? "desmarcar" : "completar"}
                                                    onClick={() => completedNote(element._id, element.completed)}
                                                >
                                                    {element.completed ? "Desmarcar" : "Completar"}
                                                </button>

                                                <button className="trash" onClick={() => deleteNotas(element._id)}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                
                                                {editId === element._id ? (
                                                 null
                                                ): <button className="edit" onClick={() => startEditing(element)}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>}
  
                                            </td>
                                        </tr>
                                
                                        {editId === element._id && (
                                            <tr className="edit-row">
                                                <td></td>

                                                <td>
                                                <input
                                                    type="date"
                                                    value={editingId.meses}
                                                    onChange={(e) => setEditingId({ ...editingId, meses: e.target.value })}
                                                />
                                                </td>

                                                <td>
                                                <input
                                                    type="text"
                                                    placeholder="Notas"
                                                    value={editingId.notas}
                                                    onChange={(e) => setEditingId({ ...editingId, notas: e.target.value })}
                                                />
                                                </td>
                                                <td>
                                                <input
                                                    type="text"
                                                    placeholder="Descripción"
                                                    value={editingId.description}
                                                    onChange={(e) => setEditingId({ ...editingId, description: e.target.value })}
                                                />
                                                </td>

                                                <td>
                                                <input
                                                    type="number"
                                                    placeholder="Total"
                                                    value={editingId.total}
                                                    onChange={(e) => setEditingId({ ...editingId, total: e.target.value })}
                                                />  
                                                </td>

                                                <td className="btn-editar">
                                                <button className="check" onClick={() => saveChanges(element._id)}>
                                                    <i className="fa-solid fa-check"></i>
                                                </button>
                                                
                                                <button className="cancel" onClick={cancelEditing}>
                                                    <i className="fa-solid fa-ban"></i>
                                                </button>
                                                </td>

                                            </tr>
                                        )}
                                    </React.Fragment>
                                )))}
                            </tbody>

                        </table>
                        
                        <Toaster/>
                        <ScrollTop/>
                    </div>
                </div>
                <Modal show={showModal} onClose={() => setShowModal(false)} onConfirm={deleteAll}/> 
            </Accordion>
            
        </div>
    );
}
