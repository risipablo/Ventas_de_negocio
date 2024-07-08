import { Helmet } from "react-helmet";
import "./notas.css";
import { useEffect, useState } from "react";
import axios from "axios";

const serverFront = "http://localhost:3001";
// const serverFront = 'https://server-ventas.onrender.com';

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
                })
                .catch(err => console.log(err));
        }
    };

    const deleteNotas = (id) => {
        axios.delete(`${serverFront}/delete-notas` + id)
        .then(response => {
            setNotes(notes.filter((note) => note._id !== id))
        })
    }

    const clearInput = () => {
        setNewNota("");
    };

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
                                <tr key={index}>
                                    <td>{element.notas}</td>

                                    <div className="actions">
                                    <button className="trash" onClick={() => deleteNotas(element._id)}> <i className="fa-solid fa-trash"></i> </button>
                                    </div>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
