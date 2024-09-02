const mongoose = require('mongoose')

const notaSchema = new mongoose.Schema({
    notas:{
        type: String,
        require:true
    },
    description:{
        type: String,
        require:true
    },
    meses:{
        type:String,
        require:true
    },
    completed: {
        type:Boolean,
        default: false
    }
})

const NotasModel = mongoose.model('Nota',notaSchema);
module.exports = NotasModel;