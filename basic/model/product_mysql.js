const path = require('path');
const fs = require('fs');

const mysql = require('../util/mysql');
const file_path = path.join(process.cwd(), 'filestore', 'products.json');

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    return mysql
      .execute('INSERT INTO products(name) VALUES(?)', [this.title])

  }

  static getById(idx) {
    console.log(idx)
    return mysql
      .execute('SELECT * FROM products WHERE products.id = ?', [idx])
      .then(([rows]) => rows)
  }

  static getAll() {
    return mysql.execute('SELECT * FROM products').then(([rows]) => rows);
  }
}

