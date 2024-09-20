const mysql = require('mysql2');
const fs = require('fs');

// Set database connection credentials
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'sql_roof-calc',
  port: 3306,
};

// const connection = mysql.createConnection({
//   host: 'db',
//   user: 'root',
//   password: 'root',
//   database: 'sql_roof-calc',
//   port: 3306
// });

// const pool = mysql.createConnection(config);

// connection.config.authPlugin = 'mysql_native_password';

// Create a MySQL pool
const pool = mysql.createPool(config);

module.exports = pool;
