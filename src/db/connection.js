const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'db',
  port: 3000,
  user: 'root',
  password: 'password',
  database: 'StoreManager',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = connection;