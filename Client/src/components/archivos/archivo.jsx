import axios from 'axios';
import { useEffect, useState } from 'react';
import './archivos.css'; // Asegúrate de crear este archivo para los estilos

// const serverFront = 'http://localhost:3001';
   const serverFront = 'https://ventas-de-negocio.onrender.com'

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState('');
    const [archivos, setArchivos] = useState([]);

    // Manejar la selección de archivo y generar vista previa
    const onFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };

            if (file.type.startsWith('image/')) {
                reader.readAsDataURL(file); // Para imágenes
            } else if (file.type.startsWith('text/')) {
                reader.readAsText(file); // Para archivos de texto
            } else {
                setPreview(null);
            }
        } else {
            setPreview(null);
        }
    };

    // Subida de archivos
    const onFileUpload = async () => {
        if (!selectedFile) {
            setMessage('Por favor selecciona un archivo');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post(`${serverFront}/upload`, formData);
            setMessage(response.data.message);
            fetchFiles(); // Actualizar la lista de archivos después de subir uno nuevo
            setPreview(null); // Limpiar la vista previa después de la subida
            setSelectedFile(null); // Limpiar el archivo seleccionado
        } catch (error) {
            setMessage('Error al subir el archivo');
            console.error(error);
        }
    };

    // Obtener archivos
    const fetchFiles = async () => {
        try {
            const response = await axios.get(`${serverFront}/files`);
            setArchivos(response.data);
        } catch (error) {
            console.error('Error al obtener archivos', error);
        }
    };

    // Eliminar archivo
    const deleteFile = async (fileId) => {
        try {
            await axios.delete(`${serverFront}/files/${fileId}`);
            fetchFiles(); // Actualizar la lista de archivos después de eliminar uno
        } catch (error) {
            console.error('Error al eliminar archivo', error);
        }
    };

    const resertFile = async () => {
        setMessage("")
        setArchivos("")
    }


    useEffect(() => {
        fetchFiles();
    }, []);

    return (
        <div className='file-upload-container'>
            <h2>Subir Archivo</h2>
            <input type="file" onChange={onFileChange} />
            {preview && (
                <div className="preview">
                    {selectedFile.type.startsWith('image/') ? (
                        <img src={preview} alt="Vista previa" className="preview-image" />
                    ) : (
                        <textarea readOnly value={preview} className="preview-text" />
                    )}
                </div>
            )}

            <div className='button-file'>
                <button onClick={onFileUpload} className="upload-button"><i className="fa-solid fa-upload"></i></button>
                <button onClick={resertFile} className='delete-button'> <i className="fa-solid fa-ban"></i> </button>
            </div>

            {message && <p className="message">{message}</p>}

            <div className='files-uploads'>
                <h2>Archivos Subidos</h2>
                    <ul className="file-list">
                        {archivos.map(file => (
                            <li key={file._id} className="file-item">
                                <a href={`${serverFront}/files/${file._id}`} download={file.filename}>
                                    {file.filename}
                                </a>
                                <i className="fa-solid fa-trash" onClick={() => deleteFile(file._id)}></i>
                            </li>
                        ))}
                    </ul>
            </div>
      
        </div>
    );
};

export default FileUpload;
