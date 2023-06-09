const products = [];

exports.getProductById = (req, resp, next) => {
  console.log(req.params.productId)
  resp.send(products.filter((_, idx) => idx === Number.parseInt(req.params.productId)));
}

exports.getAllProducts = (req, resp, next) => {
  resp.send(products);
}

exports.addProduct = (req, resp, next) => {
  products.push({title: req.body.title});
  resp.send(products);
}