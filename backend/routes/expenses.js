const express = require('express');
const { createExpense, getExpensesByUser, updateExpense, deleteExpense } = require('../models/expense');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
    const { name, amount, category, date } = req.body;
    try {
        const newExpense = await createExpense(name, amount, category, date, req.user.id);
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const expenses = await getExpensesByUser(req.user.id);
        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    const { name, amount, category, date } = req.body;
    try {
        const updatedExpense = await updateExpense(req.params.id, name, amount, category, date, req.user.id);
        res.status(200).json(updatedExpense);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await deleteExpense(req.params.id, req.user.id);
        res.status(200).json({ message: 'Expense deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
