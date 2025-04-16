import './modal.css'

export function Modal({show, onClose, onConfirm}) {
    if (!show){
        return null
    }

    return(
        <div className="modal-overlay">
            <div className="modal">
                <h2>Confirmación</h2>
                <p>¿Seguro que desea eliminar todas las tareas?</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm} className='yes'>Sí</button>
                    <button onClick={onClose} className='no'>No</button>
                </div>
            </div>
        </div>
    )
}