const Product = require('../models/product_mongoose')

exports.getAddProduct  = (req, resp, next) => {
  Product
    .find()
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
    .find()
    .populate('userId', 'username email')
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
  const product = new Product({
    title: title,
    price: price, 
    description: description, 
    imageUrl: imageUrl,
    userId: req.user
  })
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
    .findOne({_id: productId})
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
  Product
    .findById(id)
    .then(product => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;

      return product.save();
    })
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
    .findByIdAndRemove(req.params.productId)
    .then(result => {
      resp.send(result)
    })
    .catch(err => {
      console.log(err);
      resp.send("admin postEditProduct error");
    });
}