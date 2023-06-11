const Product = require('../models/product')

const getAddProduct = (req, resp, next) => {
  Product
    .fetchAll()
    .then(result => {
      resp.send(result);
    })
    .catch(err => {
      console.log(err);
      resp.send("admin getAddProduct error");
    });
}

const getProducts = ( req, resp, next) => {
  Product
  .fetchAll()
  .then(product => {
    resp.send(product);
  })
  .catch(err => {
    console.log(err);
    resp.write("admin getProducts error");
  })
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
      resp.send("admin getAddProduct error");
    });
}

exports.getAddProduct = getAddProduct;
exports.postAddProduct = postAddProduct;
exports.getProducts = getProducts;

