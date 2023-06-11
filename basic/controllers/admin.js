const Product = require('../models/products')

const getAddProduct = (req, resp, next) => {
  resp.send('TODO: getAddProduct');
}

const postAddProduct = (req, resp, next) => {
  console.log(req.body);
  const { title, imageUrl, price, description } = req.body;
  console.log(title)
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

