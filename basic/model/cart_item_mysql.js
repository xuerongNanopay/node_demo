const Sequelize = require('sequelize');
const sequelize = require('../util/mysql')

module.exports = sequelize.define(
  'cartItem', 
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    quantity: {
      type: Sequelize.INTEGER
    }
  },
  {
    tableName: 'cart_items'
  }
)