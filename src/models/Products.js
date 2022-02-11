const { Model, DataTypes } = require('Sequelize');

class Products extends Model{
    static init(connection){
        super.init({
            name: DataTypes.STRING,
            value: DataTypes.DECIMAL,
            amount: DataTypes.INTEGER,
        },{
            sequelize:connection
        })
    }
    static associate(models) {
        this.belongsToMany(models.Carts, { foreignKey: 'id_product', through: 'carts_products', as: 'carts' });
      }
}

module.exports = Products;