const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../config/db'); // Use the correct path to db.js

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const usersQuery = `SELECT * FROM users WHERE email = ?`;
        const [existingUsers] = await db.query(usersQuery, [email]);

        // Check if user exists
        if (existingUsers.length > 0) {
            return res.status(400).json("User already exists");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUserQuery = `INSERT INTO users(username, email, password) VALUES(?, ?, ?)`;
        await db.query(newUserQuery, [username, email, hashedPassword]);

        return res.status(200).json("User created successfully");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const usersQuery = `SELECT * FROM users WHERE email = ?`;
        const [users] = await db.query(usersQuery, [email]);

        if (users.length === 0) {
            return res.status(404).json("User not found!");
        }

        const user = users[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json("Invalid email or password!");
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, 'secretkey', { expiresIn: '1h' });
        return res.status(200).json({ token, username: user.username });
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
});

module.exports = router;
