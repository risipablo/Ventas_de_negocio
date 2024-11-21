
const NoteModel = require('../Models/notas.js')

// Ruta para obtener notas
exports.getNotas =  async (req, res) => {
    try {
        const notas = await NoteModel.find();
        res.json(notas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// Ruta para añadir una nota
exports.addNotas =  async (req, res) => {
    const { notas, meses, description } = req.body;
    if (!notas || !meses || !description) {
        return res.status(400).json({ error: 'Nota no proporcionada' });
    }
    try {
        const newNota = new NoteModel({ notas, meses, description});
        const result = await newNota.save();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar notas
exports.deleteNotas = (req, res) => {
    const { id } = req.params;
    NoteModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
};


// Editar notas
exports.editNotas = (req, res) => {
    const { id } = req.params;
    const { notas, meses, description } = req.body;
    NoteModel.findByIdAndUpdate(id, { notas, meses, description }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
};


// Completar notas
exports.completedNotas = (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    NoteModel.findByIdAndUpdate(id, { completed }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
};

