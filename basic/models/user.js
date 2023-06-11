const getDb = require('../util/mongodb').getDb;
const mongodb = require('mongodb');

module.exports = class User {
  constructor(username, email) {
    this.email= email;
    this.username = username;
  }

  save() {
    const db = getDb();
    return db
      .collection('users')
      .insertOne(this);
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