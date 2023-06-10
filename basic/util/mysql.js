const mysql = require('mysql2');

// Create a connection pool instand of connection.
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node_basic',
  password: '123456'
})

module.exports = pool.promise();