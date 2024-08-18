const express = require('express')
const StockModel = require('../models/Stock')

const routes = express.Router()

// Obtener stock
routes.get('/stock', async (req, res) => { 
    try {
        const stock = await StockModel.find();
        res.json(stock);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Agregar stock
routes.post('/add-stock', async (req, res) => {
    const { brands, pet, size, kg, amount, condition } = req.body;
    if (!brands || !pet || !size || !kg || !amount || !condition) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    try {
        const newStock = new StockModel({ brands, pet, size, kg, amount, condition });
        const result = await newStock.save();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Eliminar stock
routes.delete('/delete-stock/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const stock = await StockModel.findByIdAndDelete(id);
        if (!stock) {
            return res.status(404).json({ error: 'Producto no encontrado' }); // Cambié el mensaje a español
        }
        res.json(stock);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Editar stock
routes.patch('/edit-stock/:id', async (req, res) => {
    const { id } = req.params;
    console.log("ID recibido:", id); // Log para verificar el ID
    const { brands, pet, size, kg, amount, condition } = req.body;
    try {
        const result = await StockModel.findByIdAndUpdate(id, { brands, pet, size, kg, amount, condition }, { new: true });
        if (!result) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = routes;

