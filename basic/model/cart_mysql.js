const Sequelize = require('sequelize');
const sequelize = require('../util/mysql')

module.exports = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
})