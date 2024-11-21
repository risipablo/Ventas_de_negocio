const express = require('express');
const { getNotas, addNotas, deleteNotas, editNotas, completedNotas } = require('../Controllers/notasController');
const router = express.Router()

router.get('/notas', getNotas)
router.post('/notas', addNotas)
router.delete('/notas/:id', deleteNotas)
router.patch('/notas/:id', editNotas)
router.patch('/notas/:id/completed', completedNotas)

module.exports = router;