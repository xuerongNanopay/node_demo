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
    // const cartProduct = this.cart.items.findIndex(item => {
    //   return item._id === product._id;
    // })

    const updateCart = { items: [{...product, quantity: 1}]};
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