const express = require('express')
const GastosModel = require ('../models/Gastos');

const app = express.Router();


// Obtener gastos
app.get('/gastos', async (req,res) => {
    try {
        const gastos = await GastosModel.find();
        res.json(gastos);
    }  catch (err) {
        res.status(500).json({ error:err.message })
    }
})

// Agregar gastos
app.post('/add-gastos', async (req,res) => {
    const { proveedor, dia, mes, factura, monto, estado } = req.body;
        if (!proveedor || !dia || !mes || !factura || !monto || !estado) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }
        try {
            const newGasto = new GastosModel({ proveedor, dia, mes, factura, monto, estado });
            const result = await newGasto.save();
            res.json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
})

// Eliminar gastos
app.delete('/delete-gastos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await GastosModel.findByIdAndDelete(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Editar gastos
app.patch('/edit-gastos/:id', async (req, res) => {
    const { id } = req.params;
    const { estado, proveedor, monto, factura } = req.body;
    try {
        const result = await GastosModel.findByIdAndUpdate(id, { estado, proveedor, monto, factura }, { new: true });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = app;