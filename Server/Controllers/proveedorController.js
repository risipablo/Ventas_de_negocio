
const ProveedorModel = require('../Models/Proveedor');

// Obtener datos de los proveedores
exports.getProveedor = async (req, res) => {
    try {
        const proveedores = await ProveedorModel.find();
        res.json(proveedores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Agregar proveedores
exports.addProveedor = async (req, res) => {
    const { proveedores, marcas, edades, kilos, precios, mascotas } = req.body;
    if (!proveedores || !marcas || !edades || !kilos || !precios || !mascotas) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    try {
        const newProveedor = new ProveedorModel({ proveedores, marcas, edades, kilos, precios, mascotas });
        const result = await newProveedor.save();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


// Eliminar proveedores
exports.deleteProveedor = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ProveedorModel.findByIdAndDelete(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Editar proveedores
exports.editProveedor = async (req, res) => {
    const { id } = req.params;
    const { proveedores, marcas, mascotas, edades, kilos, precios } = req.body;
    try {
        const result = await ProveedorModel.findByIdAndUpdate(id, { proveedores, marcas, mascotas, edades, kilos, precios }, { new: true });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};