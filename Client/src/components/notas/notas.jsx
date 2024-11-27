import { Helmet } from "react-helmet";
import "../../styles/notas.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { Accordion, AccordionSummary} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ScrollTop } from "../others/scrollTop";
import { NotasContext } from "./notasContext/notasContext";
import { Buscador } from "../buscador/buscador";
import { toast, Toaster } from 'react-hot-toast';
import useSound from 'use-sound'
import digital from "../../assets/digital.mp3"
import ok from "../../assets/ok.mp3"


// const serverFront = "http://localhost:3001";
const serverFront = 'https://ventas-de-negocio.onrender.com'


export function Notas() {
    const [notes, setNotes] = useState([]);
    const [notesFilter, setNotesFilter] = useState([])
    const [newNota, setNewNota] = useState("");
    const [newDescription, setNewDescription] = useState("")
    const [newMeses, setNewMeses ] = useState("");
    const [play] = useSound(digital)
    const [play2] = useSound(ok)

    const { agregarNotas, completarNotas, eliminarNota } = useContext(NotasContext)

    useEffect(() => {
        axios.get(`${serverFront}/notas`)
            .then(response => {
                setNotes(response.data);
                setNotesFilter(response.data)
            })
            .catch(err => console.log(err));
    }, []);

 
    const addNotas = () => {
        if (newNota.trim() && newMeses.trim() !== "" && newDescription.trim() !== "") {
            axios.post(`${serverFront}/add-notas`, 
                { notas: newNota, meses:newMeses, description:newDescription })
                .then(response => {
                    const nuevaNota = response.data;
                    setNotes(notas => [...notas, nuevaNota]);
                    setNotesFilter(notas => [...notas, nuevaNota])
                    setNewNota("");
                    setNewDescription("")
                    setNewMeses("")
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
                note.meses.toLowerCase().includes(palabra) 
                // note.description.toLowerCase().includes(palabra)
            )
        }))
    }

    const clearInput = () => {
        setNewNota("");
        setNewDescription("")
        setNewMeses('');
    };

    const [editingId, setEditingId] = useState(null); 
    const [editingData, setEditingData] = useState({
        notas:'',
        meses:''
    });

    const startEditing = (note) => {
        setEditingId(note._id);
        setEditingData({
            notas:note.notas,
            meses:note.meses
        })
    }

    const cancelEditing = () => {
        setEditingId(null);
        setEditingData({
            notas: '',
            meses: '',
        })
    }

    const saveChanges = (id) => {
        toast.promise(
            axios.patch(`${serverFront}/edit-notas/${id}`, editingData)
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
    
    const [selectedNotes, setSelectedNotes] = useState([])

    const handleChange = (id) => {
        setSelectedNotes((prev) => prev.includes(id) ? prev.filter(noteId => noteId !== !id):[...prev,id])
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


    return (
        <div className="notas-container"> 
            <Helmet>
                <title>Notas</title>
            </Helmet>

            <h1>Notas</h1>

            <Buscador placeholder="Buscar Notas " filtrarDatos={FiltarNotas}/>

            <div className="agregar-notas">
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
                    type="text" 
                    placeholder="Agregar Mes " 
                    onChange={event => setNewMeses(event.target.value)}
                    value={newMeses} 
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
 

            
                <div className="productos">
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                <th className="checkbox"></th>
                                    <th>Notas</th>
                                    <th>Description</th>
                                    <th>Mes</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {notesFilter.map((element, index) => 
                                    <tr key={index} className={element.completed ? "completed-note" : ""}>

                                        <td> <input type="checkbox" checked={selectedNotes.includes(element._id)} onChange={() => handleChange(element._id)} /> </td>

                                        <td className="texto-notas">{editingId === element._id ?
                                            <input value={editingData.notas} onChange={(e) => setEditingData({...editingData, notas:e.target.value})} /> : element.notas} </td>
                                        
                                        <td className="texto-notas">{editingId === element._id ? 
                                            <input value={editingData.description} onChange={(e) => setEditingData({...editingData, description:e.target.value})}/> :
                                            element.description}</td>

                                        <td>{editingId === element._id ?
                                            <input value={editingData.meses} onChange={(e) => setEditingData({...editingData, meses:e.target.value})} /> : element.meses} </td>

                                        <td className="actions2">
                                            <button className="trash" onClick={() => deleteNotas(element._id)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>

                                            <button
                                                className={element.completed ? "desmarcar" : "completar"}
                                                onClick={() => completedNote(element._id, element.completed)}
                                            >
                                                {element.completed ? "Desmarcar" : "Completar"}
                                            </button>

                                            {editingId === element._id ? (
                                                <div className="btn-edit">
                                                    <button className="check" onClick={() => saveChanges(element._id)}>
                                                        <i className="fa-solid fa-check"></i>
                                                    </button>
                                                    <button className="cancel" onClick={cancelEditing}>
                                                        <i className="fa-solid fa-ban"></i>
                                                    </button>
                                                </div>
                                            ) : (
                                                <button className="edit" onClick={() => startEditing(element)}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                            )}
                                        </td>

                                    </tr>
                                )}
                            </tbody>
                        </table>
                        
                        <Toaster/>
                        <ScrollTop/>
                    </div>
                </div>

            </Accordion>
            
        </div>
    );
}
