const mongoose = require('mongoose')

const notaSchema = new mongoose.Schema({
    notas:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    meses:{
        type:String,
        required:true
    },
    completed: {
        type:Boolean,
        default: false
    }
})

const NotasModel = mongoose.model('Nota',notaSchema);
module.exports = NotasModel;