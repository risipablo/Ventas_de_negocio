const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    client: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    product: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    subDates: {
        type: [Date],
        default: []
    },
    subProduct: {
        type: [String],
        default: []
    },
    subPrice: {
        type: [Number],
        default: []
    }
}, {
    timestamps: true
})

const ClientModel = mongoose.model('Client', clientSchema)
module.exports = ClientModel