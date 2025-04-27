import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { Add, Cancel } from '@mui/icons-material';
import "./notificacion.css";

const serverFront = 'http://localhost:3001';
// const serverFront = 'https://ventas-de-negocio.onrender.com';

export function Notificacion() {
    const [notas, setNotas] = useState([]);
    const [nuevaNota, setNuevaNota] = useState("");
    const [fecha, setFecha ] = useState(() => {
            return localStorage.getItem('fecha' || "00-00-0000")
        });
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios.get(`${serverFront}/nota`)
            .then(response => {
                setTimeout(() => {
                    setNotas(response.data);
                }, 1000);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const addNota = () => {
        if (nuevaNota.trim() !== "") {
            axios.post(`${serverFront}/nota`, {
                titulo: nuevaNota,
                fecha: fecha
            })
                .then(response => {
                    const notaNueva = response.data;
                    setNotas([...notas, notaNueva]);
                    setNuevaNota('');
                    setFecha('')
                })
                .catch(err => console.log(err));
        }
    };

    const deleteNota = (id) => {
        axios.delete(`${serverFront}/nota/${id}`)
            .then(response => {
                const updateNota = notas.filter((nota) => nota._id !== id);
                setNotas(updateNota);
            })
            .catch(err => console.log(err));
    };

    const [editId, setEditId] = useState(null);
    const [editingId, setEditingId] = useState({
        titulo: "",
        fecha: ""
    });

    const editing = (nota) => {
        setEditId(nota._id);
        setEditingId({
            titulo: nota.titulo,
            fecha: nota.fecha
        });
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditingId({ titulo:"", fecha: "" });
    };

    const saveNota = (id) => {
        axios.patch(`${serverFront}/nota/${id}`, editingId)
            .then(response => {
                setNotas(notas.map(nota => nota._id === id ? response.data : nota));
                cancelEdit();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="notificacion">
            <Button className="outlined" onClick={handleOpen}>
                <i className="fa-sharp fa-solid fa-bell fa-2x" style={{ color: 'rgba(134, 10, 180)' }}></i>
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogActions className="icon-noti">
                    <button onClick={handleClose} color="primary">
                        <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                </DialogActions>

                <DialogContent>
                    <div className="input-notas">

                        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)}  />
                        <input type="text" value={nuevaNota} onChange={(e) => setNuevaNota(e.target.value)} />
               
                        <Button onClick={addNota} color="primary"><AddIcon/></Button>
                    </div>

                    <DialogTitle className="dialog-content" style={{ fontWeight: 'bold', fontSize:22 }}>Recordatorios</DialogTitle>
                    
                    <DialogContentText>
                        <div className="table-container">
                            <table className="notas-table">
                                <tbody>
                                    {notas.map((note, index) => (
                                        <React.Fragment key={index}>
                                            <tr className="nota-row">
                                                <td style={{ fontWeight: 'bold' }}>
                                                    {note.fecha}
                                                </td>
                                                <td style={{ fontWeight: 'bold' }}>
                                                    {note.titulo}
                                                </td>
                                                <td className="actions">
                                                    {editId === note._id ? null : (
                                                        <IconButton className="edit" sx={{ color: 'grey', fontFamily: "Montserrat, sans-serif" }} onClick={() => editing(note)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    )}
                                                    <IconButton className="trash" sx={{ color: 'red', fontFamily: "Montserrat, sans-serif" }} onClick={() => deleteNota(note._id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </td>
                                            </tr>
                                            {editId === note._id && (
                                                <tr className="edit-row">
                                                    <td>
                                                        <input
                                                            type="date"
                                                            value={editingId.fecha}
                                                            onChange={(e) => setEditingId({ ...editingId, fecha: e.target.value })}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            value={editingId.titulo}
                                                            onChange={(e) => setEditingId({ ...editingId, titulo: e.target.value })}
                                                        />
                                                    </td>
                                                    <td className="btn-editar">
                                                        <IconButton className="check" sx={{ color: 'green', backgroundColor: 'lightgreen', borderRadius: '4px', padding: '5px' }} onClick={() => saveNota(note._id)}>
                                                            <CheckIcon />
                                                        </IconButton>
                                                        <IconButton className="cancel" sx={{ color: 'white', backgroundColor: 'red', borderRadius: '4px', padding: '5px' }} onClick={cancelEdit}>
                                                            <Cancel />
                                                        </IconButton>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}