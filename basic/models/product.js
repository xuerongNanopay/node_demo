const getDb = require('../util/mongodb').getDb;
const mongodb = require('mongodb')

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.id = id;
  }

  save() {
    const db = getDb();
    let dbOp;
    if ( this.id ) {
      console.log('aaa')
      dbOp = db
              .collection('products')
              .updateOne(
                {
                  _id: new mongodb.ObjectId(this.id)
                },
                {
                  $set: this
                }
              );
    } else {
      dbOp = db
              .collection('products')
              .insertOne(this);
    }
    return dbOp;
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray();
  }

  static fetchById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .find({_id: new mongodb.ObjectId(prodId)})
      .next();
  }
}

module.exports = Product;