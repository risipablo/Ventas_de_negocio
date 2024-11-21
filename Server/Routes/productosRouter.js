const express = require('express')
const { getProductos, addProductos, deleteProductos, editProductos } = require('../Controllers/productsController')
const router = express.Router()

router.get('/productos', getProductos)
router.post('/productos', addProductos)
router.delete('/productos/:id', deleteProductos)
router.patch('/productos/:id', editProductos)

module.exports = router;