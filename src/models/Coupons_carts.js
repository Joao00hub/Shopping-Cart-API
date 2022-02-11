const { Model, DataTypes } = require('Sequelize');

class Coupons_carts extends Model{
    static init(connection){
        super.init({
            id_cart: DataTypes.INTEGER,
            id_coupon: DataTypes.INTEGER,
        },{
            sequelize:connection
        })
    }
}

module.exports = Coupons_carts;