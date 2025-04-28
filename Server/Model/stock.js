const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({

    brands:{ 
    type: String,
    required: true
    },

    size:{
        type:String,
        required:true
    },

    pet:{
        type: String,
        required:true
    },

    estado:{
        type: String,
        required:true
    },

    kg:{
        type: String,
        required:true
    },

    amount: {
        type: Number,
        required: true
    },

    condition:{
        type:String,
        required:true
    }
})

const StockModel = mongoose.model('Stock', stockSchema);
module.exports = StockModel;