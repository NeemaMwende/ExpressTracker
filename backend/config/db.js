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

// export async function findUserByEmail(email) {
//     const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//     return rows[0];
// }

// export async function findUserByUsername(username) {
//     const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
//     return rows[0];
// }

// export async function createUser(username, email, password) {
//     await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
// }

module.exports = pool;