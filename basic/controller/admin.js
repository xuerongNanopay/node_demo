const Product = require('../model/product_mysql')

exports.getProductById = (req, resp, next) => {
  Product
    .getById(req.params.productId)
    .then(data => resp.send(data))
    .catch(err => resp.send(err));
}

exports.getAllProducts = (req, resp, next) => {
  Product
    .getAll()
    .then(data => resp.send(data))
    .catch(err => resp.send(err));
}

exports.addProduct = (req, resp, next) => {
  const product = new Product(req.body.title);
  product
    .save()
    .then(data => resp.send(data))
    .catch(err => resp.send(err));
}