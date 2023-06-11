const Sequelize = require('sequelize');
const sequelize = require('../util/mysql')

// User *:* Order (orderItem store relationship)
module.exports = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
})