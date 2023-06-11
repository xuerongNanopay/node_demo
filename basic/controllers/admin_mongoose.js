const Product = require('../models/product_mongoose')

exports.getAddProduct  = (req, resp, next) => {
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

exports.getProducts = ( req, resp, next) => {
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

exports.postAddProduct = (req, resp, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, price, description, imageUrl, null, req.user._id);
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

exports.getEditProduct = (req, resp, next) => {
  const { productId } = req.params;
  Product
    .fetchById(productId)
    .then( product => {
      resp.send(product);
    })
    .catch(err => {
      console.log(err);
      resp.send("admin getEditProduct error");
    });
}

exports.postEditProduct = (req, resp, next) => {
  const { title, imageUrl, price, description, id } = req.body;
  const product = new Product(title, price, description, imageUrl, id);
  product
    .save()
    .then( product => {
      resp.send(product);
    })
    .catch(err => {
      console.log(err);
      resp.send("admin postEditProduct error");
    });
}

exports.deleteProduct = ( req, resp, next) => {
  Product
    .deleteById(req.params.productId)
    .then(result => {
      resp.send(result)
    })
    .catch(err => {
      console.log(err);
      resp.send("admin postEditProduct error");
    });
}