const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'spring_security_demo'
})

const doQuery = (query, callback) => {
  con.connect(err => {
    if ( err ) callback(err, null);
    console.log('Connected');
  })
  con.query(query, (err, result) => {
    if ( err ) callback(err, null);
    callback(null, result)
  })
}

const doInsert = (query, callback) => {
  con.connect(err => {
    if ( err ) callback(err, null);
    console.log('Connected');
  })
  con.query(query, (err, result) => {
    if ( err ) callback(err, null);
    callback(null, result)
  })
}

module.exports = {
  query: doQuery,
  insert: doInsert
};