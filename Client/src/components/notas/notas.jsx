import { Helmet } from "react-helmet";
import "./notas.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ScrollTop } from "../others/scrollTop";


// const serverFront = "http://localhost:3001";
const serverFront = 'https://server-ventas.onrender.com';

export function Notas() {
    const [notes, setNotes] = useState([]);
    const [newNota, setNewNota] = useState("");

    useEffect(() => {
        axios.get(`${serverFront}/notas`)
            .then(response => {
                setNotes(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    const addNotas = () => {
        if (newNota.trim() !== "") {
            axios.post(`${serverFront}/add-notas`, { notas: newNota })
                .then(response => {
                    const nuevaNota = response.data;
                    setNotes(notas => [...notas, nuevaNota]);
                    setNewNota("");
                    toast.success(
                        ` Se agregó una anotacion nueva`,
                        {
                        position: "top-center",
                        autoClose: 2000,
                        theme: "light"
                      });
                })
                .catch(err => console.log(err));
        }
    };

    const deleteNotas = (id) => {
        axios.delete(`${serverFront}/delete-notas/` + id)
        .then(response => {
            setNotes(notes.filter((note) => note._id !== id))
        })
    }

    const clearInput = () => {
        setNewNota("");
    };

    const [editingId, setEditingId] = useState(null); 
    const [editingData, setEditingData] = useState({
        notas:''
    });

    const startEditing = (note) => {
        setEditingId(note._id);
        setEditingData({
            notas:note.notas,
        })
    }

    const cancelEditing = () => {
        setEditingId(null);
        setEditingData({
            notas: '',
        })
    }

    const saveChanges = (id) => {
        axios.patch(`${serverFront}/edit-notas/${id}`, editingData)
        .then(response => {
            setNotes(notes.map(note => note._id === id ? response.data : note))
            cancelEditing();
            toast.success("Nota actualizada ", {
                position: "top-center",
                autoClose: 2000,
                theme: "light",
                transition: Bounce,
            });
        })
        .catch(err => console.log(err))
    }

    const completedNote = (id,completed) => {
        axios.patch(`${serverFront}/completed-notas/${id}`, {completed: !completed })
        .then(response => {
            const completedNotes = notes.map(note => note._id === id ? response.data : note)
            setNotes(completedNotes)
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="notas-container"> 
            <Helmet>
                <title>Notas</title>
            </Helmet>

            <h1>Notas</h1>

            <div className="agregar-notas">
                <input 
                    type="text" 
                    placeholder="Agregar una nueva nota" 
                    onChange={event => setNewNota(event.target.value)}
                    value={newNota} 
                />

                <div className="botones-notas">
                    <button className="agregar" onClick={addNotas}>Agregar</button>
                    <button className="limpiar" onClick={clearInput}>Limpiar</button>  
                </div>
            </div>
            
                <div className="productos">
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Notas</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {notes.map((element, index) => 
                                    <tr key={index} className={element.completed ? "completed-note" : ""}>
                                        <td>{editingId === element._id ?
                                            <input value={editingData.notas} onChange={(e) => setEditingData({...editingData, notas:e.target.value})} /> : element.notas}</td>

                                        <div className="actions">

                                        <button className="trash" onClick={() => deleteNotas(element._id)}> <i className="fa-solid fa-trash"></i> </button>
                                        
                                        
                                        <button
                                                className={element.completed ? "desmarcar" : "completar"}
                                                onClick={() => completedNote(element._id,element.completed)}
                                            >
                                                {element.completed ? "Desmarcar" : "Completar"}
                                        </button>
                                        
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
                        </table>
                        
                        <ToastContainer/>
                        <ScrollTop/>
                    </div>
                </div>
            
        </div>
    );
}
