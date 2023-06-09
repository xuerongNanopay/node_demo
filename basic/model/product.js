const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    products.push(this);
    return this;
  }

  static getById(idx) {
    return idx >= 0 && idx < products.length ? products[idx] : null;
  }

  static getAll() {
    return [...products]
  }
}

