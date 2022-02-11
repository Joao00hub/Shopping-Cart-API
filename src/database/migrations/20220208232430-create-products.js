'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', { 
      id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
      },
      name: {
       type: Sequelize.STRING,
       allowNull: false,
      },
      value: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false, 
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
    await queryInterface.dropTable('products');
  }
};
