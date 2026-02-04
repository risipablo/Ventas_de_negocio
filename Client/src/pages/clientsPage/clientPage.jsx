import { useState } from "react"


import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Box,
    Typography,
    IconButton,
    Collapse,
    Alert,
    CircularProgress,
    Container,
    Stack,
    Chip
} from '@mui/material'
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
    Add as AddIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
    PersonAdd as PersonAddIcon
} from '@mui/icons-material'
import { useClient } from "./useClient"

export const ClientPage = () => {
    const { 
        clients, 
        addClient, 
        deleteClient, 
        addSubscription,
        editSubscription,
        deleteSubscription,
        loading, 
        error 
    } = useClient()

    const [client, setClient] = useState("")
    const [date, setDate] = useState("")
    const [product, setProduct] = useState("")
    const [price, setPrice] = useState("")

    const handleAdd = () => {
        if (!client.trim() || !date.trim() || !product.trim() || !price || Number(price) <= 0) {
            alert('Por favor complete todos los campos correctamente')
            return
        }
        
        addClient(client, date, product, Number(price))
        setClient('')
        setDate('')
        setProduct('')
        setPrice("")
    }

    return(
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
                Gestión de Clientes
            </Typography>

            {/* Formulario principal */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    Agregar Nuevo Cliente
                </Typography>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField 
                        label="Cliente" 
                        value={client} 
                        onChange={(e) => setClient(e.target.value)}
                        fullWidth
                    />
                    <TextField 
                        type="date" 
                        label="Fecha"
                        value={date} 
                        onChange={(e) => setDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />
                    <TextField 
                        label="Producto" 
                        value={product} 
                        onChange={(e) => setProduct(e.target.value)}
                        fullWidth
                    />
                    <TextField 
                        type="number" 
                        label="Precio" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
                    />
                    <Button 
                        variant="contained" 
                        onClick={handleAdd}
                        startIcon={<PersonAddIcon />}
                        sx={{ minWidth: 200, height: 56 }}
                    >
                        Agregar Cliente
                    </Button>
                </Stack>
            </Paper>

            {loading && (
                <Box display="flex" justifyContent="center" my={4}>
                    <CircularProgress />
                </Box>
            )}
            
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {/* Tabla de clientes */}
            {Array.isArray(clients) && clients.length > 0 ? (
                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#1976d2' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} />
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Cliente</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Fecha</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Producto</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Precio</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Suscripciones</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clients.map(c => (
                                <ClientRow 
                                    key={c._id}
                                    client={c}
                                    deleteClient={deleteClient}
                                    addSubscription={addSubscription}
                                    editSubscription={editSubscription}
                                    deleteSubscription={deleteSubscription}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : !loading ? (
                <Alert severity="info">No hay clientes registrados</Alert>
            ) : null}
        </Container>
    )
}

// Componente para cada fila de cliente
const ClientRow = ({ client, deleteClient, addSubscription, editSubscription, deleteSubscription }) => {
    const [open, setOpen] = useState(false)
    const [subDate, setSubDate] = useState("")
    const [subProduct, setSubProduct] = useState("")
    const [subPrice, setSubPrice] = useState("")
    
    // Estados para edición
    const [editingIndex, setEditingIndex] = useState(null)
    const [editDate, setEditDate] = useState("")
    const [editProduct, setEditProduct] = useState("")
    const [editPrice, setEditPrice] = useState("")

    const handleAddSubscription = () => {
        if (!subDate || !subProduct || !subPrice || Number(subPrice) <= 0) {
            alert('Por favor complete todos los campos correctamente')
            return
        }
        
        addSubscription(client._id, subDate, subProduct, Number(subPrice))
        setSubDate("")
        setSubProduct("")
        setSubPrice("")
    }

    const handleEditSubscription = (index) => {
        if (!editDate || !editProduct || !editPrice || Number(editPrice) <= 0) {
            alert('Por favor complete todos los campos correctamente')
            return
        }
        
        editSubscription(client._id, index, editDate, editProduct, Number(editPrice))
        setEditingIndex(null)
        setEditDate("")
        setEditProduct("")
        setEditPrice("")
    }

    const startEdit = (index) => {
        setEditingIndex(index)
        setEditDate(client.subDates[index] ? new Date(client.subDates[index]).toISOString().split('T')[0] : "")
        setEditProduct(client.subProduct?.[index] || "")
        setEditPrice(client.subPrice?.[index]?.toString() || "")
    }

    const cancelEdit = () => {
        setEditingIndex(null)
        setEditDate("")
        setEditProduct("")
        setEditPrice("")
    }

    const subscriptionCount = client.subDates?.length || 0

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' }, '&:hover': { backgroundColor: '#f5f5f5' } }}>
                <TableCell>
                    <IconButton
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Typography fontWeight="bold">{client.client}</Typography>
                </TableCell>
                <TableCell>{new Date(client.date).toLocaleDateString()}</TableCell>
                <TableCell>{client.product}</TableCell>
                <TableCell>
                    <Typography color="primary" fontWeight="bold">
                        ${client.price}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Chip 
                        label={subscriptionCount} 
                        color={subscriptionCount > 0 ? "primary" : "default"}
                        size="small"
                    />
                </TableCell>
                <TableCell align="center">
                    <IconButton 
                        color="error"
                        onClick={() => {
                            if (window.confirm('¿Eliminar este cliente?')) {
                                deleteClient(client._id)
                            }
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            
            {/* Fila expandible con suscripciones */}
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 3 }}>
                            <Typography variant="h6" gutterBottom component="div" sx={{ mb: 2 }}>
                                Suscripciones
                            </Typography>
                            
                            {/* Tabla de suscripciones */}
                            {client.subDates && client.subDates.length > 0 && (
                                <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                                <TableCell><strong>Fecha</strong></TableCell>
                                                <TableCell><strong>Producto</strong></TableCell>
                                                <TableCell><strong>Precio</strong></TableCell>
                                                <TableCell align="center"><strong>Acciones</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {client.subDates.map((date, index) => (
                                                <TableRow key={index}>
                                                    {editingIndex === index ? (
                                                        <>
                                                            <TableCell>
                                                                <TextField 
                                                                    type="date" 
                                                                    value={editDate}
                                                                    onChange={(e) => setEditDate(e.target.value)}
                                                                    size="small"
                                                                    fullWidth
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <TextField 
                                                                    value={editProduct}
                                                                    onChange={(e) => setEditProduct(e.target.value)}
                                                                    size="small"
                                                                    fullWidth
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <TextField 
                                                                    type="number" 
                                                                    value={editPrice}
                                                                    onChange={(e) => setEditPrice(e.target.value)}
                                                                    size="small"
                                                                    fullWidth
                                                                />
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <IconButton 
                                                                    color="success"
                                                                    onClick={() => handleEditSubscription(index)}
                                                                    size="small"
                                                                >
                                                                    <SaveIcon />
                                                                </IconButton>
                                                                <IconButton 
                                                                    onClick={cancelEdit}
                                                                    size="small"
                                                                >
                                                                    <CancelIcon />
                                                                </IconButton>
                                                            </TableCell>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <TableCell>{new Date(date).toLocaleDateString()}</TableCell>
                                                            <TableCell>{client.subProduct?.[index] || 'N/A'}</TableCell>
                                                            <TableCell>
                                                                <Typography color="primary" fontWeight="bold">
                                                                    ${client.subPrice?.[index] || '0'}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <IconButton 
                                                                    color="warning"
                                                                    onClick={() => startEdit(index)}
                                                                    size="small"
                                                                >
                                                                    <EditIcon />
                                                                </IconButton>
                                                                <IconButton 
                                                                    color="error"
                                                                    onClick={() => {
                                                                        if (window.confirm('¿Eliminar esta suscripción?')) {
                                                                            deleteSubscription(client._id, index)
                                                                        }
                                                                    }}
                                                                    size="small"
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </TableCell>
                                                        </>
                                                    )}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}

                            {/* Formulario para agregar suscripción */}
                            <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Agregar Nueva Suscripción
                                </Typography>
                                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                                    <TextField 
                                        type="date" 
                                        value={subDate}
                                        onChange={(e) => setSubDate(e.target.value)}
                                        label="Fecha"
                                        InputLabelProps={{ shrink: true }}
                                        size="small"
                                        fullWidth
                                    />
                                    <TextField 
                                        value={subProduct}
                                        onChange={(e) => setSubProduct(e.target.value)}
                                        label="Producto"
                                        size="small"
                                        fullWidth
                                    />
                                    <TextField 
                                        type="number" 
                                        value={subPrice}
                                        onChange={(e) => setSubPrice(e.target.value)}
                                        label="Precio"
                                        size="small"
                                        fullWidth
                                    />
                                    <Button 
                                        variant="contained" 
                                        onClick={handleAddSubscription}
                                        startIcon={<AddIcon />}
                                        sx={{ minWidth: 200 }}
                                    >
                                        Agregar
                                    </Button>
                                </Stack>
                            </Paper>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}