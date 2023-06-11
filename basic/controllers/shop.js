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

exports.postCart = (req, resp, next) => {
  const productId = req.body.productId;

  Product
    .fetchById(productId)
    .then( product => {
      return req.user.addToCart(product);
    })
    .then ( result => {
      resp.send(result);
    })
    .catch(err => {
      console.log(err);
      resp.write("shop postCart error");
    })
}