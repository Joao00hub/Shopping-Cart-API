const Cart = require('../models/Carts');

module.exports = {
    async storeCart(req, res) {
        const apiKey = req.params;
        console.log(apiKey);
        if(!apiKey){
            return res.status(400).json({ error: 'apiKey not found' });
        }else{
            const cart = await Cart.create(apiKey);
            return res.status(200).json({success: 'cart created', cart});
        }
    }
};