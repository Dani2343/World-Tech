const mysql = require('mysql2');
require('dotenv').config();

// Creamos un "pool" de conexiones para que sea más eficiente
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportamos la promesa para poder usar async/await en los controladores
module.exports = pool.promise();