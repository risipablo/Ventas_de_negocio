import axios from "axios"
import { useState, useEffect } from "react"
import { config } from "../../components/config"

export const useClient = () => {
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const serverFront = config.Api

    useEffect(() => {
        fetchClients()
    }, [])

    const fetchClients = () => {
        setLoading(true)
        axios.get(`${serverFront}/api/client`)
            .then(response => {
                setClients(response.data)
                setError(null)
            })
            .catch(error => {
                console.error('Error fetching clients:', error)
                setError('Error al cargar clientes')
            })
            .finally(() => setLoading(false))
    }

    // Crear cliente
    const addClient = (client, date, product, price) => {
        if (!client.trim() || !date.trim() || !product.trim() || price <= 0) {
            alert('Por favor complete todos los campos correctamente')
            return
        }
        
        axios.post(`${serverFront}/api/client`, { client, date, product, price })
            .then(res => {
                setClients(prev => [...prev, res.data])
            })
            .catch(err => {
                console.error('Error adding client:', err)
                alert('Error al agregar cliente')
            })
    }

    // Eliminar cliente
    const deleteClient = (id) => {
        if (!window.confirm('¿Está seguro de eliminar este cliente?')) return
        
        axios.delete(`${serverFront}/api/client/${id}`)
            .then(() => {
                setClients(prev => prev.filter(c => c._id !== id))
            })
            .catch(err => {
                console.error('Error deleting client:', err)
                alert('Error al eliminar cliente')
            })
    }

    // AGREGAR SUSCRIPCIÓN
    const addSubscription = (id, date, product, price) => {
        if (!date || !product || price <= 0) {
            alert('Por favor complete todos los campos correctamente')
            return
        }
        
        axios.put(`${serverFront}/api/client/${id}/subscriptions`, { date, product, price })
            .then(res => {
                setClients(prev => prev.map(c => c._id === id ? res.data : c))
            })
            .catch(err => {
                console.error('Error adding subscription:', err)
                alert('Error al agregar suscripción')
            })
    }

    // EDITAR SUSCRIPCIÓN
    const editSubscription = (id, subscriptionIndex, date, product, price) => {
        if (!date || !product || price <= 0) {
            alert('Por favor complete todos los campos correctamente')
            return
        }
        
        axios.put(`${serverFront}/api/client/${id}/subscriptions/${subscriptionIndex}`, 
            { date, product, price }
        )
            .then(res => {
                setClients(prev => prev.map(c => c._id === id ? res.data : c))
            })
            .catch(err => {
                console.error('Error editing subscription:', err)
                alert('Error al editar suscripción')
            })
    }

    // ELIMINAR SUSCRIPCIÓN
    const deleteSubscription = (id, subscriptionIndex) => {
        if (!window.confirm('¿Está seguro de eliminar esta suscripción?')) return
        
        axios.delete(`${serverFront}/api/client/${id}/subscriptions/${subscriptionIndex}`)
            .then(res => {
                setClients(prev => prev.map(c => c._id === id ? res.data : c))
            })
            .catch(err => {
                console.error('Error deleting subscription:', err)
                alert('Error al eliminar suscripción')
            })
    }

    return {
        clients,
        addClient,
        deleteClient,
        addSubscription,
        editSubscription,
        deleteSubscription,
        loading,
        error,
        refetchClients: fetchClients
    }
}