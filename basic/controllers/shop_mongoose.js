const Product = require('../models/product_mongoose')
const Order = require('../models/order_mongoose')

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
    .populate('cart.items.productId')
    .then(result => {
      resp.send(result.cart.items);
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
    .removeFromCart(productId)
    .then(result => {
      resp.send(result);
    })
    .catch(err => {
      console.log(err);
      resp.write("shop postCartDeleteProduct error");
    })
}

exports.postOrder = (req, resp, next) => {
  let newOrder = null;
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const order = new Order({
        user: {
          username: user.username,
          userId: user
        },
        products: user.cart.items.map(p => ({product: { ...p.productId._doc }, quantity: p.quantity})),
      })
      return order.save();
    })
    .then(order => {
      newOrder = order;
      return req.user.clearCart();
    })
    .then(_ => {
      resp.send(newOrder);
    })
    .catch(err => {
      console.log(err);
      resp.write("shop postOrder error");
    })
}

exports.getOrders = (req, resp, next) => {
  Order
    .find({'user.userId': req.user})
    .then(result => {
      resp.send(result);
    })
    .catch(err => {
      console.log(err);
      resp.write("shop getOrders error");
    })
}