import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/archivos.css';
import { config } from "../config/index";

// Configuración de la API
const serverFront = config.Api;

const FileUpload = ({ maxFileSize = 5 }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const validateFile = (file) => {
    if (!file) return 'Por favor selecciona un archivo';
    if (file.size > maxFileSize * 1024 * 1024) 
      return `El archivo excede el tamaño máximo de ${maxFileSize}MB`;
    return null;
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const error = validateFile(file);
      if (error) {
        setMessage(error);
        setSelectedFile(null);
        event.target.value = '';
        return;
      }
      setSelectedFile(file);
      setMessage('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Por favor selecciona un archivo');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`${serverFront}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Error desconocido' }));
        throw new Error(errorData.error || `Error ${response.status}`);
      }

      const result = await response.json();
      setMessage('¡Archivo subido exitosamente!');
      setSelectedFile(null);
      document.getElementById('file-input').value = '';
      await fetchFiles();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error('Error:', error);
    } finally {
      setUploading(false);
    }
  };

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${serverFront}/api/files`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const filesData = await response.json();
      setFiles(filesData);
    } catch (error) {
      console.error('Error al cargar archivos:', error);
      setMessage('Error al cargar la lista de archivos');
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (fileId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este archivo?')) {
      return;
    }

    try {
      const response = await fetch(`${serverFront}/api/files/${fileId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      setMessage('Archivo eliminado exitosamente');
      await fetchFiles();
    } catch (error) {
      console.error('Error al eliminar:', error);
      setMessage(`Error: ${error.message}`);
    }
  };

  const downloadFile = (fileId, filename) => {
    // Crear enlace de descarga directa
    const downloadUrl = `${serverFront}/api/files/${fileId}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="file-upload-container">
      <h2>Subir Archivos</h2>
      
      <div className="upload-section">
        <div className="file-input-container">
          <input
            id="file-input"
            type="file"
            onChange={handleFileSelect}
            className="file-input"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif"
          />
          <label htmlFor="file-input" className="file-input-label">
            Seleccionar Archivo
          </label>
          {selectedFile && (
            <div className="file-info">
              <span><strong>Archivo:</strong> {selectedFile.name}</span>
              <span><strong>Tamaño:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
              <span><strong>Tipo:</strong> {selectedFile.type || 'Desconocido'}</span>
            </div>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="upload-button"
        >
          {uploading ? (
            <>
              <span className="spinner"></span>
              Subiendo...
            </>
          ) : (
            'Subir Archivo'
          )}
        </button>

        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
      </div>

      <div className="files-list">
        <div className="files-header">
          <h3>Archivos Subidos</h3>
          <button 
            onClick={fetchFiles} 
            className="refresh-btn"
            disabled={loading}
          >
            {loading ? 'Actualizando...' : 'Actualizar'}
          </button>
        </div>
        
        {loading ? (
          <div className="loading-state">
            <p>Cargando archivos...</p>
          </div>
        ) : files.length === 0 ? (
          <div className="empty-state">
            <p>No hay archivos subidos</p>
          </div>
        ) : (
          <div className="files-grid">
            {files.map((file) => (
              <div key={file._id} className="file-card">
                <div className="file-info">
                  <strong className="filename" title={file.originalName || file.filename}>
                    {file.originalName || file.filename}
                  </strong>
                  <span><strong>Tipo:</strong> {file.contentType}</span>
                  <span><strong>Tamaño:</strong> {file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'N/A'}</span>
                  <span><strong>Subido:</strong> {new Date(file.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
                <div className="file-actions">
                  <button
                    onClick={() => downloadFile(file._id, file.originalName || file.filename)}
                    className="download-btn"
                  >
                    Descargar
                  </button>
                  <button
                    onClick={() => deleteFile(file._id)}
                    className="delete-btn"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  maxFileSize: PropTypes.number
};

export default FileUpload;