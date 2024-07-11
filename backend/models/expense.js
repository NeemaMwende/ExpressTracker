const pool = require('../config/db');

async function createExpense(name, amount, category, date, userId) {
    const [result] = await pool.query('INSERT INTO expenses (name, amount, category, date, user_id) VALUES (?, ?, ?, ?, ?)', [name, amount, category, date, userId]);
    return { id: result.insertId, name, amount, category, date, userId };
}

async function getExpensesByUser(userId) {
    const [expenses] = await pool.query('SELECT * FROM expenses WHERE user_id = ?', [userId]);
    return expenses;
}

async function updateExpense(id, name, amount, category, date, userId) {
    await pool.query('UPDATE expenses SET name = ?, amount = ?, category = ?, date = ? WHERE id = ? AND user_id = ?', [name, amount, category, date, id, userId]);
    const [updatedExpense] = await pool.query('SELECT * FROM expenses WHERE id = ? AND user_id = ?', [id, userId]);
    return updatedExpense[0];
}

async function deleteExpense(id, userId) {
    await pool.query('DELETE FROM expenses WHERE id = ? AND user_id = ?', [id, userId]);
}

module.exports = {
    createExpense,
    getExpensesByUser,
    updateExpense,
    deleteExpense
};
