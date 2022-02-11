const { Model, DataTypes } = require('Sequelize');

class carts_products extends Model {
    static init(connection) {
        super.init({
            id_cart: DataTypes.INTEGER,
            id_product: DataTypes.INTEGER,
            quantity_products: DataTypes.INTEGER,
            product_removed: DataTypes.STRING,
        }, {
            sequelize: connection
        })
    }
   
}

module.exports = carts_products;