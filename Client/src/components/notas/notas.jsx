import { Helmet } from "react-helmet";
import "./notas.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ScrollTop } from "../others/scrollTop";
import { NotasContext } from "./notasContext/notasContext";


const serverFront = "http://localhost:3001";
// const serverFront = 'https://server-ventas.onrender.com';

export function Notas() {
    const [notes, setNotes] = useState([]);
    const [newNota, setNewNota] = useState("");
    const [newMeses, setNewMeses ] = useState("");

    const { agregarNotas, completarNotas, eliminarNota } = useContext(NotasContext)

    useEffect(() => {
        axios.get(`${serverFront}/notas`)
            .then(response => {
                setNotes(response.data);
            })
            .catch(err => console.log(err));
    }, []);

 
    const addNotas = () => {
        if (newNota.trim() && newMeses.trim() !== "") {
            axios.post(`${serverFront}/add-notas`, 
                { notas: newNota, meses:newMeses })
                .then(response => {
                    const nuevaNota = response.data;
                    setNotes(notas => [...notas, nuevaNota]);
                    setNewNota("");
                    setNewMeses("")
                    agregarNotas(nuevaNota)
                })
                .catch(err => console.log(err));
        }
    };

    const deleteNotas = (id) => {
        axios.delete(`${serverFront}/delete-notas/` + id)
        .then(response => {
            setNotes(notes.filter((note) => note._id !== id))
            eliminarNota(id);
        })
        .catch(err => console.log(err));
    }

    const clearInput = () => {
        setNewNota("");
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
        axios.patch(`${serverFront}/edit-notas/${id}`, editingData)
        .then(response => {
            setNotes(notes.map(note => note._id === id ? response.data : note))
            cancelEditing();
            toast.success("Nota actualizada ", {
                position: "top-center",
                autoClose: 2000,
                theme: "light",
                closeOnClick: true,
                pauseOnHover: false,
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
            completarNotas(id, !completed)
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
            
                <div className="productos">
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Notas</th>
                                    <th>Mes</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {notes.map((element, index) => 
                                    <tr key={index} className={element.completed ? "completed-note" : ""}>

                                        <td>{editingId === element._id ?
                                            <input value={editingData.notas} onChange={(e) => setEditingData({...editingData, notas:e.target.value})} /> : element.notas} </td>
                                        
                                        <td>{editingId === element._id ?
                                            <input value={editingData.meses} onChange={(e) => setEditingData({...editingData, meses:e.target.value})} /> : element.meses} </td>

                                        <div className="actions2">
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
