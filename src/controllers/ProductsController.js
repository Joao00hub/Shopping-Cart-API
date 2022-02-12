const Product = require('../models/Products');

module.exports = {
    async storeProduct(req, res) {
        const { name, value, amount } = req.body;

        if(!name ||
           !value ||
           !amount){
            return res.status(400).json({ error: 'name, value or amount not found' });
        }else{
            const product = await Product.create({ name, value, amount });
            return res.status(200).json({success: 'product created', product});
        }
    }
}