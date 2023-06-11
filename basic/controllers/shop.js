const Product = require('../models/products')

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