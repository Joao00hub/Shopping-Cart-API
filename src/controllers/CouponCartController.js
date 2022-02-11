const CouponCart = require('../models/Coupons_carts');
const Cart = require('../models/Carts');
const Coupon = require('../models/Coupons');

module.exports = {
    async getCouponsCarts(req, res) {
        const { id_cart, id_cupon } = req.params;

        const cart = await Cart.findByPk(id_cart);
        
        const coupon = await Coupon.findByPk(id_cupon);
        console.log(coupon);
        if(!cart || !coupon){
            return res.status(400).json({ error: 'cart or coupon not found' });
        }else{
            const couponCart = await CouponCart.create({ id_cart, id_cupon });
            return res.status(200).json(couponCart);
        }      
    },
 
    async storeCouponsCarts(req, res) {
        const { id_cart, id_coupon } = req.params;
        console.log(id_coupon);
        const cart = await Cart.findByPk(id_cart);
        
        const coupon = await Coupon.findByPk(id_coupon);
        console.log(coupon);

        if(!cart || !coupon){
            return res.status(400).json({ error: 'cart or coupon not found' });
        }else{
            const couponCart = await CouponCart.create({ id_cart, id_coupon });
            return res.status(200).json(couponCart);
        }      
    }
};