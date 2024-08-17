import axios from "axios";
import { useState } from "react";

// const serverFront = 'http://localhost:3001';
const serverFront = 'https://server-ventas.onrender.com';

export function Archivos() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(); 
        formData.append('file', file);

        try {
            const res = await axios.post(`${serverFront}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('File uploaded successfully');
        } catch (err) {
            console.error(err);
            setMessage('Failed to upload file');
        }
    };

    return (
        <>
            <h1>Archivos Subidos</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </>
    );
}
