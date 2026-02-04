const ClientModel = require('../models/clients')

// Obtener todos los clientes
exports.getAllClients = async (req, res) => {
    try {
        const clients = await ClientModel.find().sort({ createdAt: -1 })
        res.json(clients)
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
}

// Crear nuevo cliente
exports.createClient = async (req, res) => {
    const { client, date, product, price } = req.body
    
    try {
        const newClient = new ClientModel({
            client,
            date: date || Date.now(),
            product,
            price
        })
        
        const savedClient = await newClient.save()
        res.status(201).json(savedClient)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

// Eliminar cliente
exports.deleteClient = async (req, res) => {
    const { id } = req.params
    
    try {
        const deletedClient = await ClientModel.findByIdAndDelete(id)
        if (!deletedClient) {
            return res.status(404).json({ error: 'Cliente no encontrado' })
        }
        res.json({ message: 'Cliente eliminado correctamente' })
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
}

// AGREGAR NUEVA SUSCRIPCIÓN (ya lo tenías)
exports.addSubscription = async (req, res) => {
    const { id } = req.params
    const { date, product, price } = req.body
    
    try {
        const client = await ClientModel.findById(id)
        if (!client) {
            return res.status(404).json({ error: 'Cliente no encontrado' })
        }
        
        // Validar datos
        if (!date || !product || price === undefined) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' })
        }
        
        // Agregar a los arrays
        client.subDates.push(new Date(date))
        client.subProduct.push(product)
        client.subPrice.push(Number(price))
        
        const updatedClient = await client.save()
        res.json(updatedClient)
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
}

// EDITAR UNA SUSCRIPCIÓN ESPECÍFICA
exports.editSubscription = async (req, res) => {
    const { id, subscriptionIndex } = req.params
    const { date, product, price } = req.body
    
    try {
        const client = await ClientModel.findById(id)
        if (!client) {
            return res.status(404).json({ error: 'Cliente no encontrado' })
        }
        
        // Validar que el índice exista
        if (subscriptionIndex < 0 || subscriptionIndex >= client.subDates.length) {
            return res.status(400).json({ error: 'Índice de suscripción inválido' })
        }
        
        // Actualizar los datos
        if (date) client.subDates[subscriptionIndex] = new Date(date)
        if (product) client.subProduct[subscriptionIndex] = product
        if (price !== undefined) client.subPrice[subscriptionIndex] = Number(price)
        
        const updatedClient = await client.save()
        res.json(updatedClient)
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
}

// ELIMINAR UNA SUSCRIPCIÓN ESPECÍFICA
exports.deleteSubscription = async (req, res) => {
    const { id, subscriptionIndex } = req.params
    
    try {
        const client = await ClientModel.findById(id)
        if (!client) {
            return res.status(404).json({ error: 'Cliente no encontrado' })
        }
        
        // Validar que el índice exista
        if (subscriptionIndex < 0 || subscriptionIndex >= client.subDates.length) {
            return res.status(400).json({ error: 'Índice de suscripción inválido' })
        }
        
        // Eliminar de los tres arrays
        client.subDates.splice(subscriptionIndex, 1)
        client.subProduct.splice(subscriptionIndex, 1)
        client.subPrice.splice(subscriptionIndex, 1)
        
        const updatedClient = await client.save()
        res.json(updatedClient)
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
}