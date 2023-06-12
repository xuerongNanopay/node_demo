const Product = require('../models/product_mongoose')

exports.getProducts = (req, resp, next) => {
  Product
    .find()
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
    .findById(req.params.productId)
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
    .findById(productId)
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

exports.getOrders = (req, resp, next) => {
  req
    .user
    .getOrder()
    .then(result => {
      resp.send(result);
    })
    .catch(err => {
      console.log(err);
      resp.write("shop getOrders error");
    })
}