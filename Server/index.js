const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const ventasRoutes = require('./routes/ventas')
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
    origin: ['http://localhost:5173', 'https://ventas-de-negocio.vercel.app'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


mongoose.connect(process.env.MONGODB)
    .then(() => console.log("Conexión exitosa con MongoDB"))
    .catch((err) => console.error("Conexión fallida: " + err));

app.use('/ventas', ventasRoutes);
app.use('/gastos', gastosRoutes);
app.use('/productos', productosRoutes);
app.use('/proveedors', proveedorRoutes);
app.use('/notas', notasRoutes )
app.use('/stocks', stockRoutes)



app.listen(3001, () => {
    console.log('Servidor funcionando en el puerto 3001');
});
