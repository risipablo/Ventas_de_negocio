const express = require('express')
const { getProveedor, addProveedor, editProveedor, deleteProveedor } = require('../Controllers/proveedorController')
const router = express.Router()

router.get('/proveedors', getProveedor)
router.post('/proveedors', addProveedor)
router.delete('/proveedors/:id', deleteProveedor)
router.patch('/proveedors/:id', editProveedor)

module.exports = router;
