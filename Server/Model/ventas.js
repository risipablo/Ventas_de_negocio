
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
    year:{
        type: Number,
        required: true
    },
    tp:{
        type:String,
        required: true
    },
    boleta:{
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

const VentasModel = mongoose.model('Ventas', ventaSchema)
module.exports = VentasModel;