const { Model, DataTypes } = require('Sequelize');

class Coupons extends Model{
    static init(connection){
        super.init({
            cod: DataTypes.STRING,
            discount: DataTypes.INTEGER,
        },{
            sequelize:connection
        })
    }

    static associate(models) {
        this.belongsToMany(models.Carts, { foreignKey: 'id_coupon', through: 'coupons_carts', as: 'cartsCoupon' });
    }
}

module.exports = Coupons;