const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const ventasRoutes = require('./routes/ventas');
const gastosRoutes = require ('./routes/gastos');
const ProductoModel = require('./models/Productos');
const NotaModel = require('./models/Notas');
const ProveedorModel = require('./models/Proveedor');
const StockModel = require('./models/Stock');
require("dotenv").config();

const app = express();


app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:5173', 'https://ventas-de-negocio.vercel.app'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("Conexión exitosa con MongoDB"))
    .catch((err) => console.error("Conexión fallida: " + err));

    

app.use('/ventas', ventasRoutes);
app.use('/gastos', gastosRoutes);


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

// Ruta para obtener notas
app.get('/notas', async (req, res) => {
    try {
        const notas = await NotaModel.find();
        res.json(notas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ruta para añadir una nota
app.post('/add-notas', async (req, res) => {
    const { notas, meses } = req.body;
    if (!notas || !meses) {
        return res.status(400).json({ error: 'Nota no proporcionada' });
    }
    try {
        const newNota = new NotaModel({ notas, meses});
        const result = await newNota.save();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Eliminar notas
app.delete('/delete-notas/:id', (req, res) => {
    const { id } = req.params;
    NotaModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Editar notas
app.patch('/edit-notas/:id', (req, res) => {
    const { id } = req.params;
    const { notas, meses } = req.body;
    NotaModel.findByIdAndUpdate(id, { notas, meses }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});


// Completar notas
app.patch('/completed-notas/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    NotaModel.findByIdAndUpdate(id, { completed }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});


// Obtener datos de los proveedores
app.get('/proveedors', async (req, res) => {
    try {
        const proveedores = await ProveedorModel.find();
        res.json(proveedores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Agregar proveedores
app.post('/add-proveedors', async (req, res) => {
    const { proveedores, marcas, edades, kilos, precios, mascotas } = req.body;
    if (!proveedores || !marcas || !edades || !kilos || !precios || !mascotas) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    try {
        const newProveedor = new ProveedorModel({ proveedores, marcas, edades, kilos, precios, mascotas });
        const result = await newProveedor.save();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Eliminar proveedores
app.delete('/delete-proveedors/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ProveedorModel.findByIdAndDelete(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Editar proveedores
app.patch('/edit-proveedors/:id', async (req, res) => {
    const { id } = req.params;
    const { proveedores, marcas, mascotas, edades, kilos, precios } = req.body;
    try {
        const result = await ProveedorModel.findByIdAndUpdate(id, { proveedores, marcas, mascotas, edades, kilos, precios }, { new: true });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Obtener stock
app.get('/stock', async (req, res) => {
    try {
        const stock = await StockModel.find();
        res.json(stock);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Agregar stock
app.post('/add-stock', async (req, res) => {
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


app.delete('/delete-stock/:id', async (req, res) => {
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
app.patch('/sumar-stock/:id', async (req,res) => {
    try {
        const {cantidad} = req.body;
        const stockActualizado = await StockModel.findByIdAndUpdate(req.params.id, {amount:cantidad} , {new:true})
        res.json(stockActualizado)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.listen(3001, () => {
    console.log('Servidor funcionando en el puerto 3001');
});
