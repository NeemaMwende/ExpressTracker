// routes/contact.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Use the correct path to db.js

router.post('/contact', async (req, res) => {
    const { name, email, message, phone } = req.body;
    try {
        const newContactQuery = `INSERT INTO contacts(name, email, phone, message) VALUES(?, ?, ?, ?)`;
        await db.query(newContactQuery, [name, email, phone, message]);

        return res.status(200).json("Message sent successfully");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
