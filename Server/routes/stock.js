const express = require('express')
const StockModel = require('../models/Stock')

const routes = express.Router()


// Obtener stock
routes.get('/stocks', async (req, res) => {
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


routes.delete('/delete-stock/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const stock = await StockModel.findByIdAndDelete(id);
        if (!stock) {
            return res.status(404).json({ error: 'Stock not found' });
        }
        res.json(stock);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// Sumar cantidad
routes.patch('/sumar-stock/:id', async (req,res) => {
    try {
        const {cantidad} = req.body;
        const stockActualizado = await StockModel.findByIdAndUpdate(req.params.id, {amount:cantidad} , {new:true})
        res.json(stockActualizado)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = routes; 