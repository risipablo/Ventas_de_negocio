
const StockModel = require('../Models/Stock');

exports.getStock = async (req, res) => {
    try {
        const stock = await StockModel.find();
        res.json(stock);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Agregar stock
exports.addStock = async (req, res) => {
    const { brands, pet, size, kg, amount, condition } = req.body;
    if (!brands || !pet || !size || !kg || !amount || !condition) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    try {
        const newStock = new StockModel({ brands, pet, size, kg, amount, condition });
        const result = await newStock.save();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

//Eliminar Stock
exports.deleteStock = async (req, res) => {
    const { id } = req.params;
    try {
        const stock = await StockModel.findByIdAndDelete(id);
        if (!stock) {
            return res.status(404).json({ error: 'Stock not found' });
        }
        res.json(stock);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Editar Stock
exports.editStock = async ( req, res ) => {
    const {id} = req.params;
    const { brands, pet, size, kg, amount, condition } = req.body;
    try{
        const result = await StockModel.findByIdAndUpdate(id, { brands, pet, size, kg, amount, condition }, {new: true} );
        res.json(result)
    } catch (err) {
        res.status(500).json({ error:err.message })
    }
}