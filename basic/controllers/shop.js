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

exports.getCart = (req, resp, next) => {
  req
    .user
    .getCart()
    .then(result => {
      resp.send(result);
    })
    .catch(err => {
      console.log(err);
      resp.write("shop getCart error");
    })
}

exports.postCartDeleteProduct = (req, resp, next) => {
  const productId = req.body.productId;

  req
    .user
    .deleteItemFromCart(productId)
    .then(result => {
      resp.send(result);
    })
    .catch(err => {
      console.log(err);
      resp.write("shop postCartDeleteProduct error");
    })
}

exports.postOrder = (req, resp, next) => {
  req
    .user
    .addOrder()
    .then(result => {
      resp.send(result);
    })
    .catch(err => {
      console.log(err);
      resp.write("shop postOrder error");
    })
}