const mysql = require('mysql2');

require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.HOST,     
    user: 'avnadmin',          
    password: process.env.PASSWORD,  
    database: process.env.DATABASE,
    port:process.env.SQLPORT 
  });
const promisePool = pool.promise();


const createTableSQL = `
  CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
  );
`;

async function createTable() {
  try {

    await promisePool.query(createTableSQL);
    console.log('Table `schools` created successfully.');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    pool.end();
  }
}

module.exports = createTable;
