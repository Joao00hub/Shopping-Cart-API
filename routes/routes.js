const express = require('express')
const CartController = require('../src/controllers/CartsController');
const ProductController = require('../src/controllers/ProductsController');
const CouponCartsControler = require('../src/controllers/CouponCartController');
const CouponControler = require('../src/controllers/CouponController');
const CartsProductsController = require('../src/controllers/CartsProductsController');

const routes = express.Router();

routes.get('/',(req, res) => {
    return res.json({hello: 'world'});
})

routes.post('/carts/:apiKey', CartController.storeCart);
routes.post('/product', ProductController.storeProduct);
routes.post('/coupon', CouponControler.storeCoupon);
routes.post('/carts/:id_cart/coupon/:id_coupon/coupon_carts', CouponCartsControler.storeCouponsCarts);
routes.post('/carts/:id_cart/product/:id_product/carts_products/:quantity_products', CartsProductsController.storeCartsProducts);

routes.get('/carts/:id_cart/products', CartsProductsController.getProductsOfCart);
routes.get('/carts/:id_cart/amount', CartsProductsController.getShoppingAmount);

routes.put('/carts/:id_cart', CartsProductsController.cleanCart);
routes.put('/carts/:id_cart/products/:id_product', CartsProductsController.removeProduct);

module.exports = routes;

