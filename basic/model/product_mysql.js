const Sequelize = require('sequelize');
const sequelize = require('../util/mysql');


const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Product;










// module.exports = class Product {
//   constructor(title) {
//     this.title = title;
//   }

//   save() {
//     return mysql
//       .execute('INSERT INTO products(name) VALUES(?)', [this.title])

//   }

//   static getById(idx) {
//     console.log(idx)
//     return mysql
//       .execute('SELECT * FROM products WHERE products.id = ?', [idx])
//       .then(([rows]) => rows)
//   }

//   static getAll() {
//     return mysql.execute('SELECT * FROM products').then(([rows]) => rows);
//   }
// }

