const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, 
        quantity: { type: Number, required: true }
      }
    ]
  }
})

userSchema.methods.addToCart = function(product) {
  const cartProductIndex = (! this.cart) ? -1 : this.cart.items.findIndex(item => {
    return item.productId.toString() === product._id.toString();
  })
  const updateCartItems = (! this.cart) ? [] : [...this.cart.items];
  let newQuentity = 1;
  if ( cartProductIndex >= 0 ) {
    newQuentity = this.cart.items[cartProductIndex].quantity + 1;
    updateCartItems[cartProductIndex].quantity = newQuentity;
  } else {
    updateCartItems.push({ productId: product._id, quantity: newQuentity})
  }

  const updateCart = { items: updateCartItems};
  this.cart = updateCart;
  return this.save();
}

userSchema.methods.removeFromCart = function(productId) {
  const updateCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  })
  this.cart.items = updateCartItems;
  return this.save();
}

module.exports = mongoose.model('User', userSchema);