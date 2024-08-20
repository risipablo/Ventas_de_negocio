import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Archivos = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get('/files').then((res) => setFiles(res.data));
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('/upload', formData).then(() => {
      alert('File uploaded successfully');
      setFile(null);
      axios.get('/files').then((res) => setFiles(res.data));
    });
  };

  return (
    <div className="gastos-container">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>

      <h3>Uploaded Files</h3>
      {files.length > 0 ? (
      <ul>
        {files.map((_,file) => (
          <li key={file._id}>
            <a href={`/files/${file.filename}`} download>{file.originalName}</a>
          </li>
        ))}
      </ul>
    ) : (
      <p>No files uploaded yet.</p>
    )}
    </div>
  );
};

export default Archivos;
