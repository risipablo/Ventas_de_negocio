const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const VentasModel = require('./models/Ventas');
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
.connect(process.env.MONGODB_URI)
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


app.delete('/delete-ventas/:id' ,(req,res) => {
    const {id} = req.params;
    VentasModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({error:err.message}))
})


app.listen(3001, () =>{
    console.log('Servidor funcionando en 3001')
})