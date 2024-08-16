const express = require('express')
const VentasModel = require('../models/Ventas')

const app = express.Router()


// Obtener registro de ventas
app.get('/ventas', async (req, res) => {
    try {
        const ventas = await VentasModel.find();
        res.json(ventas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Agregar registro de ventas
app.post('/add-ventas', async (req, res) => {
    const { day, month, total, tp, product, boleta } = req.body;
    if (!day || !month || !tp || !product || !total || !boleta) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    try {
        const newVenta = new VentasModel({ day, month, total, tp, product, boleta });
        const result = await newVenta.save();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


// Eliminar ventas
app.delete('/delete-venta/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await VentasModel.findByIdAndDelete(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Editar registro de ventas
app.patch('/edit-ventas/:id', async (req, res) => {
    const { id } = req.params;
    const { total, product, tp, boleta } = req.body;
    try {
        const result = await VentasModel.findByIdAndUpdate(id, { total, product, tp, boleta }, { new: true });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = app;