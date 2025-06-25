const mongoose = require('mongoose')

const recordatorioSchema = new mongoose.Schema({
    fecha:{
        type:String,
        required:true
    },
    titulo : {
        type: String,
        required:true
    },
})

const recordatorioModel = mongoose.model('Recordatorio', recordatorioSchema)
module.exports = recordatorioModel