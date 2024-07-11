const pool = require('../config/db');
const bcrypt = require('bcryptjs');

async function createUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
}

async function getUserByUsername(username) {
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return users[0];
}

module.exports = {
    createUser,
    getUserByUsername
};
