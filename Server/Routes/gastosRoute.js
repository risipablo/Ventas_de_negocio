const express = require('express');
const {addGastos, deleteGastos, editGastos, getGastos } = require('../Controllers/gastosController');
const router = express.Router();

router.get('/gastos',getGastos)
router.post('/gastos', addGastos)
router.delete('/gastos/:id', deleteGastos)
router.patch('/gastos/:id' , editGastos)

module.exports = router;