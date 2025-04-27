const moongose = require('mongoose')

const notificacionSchema = new moongose.Schema({
    fecha:{
        type:String,
        required:true},
    titulo:{
        type:String,
        required:true
    }
})

const notiModel = moongose.model('Noti', notificacionSchema)
module.exports = notiModel