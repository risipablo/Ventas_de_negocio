const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const ventasRoutes = require('./routes/ventas')
const gastosRoutes = require('./routes/gastos');
const productosRoutes = require('./routes/productos');
const proveedorRoutes = require('./routes/proveedores')
const notasRoutes = require('./routes/notas')
const stockRoutes = require('./routes/stock')

const VentasModel = require('./models/Ventas');
const multer = require('multer');

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

app.use('/venta', ventasRoutes);
app.use('/gastos', gastosRoutes);
app.use('/productos', productosRoutes);
app.use('/proveedors', proveedorRoutes);
app.use('/notas', notasRoutes )
app.use('/stocks', stockRoutes)


const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
}).single('file'); // Specify the name of the file field in the form

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error uploading file', error: err.message });
        }
        res.status(200).json({ message: 'File uploaded successfully' });
    });
});


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log('Servidor funcionando en el puerto 3001');
});
