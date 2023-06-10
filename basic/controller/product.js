const Product = require('../model/product_mysql')

exports.getProductById = (req, resp, next) => {
  // Product
  //   .getById(req.params.productId)
  //   .then(data => resp.send(data))
  //   .catch(err => resp.send(err));
  Product
    .findByPk(req.params.productId)
    .then(data => resp.send(data))
    .catch(err => {
      console.log(err);
      resp.send('500 error');
    })
}

exports.getAllProducts = (req, resp, next) => {
  // Product
  //   .getAll()
  //   .then(data => resp.send(data))
  //   .catch(err => resp.send(err));
  // Product
  //   .findAll({
  //     attributes: ['name']
  //   })
  //   .then(data => resp.send(data))
  //   .catch(err => {
  //     console.log(err);
  //     resp.send('500 ERROR')
  //   })
    req
      .user
      .getProducts()
      .then(data => resp.send(data))
      .catch(err => {
        console.log(err);
        resp.send('500 ERROR')
      })
}

exports.addProduct = (req, resp, next) => {
  // const product = new Product(req.body.title);
  // product
  //   .save()
  //   .then(data => resp.send(data))
  //   .catch(err => resp.send(err));

  // Product
  // .create({name: req.body.title})
  // .then(data => resp.send(data))
  // .catch(err => {
  //   console.log(err);
  //   resp.send('500 error');
  // });
  
  req
    .user
    .createProduct({name: req.body.title})
    .then(data => resp.send(data))
    .catch(err => {
      console.log(err);
      resp.send('500 error');
    });
}