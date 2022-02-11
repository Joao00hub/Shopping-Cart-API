const Coupon = require('../models/Coupons');

module.exports = {
    async storeCoupon(req, res) {
        const { cod, discount } = req.body;

        const coupon = await Coupon.create({ cod, discount });

        return res.json(coupon);
    }
};