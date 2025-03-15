const moongose = require('mongoose')

const notificacionSchema = new moongose.Schema({
    titulo:{
        type:String,
        required:true
    }
})

const notiModel = moongose.model('Noti', notificacionSchema)
module.exports = notiModel