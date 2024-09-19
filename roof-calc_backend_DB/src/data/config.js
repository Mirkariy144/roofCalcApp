const mysql = require('mysql');
const fs = require('fs');

// Set database connection credentials
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'sql_roof-calc',
  port: 3306,
  ssl: {
    ca: fs.readFileSync('/etc/letsencrypt/live/mirkariy-roofcalc.online/fullchain.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/mirkariy-roofcalc.online/cert.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/mirkariy-roofcalc.online/privkey.pem'),
    rejectUnauthorized: false
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

// connection.config.authPlugin = 'mysql_native_password';

// Create a MySQL pool
const pool = mysql.createPool(config);

module.exports = pool;
