const express = require('express')
const VentasModel = require ('../models/Ventas')

const router = express.Router();


// Obtener registro de ventas
router.get('/', async (req, res) => {
    try {
        const ventas = await VentasModel.find();
        res.json(ventas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Agregar registro de ventas
router.post('/add', async (req, res) => {
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
route.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await VentasModel.findByIdAndDelete(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Editar registro de ventas
router.patch('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { total, product, tp, boleta } = req.body;
    try {
        const result = await VentasModel.findByIdAndUpdate(id, { total, product, tp, boleta }, { new: true });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


