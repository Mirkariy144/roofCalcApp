const mysql = require('mysql');

// Set database connection credentials
const config = {
  host: 'db',
  user: 'kurwaSSL',
  password: 'kurwaSSL2',
  database: 'sql_roof-calc',
  port: 3306,
  ssl: {
    rejectUnauthorized: false,
  }
};

// const connection = mysql.createConnection({
//   host: 'db',
//   user: 'root',
//   password: 'root',
//   database: 'sql_roof-calc',
//   port: 3306
// });

// const connection = mysql.createConnection(config);

// connection.config.authType = 'caching_sha2_password';

// Create a MySQL pool
const pool = mysql.createPool(config);

module.exports = pool;
