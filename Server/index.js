const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const GastosModel = require('./models/gastos');
const ProductoModel = require('./models/productos');
const NotaModel = require('./models/notas');
const ProveedorModel = require('./models/proveedor');
const StockModel = require('./models/stock');
const File = require ('./models/files')
const multer = require('multer');
const VentasModel = require('./models/ventas');


require("dotenv").config();
const app = express();
app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:5173', 'https://ventas-de-negocio.onrender.com', 'https://ventas-de-negocio.vercel.app'],
    methods: 'GET,POST,DELETE,PATCH',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("Conexión exitosa con MongoDB"))
    .catch((err) => console.error("Conexión fallida: " + err));


// Ventas

// Obtener registro de ventas
app.get('/ventas', async (req, res) => {
   
    try {
        const ventas = await VentasModel.find();
        res.json(ventas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Agregar registro de ventas
app.post('/add-ventas', async (req, res) => {
   
    const { day, month, year, total, tp, product, boleta } = req.body;
    if (!day || !month ||!year || !tp || !product || !total || !boleta ) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    try {
        const newVenta = new VentasModel({ day, month, total, tp, product, boleta,year });
        const result = await newVenta.save();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Eliminar ventas
app.delete('/delete-ventas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await VentasModel.findByIdAndDelete(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Editar Ventas
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
  

// Gastos

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
    if (!proveedor || !dia || !mes  || !factura || !monto || !estado) {
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



// Productos

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
    const { marca, mascota, edad,condicion, kilo, precio, categoria } = req.body;
    if (!marca || !mascota || !edad || !condicion || !kilo || !precio || !categoria) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    try {
        const newProducto = new ProductoModel({ marca, mascota, edad, condicion, kilo, precio, categoria });
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
    const { marca, mascota, edad, condicion, kilo, precio } = req.body;
    try {
        const result = await ProductoModel.findByIdAndUpdate(id, { marca, mascota, edad, condicion, kilo, precio }, { new: true });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Notas

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
    const { notas, meses, description } = req.body;
    if (!notas || !meses || !description) {
        return res.status(400).json({ error: 'Nota no proporcionada' });
    }
    try {
        const newNota = new NotaModel({ notas, meses, description});
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
    const { notas, meses, description } = req.body;
    NotaModel.findByIdAndUpdate(id, { notas, meses, description }, { new: true })
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


// Proveedores

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


// Stock

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

//Eliminar Stock
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

// Editar Stock
app.patch('/edit-stock/:id', async ( req, res ) => {
    const {id} = req.params;
    const { brands, pet, size, kg, amount, condition } = req.body;
    try{
        const result = await StockModel.findByIdAndUpdate(id, { brands, pet, size, kg, amount, condition }, {new: true} );
        res.json(result)
    } catch (err) {
        res.status(500).json({ error:err.message })
    }
})

// Configuración de multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Ruta para subir archivos
app.post('/upload', upload.single('file'), async (req, res) => {
    const file = new File({
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        data: req.file.buffer
    });

    try {
        await file.save();
        res.status(201).send({ message: 'Archivo subido exitosamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al subir el archivo', error });
    }
});

// Ruta para listar archivos
app.get('/files', async (req, res) => {
    try {
        const files = await File.find({});
        res.status(200).json(files);
    } catch (error) {
        res.status(500).send({ message: 'Error al listar archivos', error });
    }
});


// Ruta para descargar/ver un archivo
app.get('/files/:id', async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        // Verificar el tipo de contenido (en este caso, application/pdf para PDFs)
        res.set({
            'Content-Type': file.contentType, // Esto debería ser 'application/pdf' para PDFs
            'Content-Disposition': `inline; filename=${file.filename}` // inline para visualización
        });

        // Enviar el archivo al cliente
        res.send(file.data);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el archivo', error });
    }
});


app.delete('/delete-files/:id', async (req,res) => {
    const { id } = req.params;
    try {
        const deleteFiles = await File.findByIdAndDelete(id)
        if (!deleteFiles){
            return res.status(404).json({ error: 'files not found'})
        }
        res.json(deleteFiles)
    } catch {
        res.status(500).json( {error:err.message})
    }
})


app.listen(3001, () => {
    console.log('Servidor funcionando en el puerto 3001');
})
