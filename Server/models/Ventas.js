
const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
    day:{
        type:String,
        required: true
    },
    month:{
        type:String,
        required: true
    },
    tp:{
        type:String,
        required: true
    },
    product:{
        type:String,
        required: true
    },
    total:{
        type:Number,
        required: true
    }
})

const Ventas = mongoose.model('venta', ventaSchema)
module.exports = Ventas;