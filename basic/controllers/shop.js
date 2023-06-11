const Product = require('../models/product')

exports.getProducts = (req, resp, next) => {
  Product
    .fetchAll()
    .then(products => {
      resp.send(products);
    })
    .catch(err => {
      console.log(err);
      resp.write("shop getProducts error");
    })
}

exports.getProduct = (req, resp, next) => {
  console.log(req.params.productId)
  Product
    .fetchById(req.params.productId)
    .then(product => {
      resp.send(product);
    })
    .catch(err => {
      console.log(err);
      resp.write("shop getProduct error");
    })
}