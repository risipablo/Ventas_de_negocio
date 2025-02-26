import axios from 'axios';
import { useEffect, useState } from 'react';
import '../../styles/archivos.css';
import 'font-awesome/css/font-awesome.min.css';  
import useSound from 'use-sound';
import ok from "../../assets/ok.mp3";
import { ClipLoader } from 'react-spinners';
import { keyframes } from '@emotion/react';
import toast, { Toaster } from 'react-hot-toast';

// const serverFront = 'http://localhost:3001';
const serverFront = 'https://ventas-de-negocio.onrender.com'

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState('');
    const [archivos, setArchivos] = useState([]);
    const [previewUrl, setPreviewUrl] = useState(null); // Nuevo estado para la URL del archivo a visualizar
    const [play2] = useSound(ok);
    const [loading, setLoading] = useState(true);

    const fadeInOut = keyframes`
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  `;

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

        toast.promise(
            axios.post(`${serverFront}/upload`, formData),
            {
                loading: 'Subiendo archivo...',
                success: 'Archivo subido con éxito!',
                error: 'Error al subir el archivo',
            }
        ).then(() => {
            setMessage("");
            fetchFiles(); // Actualizar la lista de archivos después de subir uno nuevo
            setPreview(null); // Limpiar la vista previa después de la subida
            setSelectedFile(null); // Limpiar el archivo seleccionado
            play2();
        }).catch(error => {
            console.error(error);
        });
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
    const deleteFile = async (id) => {
        toast.promise(
            axios.delete(`${serverFront}/delete-files/${id}`),
            {
                loading: 'Eliminando archivo...',
                success: 'Archivo eliminado con éxito!',
                error: 'Error al eliminar el archivo',
            }
        ).then(() => {
            setArchivos(archivos.filter((archivo) => archivo._id !== id));
            fetchFiles();
        }).catch(err => console.log(err));
    };

    // Resetear vista previa y mensaje
    const resetFile = async () => {
        setMessage("");
        setArchivos([]);
        setPreviewUrl(null); // Limpiar la URL de la vista previa
    };

    const handleViewFile = (fileId) => {
        window.open(`${serverFront}/files/${fileId}`, '_blank'); // Abre en una nueva pestaña
    };

    useEffect(() => {
        setTimeout(() => {
            fetchFiles();
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className='file-upload-container'>
            <Toaster />
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
                <button onClick={onFileUpload} className="upload-button">
                    <i className="fa-solid fa-upload"></i> 
                </button>
                <button onClick={resetFile} className='delete-button'>
                    <i className="fa-solid fa-ban"></i> 
                </button>
            </div>

            {message && <p className="message">{message}</p>}

            <div className='files-uploads'>
                <h2>Archivos Subidos</h2>
                {loading ? (
                    <tr>
                        <td colSpan="8" style={{ textAlign: "center" }}>
                            <ClipLoader color={"#36D7B7"} size={50} />
                            <p style={{ color: "#36D7B7", animation: `${fadeInOut} 1s infinite` }}>
                                Cargando archivos...
                            </p>
                        </td>
                    </tr>
                ) : (
                    <ul className="file-list">
                        {archivos.map(file => (
                            <li key={file._id} className="file-item">
                                <a href={`${serverFront}/files/${file._id}`} download={file.filename}>
                                    {file.filename}
                                    {file.img}
                                </a>
                                <div className="button-container">
                                    <button onClick={() => handleViewFile(file._id)} className="view-button">
                                        <i className="fa-solid fa-eye"></i>
                                    </button>
                                    <i className="fa-solid fa-trash delete-icon" onClick={() => deleteFile(file._id)}></i>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FileUpload;