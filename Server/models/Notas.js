const mongoose = require('mongoose')

const notaSchema = new mongoose.Schema({
    notas:{
        type: String,
        require:true
    }
})

const NotasModel = mongoose.model('Nota',notaSchema);
module.exports = NotasModel;