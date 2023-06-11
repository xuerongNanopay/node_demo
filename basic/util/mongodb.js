const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url = 'mongodb://root:123456@localhost:27017';

const mongoConnect = callback => {
  MongoClient.connect(url)
  .then(client => {
    console.log('mongodb collect')
    callback(client);
  })
  .catch(err => {
    console.log(err)
  });
}

module.exports = mongoConnect;