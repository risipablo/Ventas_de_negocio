const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const VentasModel = require('./models/Ventas');
const GastosModel = require('./models/gastos');
require("dotenv").config();
const app = express();


app.use(express.json());

const corsOptions ={
    origin: ['http://localhost:5173', 'https://ventas-de-negocio.vercel.app'],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));



mongoose
.connect(process.env.MONGODB)
.then(() => console.log("conexión exitosa con MongoDb"))
.catch((err) => console.log("Conexión fallida: " + err))



// Obtener registro de ventas
app.get('/ventas', async (req, res) => {
    try {
        const ventas = await VentasModel.find();
        res.json(ventas);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});


// Agregar registro de ventas
app.post('/add-ventas', (req,res) => {
    const { day, month, total, tp, product } = req.body;
    if(!day || !month || !tp || !product || !total) {
        return res.status(400).json({error});
    }
    const newVenta = new VentasModel({ day, month, total, tp, product });
    newVenta.save()
    .then(result =>{
        console.log(result);
        res.json(result)
    })
    .catch(err => {
        console.err(err)
        res.status(500).json({error: err.message})
    })
})

// Eliminar ventas

app.delete('/delete-ventas/:id', (req,res) => {
    const {id} = req.params;
    VentasModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({error:err.message}))
})

// Editar Ventas

app.patch('/edit-ventas/:id', (req,res) => {
    const { id } = req.params;
    const { total, product , tp , boleta  } = req.body;
    VentasModel.findByIdAndUpdate(id,{total, product , tp , boleta },{new:true})
    .then(result => res.json(result))
    .catch(err => res.status(500).json({error: err.message}))
})



//Obtener gastos

app.get('/gastos', async (req, res) => {
    try {
        const gastos = await GastosModel.find();
        res.json(gastos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Agregar gastos

app.post('/add-gastos', (req,res) => {
    const { proveedor, dia , mes, factura, monto, estado } = req.body;
    if(!proveedor || !dia || !mes || !factura || !monto || !estado){
        return res.status(400).json({error});
    } 
    const newGasto = new GastosModel({proveedor, dia , mes, factura, monto, estado});
    newGasto.save()
    .then(result => {
        console.log(result);
        res.json(result)
    })
    .catch(err => {
        console.err(err)
        res.status(500).json({error: err.message})
    })
})

//Eliminar gastos

app.delete('/delete-gastos/:id', (req,res) => {
    const {id} = req.params;
    GastosModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.json(500).json({error: err.message }))
})


// Editar gastos
app.patch('/edit-gastos/:id', (req,res) => {
    const { id } = req.params;
    const { estado, proveedor, monto, factura } = req.body;
    GastosModel.findByIdAndUpdate(id,{estado , proveedor, monto, factura},{new:true})
    .then(result => res.json(result))
    .catch(err => res.status(500).json({error: err.message}))
})


app.listen(3001, () =>{
    console.log('Servidor funcionando en 3001')
})