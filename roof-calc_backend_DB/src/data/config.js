const mysql = require('mysql');

// Set database connection credentials
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  authPlugin: 'mysql_native_password'
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
