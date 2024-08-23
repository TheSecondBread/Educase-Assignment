const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.HOST,     
  user: 'avnadmin',         
  password: process.env.PASSWORD,  
  database: process.env.DATABASE,
  port:process.env.PORT

});


const promisePool = pool.promise();

const dbMiddleware = (req, res, next) => {
  
  req.db = promisePool;
  next(); 
};


module.exports = dbMiddleware;
