const mysql = require('mysql2');

// Set database connection credentials
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'sql_roof-calc',
  port: 3306,
  authPlugin: 'mysql_native_password',
  rejectUnauthorized: false,
};

// const connection = mysql.createConnection({
//   host: 'db',
//   user: 'root',
//   password: 'root',
//   database: 'sql_roof-calc',
//   port: 3306
// });

const connection = mysql.createConnection(config);

connection.config.authPlugin = 'mysql_native_password';

// Create a MySQL pool
const pool = mysql.createPool(config);

module.exports = pool;
