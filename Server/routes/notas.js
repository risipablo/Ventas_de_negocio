const express = require ('express')
const NotaModel = require ('../models/Notas');
const { route } = require('./gastos');

const router = express.Router();

// Ruta para obtener notas
router.get('/notas', async (req, res) => {
    try {
        const notas = await NotaModel.find();
        res.json(notas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ruta para añadir una nota
router.post('/add-notas', async (req, res) => {
    const { notas, meses } = req.body;
    if (!notas || !meses) {
        return res.status(400).json({ error: 'Nota no proporcionada' });
    }
    try {
        const newNota = new NotaModel({ notas, meses});
        const result = await newNota.save();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Eliminar notas
router.delete('/delete-notas/:id', (req, res) => {
    const { id } = req.params;
    NotaModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Editar notas
router.patch('/edit-notas/:id', (req, res) => {
    const { id } = req.params;
    const { notas, meses } = req.body;
    NotaModel.findByIdAndUpdate(id, { notas, meses }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});


// Completar notas
router.patch('/completed-notas/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    NotaModel.findByIdAndUpdate(id, { completed }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});



module.exports = router;