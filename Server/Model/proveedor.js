const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
    
    proveedores:{
        type:String,
        required: true,
    },

    marcas:{
        type:String,
        required:true,
    },
    
    mascotas:{
        type:String,
        required:true
    },

    edades:{
        type:String,
        required:true
    },

    kilos:{
        type:String,
        required:true
    },

    precios:{
        type:Number,
        required:true
    }

})

const Proveedores = mongoose.model('proveedor', proveedorSchema)
module.exports = Proveedores;