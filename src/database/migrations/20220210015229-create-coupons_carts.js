'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('coupons_carts', { 
      id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
      },
     id_cart: {
       type: Sequelize.INTEGER,
       allowNull: false,
       references: { model: 'carts', key: 'id'},
       onUpdate: 'CASCADE',
       onDelete: 'CASCADE',
      },
      id_coupon: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'coupons', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
       },
      created_at: {
       type: Sequelize.DATE,
       allowNull: false,
      },
      updated_at: {
       type: Sequelize.DATE,
       allowNull: false,
      }
     });    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cupons_carts');
  }
};
