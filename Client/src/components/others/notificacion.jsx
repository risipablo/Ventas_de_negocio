
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useState } from "react"
import "./others.css"



export function Notificacion() {
    const [open,setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }


    return(
        <div className="notificacion">
            <Button className="outlined" onClick={handleOpen}>
                <i className="fa-sharp fa-solid fa-bell"></i>
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogActions className="icon-noti">
                    <button onClick={handleClose} color="primary">
                        <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                </DialogActions>
                <DialogTitle className="dialog-content"> Ofertas</DialogTitle>
                <DialogContent className="dialog-content">
                    Biopet y Suertudo 10% descuento
                </DialogContent>
                <DialogContent className="dialog-content">
                    Indumentaria 20% descuento
                </DialogContent>
                <DialogContent className="dialog-content">
                    Solo aplicado con Debito, Efectivo y Mercado Pago
                </DialogContent>
            </Dialog>
        </div>
    )
}