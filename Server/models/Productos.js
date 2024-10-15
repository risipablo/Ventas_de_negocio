const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema({
    
    marca:{
        type:String,
        required:true,
    },

    mascota:{
        type:String,
        required:true
    },

    edad:{
        type:String,
        required:true
    },

    kilo:{
        type:String,
        required:true
    },
    
    condicion:{
        type:String,
        required:true
    },

    precio:{
        type:Number,
        required:true
    },

    categoria:{
        type:String,
        required:true
    }
})

const Productos = mongoose.model('producto', productoSchema)
module.exports = Productos;