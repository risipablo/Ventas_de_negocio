const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ProoveedorRouter = require('./Routes/proveedorRoute')
// const GastosRouter = require('./Routes/gastosRoute')
const ProductosRouter = require('./Routes/productosRouter')
const VentasRouter = require('./Routes/ventasRoute')
const NotasRouter = require('./Routes/notasRoute')
const StockRouter = require('./Routes/stockRoute')
const FileRoute = require('./Routes/filesRoute')
const GastosModel = require ('./Models/gastos')


require("dotenv").config();
const app = express();
app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:5173', 'https://ventas-de-negocio.onrender.com', 'https://ventas-de-negocio.vercel.app'],
    methods: 'GET,POST,DELETE,PATCH',
    optionsSuccessStatus: 200
};

mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("Conexión exitosa con MongoDB"))
    .catch((err) => console.error("Conexión fallida: " + err));

app.use(cors(corsOptions));

app.use('/api', StockRouter , NotasRouter, VentasRouter, ProductosRouter, ProoveedorRouter, FileRoute)


// Obtener gastos
app.get('/gastos', async (req, res) => {
    try {
        const gastos = await GastosModel.find();
        res.json(gastos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Agregar gastos
app.post('/add-gastos', async (req, res) => {
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
});


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





app.listen(3001, () => {
    console.log('Servidor funcionando en el puerto 3001');
})


