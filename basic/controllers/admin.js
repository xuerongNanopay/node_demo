const Product = require('../models/product')

const getAddProduct = (req, resp, next) => {
  Product
    .fetchAll()
    .then(result => {
      resp.send(result);
    })
    .catch(err => {
      console.log(err);
      resp.send("Error in: " + postAddProduct);
    });
}

const postAddProduct = (req, resp, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, price, description, imageUrl);
  product
    .save()
    .then(result => {
      resp.send(result);
    })
    .catch(err => {
      console.log(err);
      resp.send("Error in: " + postAddProduct);
    });
}

exports.getAddProduct = getAddProduct;
exports.postAddProduct = postAddProduct;

