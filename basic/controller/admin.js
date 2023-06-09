const Product = require('../model/product')

exports.getProductById = (req, resp, next) => {
  resp.send(Product.getById(req.params.productId));
}

exports.getAllProducts = (req, resp, next) => {
  resp.send(Product.getAll());
}

exports.addProduct = (req, resp, next) => {
  const product = new Product(req.body.title);
  resp.send(product.save());
}