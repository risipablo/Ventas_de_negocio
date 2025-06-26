
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, IconButton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import toast from 'react-hot-toast';
import { useRecordatorio } from './recordatorioContext';

export function Recordatorio({message}){

    const [titulo, setTitulo] = useState("")
    const [fecha, setFecha] = useState(() => localStorage.getItem('fecha') || "00-00");
    
    const [open, setOpen] = useState(false)

    const {notas, addRecordatorio, deleteRecordatorio} = useRecordatorio()

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAdd = () => {
        addRecordatorio(titulo, fecha)
        setTitulo('')
        setFecha('')
    }

    const handleDelete = (id) => {
        deleteRecordatorio(id)
        
    }
    
    const toastShown = useRef(false);

    useEffect(() => {
        if (!toastShown.current && notas.length > 0) {
            toastShown.current = true;
            notas.forEach((n, i) => {
                setTimeout(() => {
                    toast(`📌  ${isNaN(new Date(`${n.fecha}T12:00:00`)) 
                                ? n.fecha 
                                : new Date(`${n.fecha}T12:00:00`).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })}
                                    ${n.titulo}`, {
                        duration: 5000,
                        position: "top-center",
                        style: {
                            background: "#3c82f6",
                            color: "white",
                          
                        },
                    });
                }, i * 1000);
            });
        }
    }, []);

    return(
        <div className="notificacion">
            <Button onClick={handleOpen}>
                <BookmarkAddIcon/>
            </Button>

            <Dialog open={open}  maxWidth="md" fullWidth>
                <DialogActions className='icon-noti'>
                    <button onClick={handleClose} color='primary'>
                         <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                </DialogActions>

                <DialogContent>
                    <div className="input-notas">
                        <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
                        <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} />
                        <Button onClick={handleAdd} color="primary"> <AddIcon/> </Button>
                    </div>

                    <DialogContentText>
                        <div className="table-container">
                            <div className="notas-table">
                                <tbody>
                                    {notas.map((not, index) => (
                                        <React.Fragment key={index}>
                                            <tr className='nota-row'>
                                                <td>
                                                {isNaN(new Date(`${not.fecha}T12:00:00`)) 
                                                    ? not.fecha 
                                                    : new Date(`${not.fecha}T12:00:00`).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })}
                                                </td>

                                                <td>
                                                    {not.titulo}
                                                </td>
                                                <td className='actions'>
                                                    <IconButton className="trash" sx={{ color: 'red', fontFamily: "Montserrat, sans-serif" }} onClick={() => handleDelete(not._id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            
        </div>
    )
}