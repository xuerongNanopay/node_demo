const path = require('path');
const fs = require('fs');

const products = [];
const file_path = path.join(process.cwd(), 'filestore', 'products.json');

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    return new Promise((resolve, reject) => {
      fs.readFile(file_path, (err, data) => {
        if ( !! err ) reject(err);
        const products = JSON.parse(data);
        products.push(this)
        fs.writeFile(file_path, JSON.stringify(products), (err) => {
          if ( !! err ) reject(err);
          resolve(products)
        })
      });
    });
  }

  static getById(idx) {
    return new Promise((resolve, reject) => {
      fs.readFile(file_path, (err, data) => {
        if ( !err ) {
          const products = JSON.parse(data);
          resolve(idx >= 0 && idx < products.length ? products[idx] : null);
        }
        reject(err);
      })
    })
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(file_path, (err, data) => {
        if ( !err ) resolve(JSON.parse(data));
        reject(err);
      })
    })
  }
}

