const getDb = require('../util/mongodb').getDb;
const mongodb = require('mongodb');

module.exports = class User {
  constructor(username, email, cart, id) {
    this.email= email;
    this.username = username;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db
      .collection('users')
      .insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = (! this.cart) ? -1 : this.cart.items.findIndex(item => {
      return item.productId.toString() === product._id.toString();
    })
    const updateCartItems = (! this.cart) ? [] : [...this.cart.items];
    let newQuentity = 1;
    if ( cartProductIndex >= 0 ) {
      newQuentity = this.cart.items[cartProductIndex].quantity + 1;
      updateCartItems[cartProductIndex].quantity = newQuentity;
    } else {
      updateCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: newQuentity})
    }

    const updateCart = { items: updateCartItems};
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        {
          _id: new mongodb.ObjectId(this._id)
        },
        {
          $set: { cart: updateCart }
        }
      )
  }

  static fetchById(userId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({_id: new mongodb.ObjectId(userId)});
  }

  static fetchByUsername(username) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({username: username});
  }
}