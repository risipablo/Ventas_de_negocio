const express = require('express')
const router = express.Router()
const clientController = require('../controller/clientController')

// Rutas para clientes
router.get('/client', clientController.getAllClients)
router.post('/client', clientController.createClient)
router.delete('/client/:id', clientController.deleteClient)

// Rutas para suscripciones
router.put('/client/:id/subscriptions', clientController.addSubscription) // Agregar
router.put('/client/:id/subscriptions/:subscriptionIndex', clientController.editSubscription) // Editar
router.delete('/client/:id/subscriptions/:subscriptionIndex', clientController.deleteSubscription) // Eliminar

module.exports = router