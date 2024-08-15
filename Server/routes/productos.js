const express = require('express')
const ProductoModel = require('../models/Productos')

const app = express.Router();

// Obtener datos de productos
app.get('/productos', async (req, res) => {
    try {
        const productos = await ProductoModel.find();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Agregar productos
app.post('/add-productos', async (req, res) => {
    const { marca, mascota, edad, kilo, precio, categoria } = req.body;
    if (!marca || !mascota || !edad || !kilo || !precio || !categoria) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    try {
        const newProducto = new ProductoModel({ marca, mascota, edad, kilo, precio, categoria });
        const result = await newProducto.save();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Eliminar productos
app.delete('/delete-productos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ProductoModel.findByIdAndDelete(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Editar productos
app.patch('/edit-productos/:id', async (req, res) => {
    const { id } = req.params;
    const { marca, mascota, edad, kilo, precio } = req.body;
    try {
        const result = await ProductoModel.findByIdAndUpdate(id, { marca, mascota, edad, kilo, precio }, { new: true });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = app;