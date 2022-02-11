const Sequelize = require('Sequelize');
const dbConfig = require('../config/database');

const Carts = require('../models/Carts');
const Carts_products = require('../models/Carts_products');
const Coupons = require('../models/Coupons');
const Coupons_carts = require('../models/Coupons_carts');
const Products = require('../models/Products');

const connection = new Sequelize(dbConfig);
Carts.init(connection);
Coupons_carts.init(connection);
Coupons.init(connection);
Products.init(connection);
Carts_products.init(connection);

Carts.associate(connection.models);
Products.associate(connection.models);
Coupons.associate(connection.models);

module.exports = connection;