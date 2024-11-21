const ProductoModel = require('../Models/productos')

// Obtener datos de productos
exports.getProductos = async (req, res) => {
    try {
        const productos = await ProductoModel.find();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Agregar productos
exports.addProductos = async (req, res) => {
    const { marca, mascota, edad,condicion, kilo, precio, categoria } = req.body;
    if (!marca || !mascota || !edad || !condicion || !kilo || !precio || !categoria) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    try {
        const newProducto = new ProductoModel({ marca, mascota, edad, condicion, kilo, precio, categoria });
        const result = await newProducto.save();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Eliminar productos
exports.deleteProductos =  async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ProductoModel.findByIdAndDelete(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Editar productos
exports.editProductos = async (req, res) => {
    const { id } = req.params;
    const { marca, mascota, edad, condicion, kilo, precio } = req.body;
    try {
        const result = await ProductoModel.findByIdAndUpdate(id, { marca, mascota, edad, condicion, kilo, precio }, { new: true });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
