exports.getCart = (req, resp, next) => {
  req
    .user
    .getCart()
    .then(cart => {
      return cart.getProducts();
    })
    .then(products => {
      resp.send(products);
    })
    .catch(err => console.log(err));
}