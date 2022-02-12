const CartProduct = require('../models/Carts_products');
const Cart = require('../models/Carts');
const Product = require('../models/Products');
const { Op } = require("sequelize");

module.exports = {
    async getProductsOfCart(req, res) {
        const { id_cart } = req.params;

        const cartProducts = await Cart.findByPk(id_cart, {
            where: {
                id_cart: id_cart
            },
            include: {
                association: 'products', attributes: ['name', 'value'], through: {
                    attributes: ['id_cart', 'quantity_products'],
                    where: {
                        product_removed: {
                            [Op.not]: 'Y'
                        }
                    },
                },

            }
        }).then(function (result) {
            if (result) {
                return res.json(result.products);
            } else {
                return res.json({ error: "not found any product" });
            }
        })
    },

    async getShoppingAmount(req, res) {
        const { id_cart } = req.params;

        await Cart.findByPk(id_cart, {
            attributes: [],
            where: {
                id_cart: id_cart
            },
            include: [
                {
                    association: 'products',
                    attributes: ['value'],
                    through: {
                        attributes: ['quantity_products'], where: {
                            product_removed: {
                                [Op.not]: 'Y'
                            }
                        },
                    },
                },
                {
                    association: 'coupons',
                    attributes: ['discount'],
                },
            ],
        }).then(function (result) {
            if (result) {

                const productsAmount = result.products.reduce(function (prev, current) {
                    prev = prev + current.value * current.carts_products.quantity_products;
                    return prev;
                }, 0);

                const discountAmount = result.coupons.reduce(function (prev, current) {
                    return prev += current.discount;
                }, 0);

                const totalDiscount = productsAmount - ((discountAmount / 100) * productsAmount)

                const totalBrl = formatCurrent(productsAmount);

                const totalDiscountBrl = formatCurrent(totalDiscount);

                return res.json({ subtotals: totalBrl, total: totalDiscountBrl });
            } else {
                return res.json({ error: "not found" });
            }
        })

    },

    async storeCartsProducts(req, res) {
        const { id_cart, id_product, quantity_products } = req.params;

        const cart = await Cart.findByPk(id_cart);
        const product = await Product.findByPk(id_product);

        if (!cart ||
            !product ||
            !quantity_products) {
            return res.status(400).json({ error: 'cart or product not found' });
        } else {
            await CartProduct.findOne({
                where: {
                    id_cart: id_cart,
                    id_product: id_product
                }
            }).then(async function (result) {
                if (result &&
                    result.product_removed == 'N') {
                    let newQuantity = result.quantity_products + parseInt(quantity_products);

                    await CartProduct.update({ quantity_products: newQuantity }, {
                        where: {
                            id_cart: id_cart,
                            id_product: id_product
                        }
                    });
                    return res.status(200).json({ success: 'quantity of products updated' });
                } else if (result &&
                    result.product_removed != 'N') {
                    await CartProduct.update({
                        quantity_products: quantity_products,
                        product_removed: 'N'
                    }, {
                        where: {
                            id_cart: id_cart,
                            id_product: id_product
                        }
                    });
                    return res.status(200).json({ success: "product recovered" });
                } else {
                    await CartProduct.create({ id_cart, id_product, quantity_products, product_removed: "N" });
                    return res.status(201).json({ success: "product save" });
                }
            })
        }
    },

    async cleanCart(req, res) {
        const { id_cart } = req.params;

        const cart = await CartProduct.findByPk(id_cart);

        if (!cart) {
            return res.status(400).json({ error: 'cart or product not found' });
        } else {
            await CartProduct.update({
                product_removed: 'Y'
            }, {
                where: {
                    id_cart: id_cart
                }
            });
            return res.status(200).json({ success: "Cart clean" });
        }
    },

    async removeProduct(req, res) {
        const { id_cart, id_product } = req.params;

        const cart = await CartProduct.findByPk(id_cart);

        if (!cart) {
            return res.status(400).json({ error: 'cart or product not found' });
        } else {
            await CartProduct.update({
                product_removed: 'Y'
            }, {
                where: {
                    id_cart: id_cart,
                    id_product: id_product
                }
            });
            return res.status(200).json({ success: "Product clean" });
        }
    }
};

function formatCurrent(value) {
    return Number(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}