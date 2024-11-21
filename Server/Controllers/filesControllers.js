// filesController.js
const File = require('../Models/files'); // Asegúrate de ajustar la ruta según tu estructura
const multer = require('multer');

// Configuración de multer
const storage = multer.memoryStorage();
const upload = multer({ storage });


//  Controlador para subir un archivo.

const uploadFile = async (req, res) => {
    const file = new File({
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        data: req.file.buffer
    });

    try {
        await file.save();
        res.status(201).send({ message: 'Archivo subido exitosamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al subir el archivo', error });
    }
};


//  Controlador para listar todos los archivos.

const listFiles = async (req, res) => {
    try {
        const files = await File.find({});
        res.status(200).json(files);
    } catch (error) {
        res.status(500).send({ message: 'Error al listar archivos', error });
    }
};


//  Controlador para obtener un archivo por ID.

const getFileById = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).send({ message: 'Archivo no encontrado' });
        }

        res.set({
            'Content-Type': file.contentType,
            'Content-Disposition': `inline; filename=${file.filename}`
        });

        res.send(file.data);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el archivo', error });
    }
};


//  Controlador para eliminar un archivo por ID.

const deleteFileById = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteFiles = await File.findByIdAndDelete(id);
        if (!deleteFiles) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }
        res.json(deleteFiles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    upload,
    uploadFile,
    listFiles,
    getFileById,
    deleteFileById
};
