const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mikaelson@12.',
    database: 'ExpenseTracker'
    // waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0
});


module.exports = pool;