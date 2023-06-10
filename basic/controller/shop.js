const Product = require('../model/product_mysql');

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

exports.postCart = (req, resp, next) => {
  const prodId = req.body.productId;
  let fetchCart = null;
  req
    .user
    .getCart()
    .then(cart => {
      fetchCart = cart;
      return cart.getProducts({where: { id: prodId }});
    })
    .then(products => {
      //If products existing add 1
      // otherwise, add products
      if ( products.length > 0 ) {
        const [ product ] = products;
        let oldQuantity = product.cartItem.quantity;
        oldQuantity = oldQuantity + 1;
        return fetchCart.addProduct(product, {through: { quantity: oldQuantity}});

      } else {
        return Product
                .findByPk(prodId)
                .then(product => {
                  console.log('bbb')
                  return fetchCart.addProduct(product, { through: { quantity: 1}});
                })
                .catch(err => console.log(err));
      }
    })
    .then(data => resp.send(data)) 
    .catch(err => console.log(err));
}