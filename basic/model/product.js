const path = require('path');
const fs = require('fs');

const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    products.push(this);
    const p = path.join(process.cwd(), 'filestore', 'products.json');
    fs.readFile(p, (err, data) => {
      let products = [];
      if ( !err ) {
        products = JSON.parse(data);
      }
      products.push(this)
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      })
    });

    return this;
  }

  static getById(idx) {
    return idx >= 0 && idx < products.length ? products[idx] : null;
  }

  static getAll() {
    return [...products]
  }
}

