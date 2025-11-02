require('dotenv').config();
const mysql = require('mysql2/promise');

let pool;

async function DBconnect() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log(" Database pool created successfully");
  }
  return pool;
}

module.exports = DBconnect;
