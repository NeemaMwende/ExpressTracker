const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByUsername, findUserByEmail, findUserByUsername } = require('../models/user');
// import { createUser, findUserByEmail, findUserByUsername } from '../services/userService.js'; // Import your service functions
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {

        // Check if user with the same email already exists
        // const existingUserByEmail = await findUserByEmail(email);
        // if (existingUserByEmail) {
        //     return res.status(400).json({ message: 'User with this email already exists' });
        // }

        // // Check if user with the same username already exists
        // const existingUserByUsername = await findUserByUsername(username);
        // if (existingUserByUsername) {
        //     return res.status(400).json({ message: 'Username is already taken' });
        // }

        await createUser(username, email, password);
        res.status(201).json({ message: 'User created' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await getUserByUsername(username);
        if (!user) return res.status(400).json({ message: 'Invalid username or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

        const token = jwt.sign({ id: user.id, username: user.username }, 'secretkey', { expiresIn: '1h' });
        res.status(200).json({ token, username: user.username });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
