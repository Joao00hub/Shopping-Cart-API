const { Model, DataTypes } = require('Sequelize');

class Carts extends Model {
    static init(connection) {
        super.init({
            apiKey: DataTypes.STRING,
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.belongsToMany(models.Products, { foreignKey: 'id_cart', through: 'carts_products', as: 'products' });
        this.belongsToMany(models.Coupons, { foreignKey: 'id_cart', through: 'coupons_carts', as: 'coupons' });
    }
}

module.exports = Carts;