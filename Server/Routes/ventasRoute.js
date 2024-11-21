const express = require('express')
const { getVentas, addventas, deleteVentas, editVentas } = require('../Controllers/ventasController')
const router = express.Router()

router.get('/ventas', getVentas)
router.post('/ventas', addventas)
router.delete('/ventas/:id', deleteVentas)
router.patch('/ventas/:id', editVentas)

module.exports = router;