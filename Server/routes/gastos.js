const express = require('express')
const GastosModel = require ('../models/Gastos');

const route = express.Router();


// Obtener gastos
route.get('/', async (req,res) => {
    try {
        const gastos = await GastosModel.find();
        res.json(gastos);
    }  catch (err) {
        res.status(500).json({ error:err.message })
    }
})

// Agregar gastos
route.post('/add-gastos', async (req,res) => {
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
route.delete('/delete-gastos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await GastosModel.findByIdAndDelete(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Editar gastos
route.patch('/edit-gastos/:id', async (req, res) => {
    const { id } = req.params;
    const { estado, proveedor, monto, factura } = req.body;
    try {
        const result = await GastosModel.findByIdAndUpdate(id, { estado, proveedor, monto, factura }, { new: true });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = route;