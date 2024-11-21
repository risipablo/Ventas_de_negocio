const express = require('express')
const { getStock, addStock, deleteStock, editStock } = require('../Controllers/stockController')
const router = express.Router()


router.get('/stock', getStock);
router.post('/add-stock', addStock)
router.delete('/delete-stock/:id', deleteStock)
router.patch('/edit-stock/:id', editStock)

module.exports = router;