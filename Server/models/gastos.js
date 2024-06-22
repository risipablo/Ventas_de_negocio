const mongoose = require('mongoose');

const gastoSchema = new mongoose.Schema({
  proveedor: {
    type: String,
    required: true
  },
  dia: {
    type: String,
    required: true
  },
  mes: {
    type: String,
    required: true
  },
  factura: {
    type: String,
    required: true
  },
  monto: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    required: true
  }
});

const GastosModel = mongoose.model('Gasto', gastoSchema);
module.exports = GastosModel;
