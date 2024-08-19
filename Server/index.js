const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const VentasModel = require ('./models/ventas')
const gastosRoutes = require('./routes/gastos');
const productosRoutes = require('./routes/productos');
const proveedorRoutes = require('./routes/proveedores')
const notasRoutes = require('./routes/notas')
const stockRoutes = require('./routes/stock')


require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: ['http://localhost:5173', 'https://ventas-de-negocio.vercel.app', 'https://server-ventas.onrender.com'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


mongoose.connect(process.env.MONGODB)
    .then(() => console.log("Conexión exitosa con MongoDB"))
    .catch((err) => console.error("Conexión fallida: " + err));


app.use('/gastos', gastosRoutes);
app.use('/productos', productosRoutes);
app.use('/proveedors', proveedorRoutes);
app.use('/notas', notasRoutes );
app.use('/stocks', stockRoutes);



// Obtener registro de ventas
app.get('/venta', async (req, res) => {
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



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('Servidor funcionando en el puerto 3001');
});
