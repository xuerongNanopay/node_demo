const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    products.push(this);
    return this;
  }

  static save(product) {
    products.push(product)
  }

  static getById(idx) {
    return idx >= 0 && idx < products.length ? products[idx] : null;
  }

  static getAll() {
    return [...products]
  }
}

