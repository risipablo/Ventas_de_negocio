const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    filename: String,
    path: String,
    originalName: String,
    createdAT: {
        type:Date,
        default: Date.now
    }
})

const FileModel = mongoose.model('File', fileSchema);
module.exports = FileModel; 

