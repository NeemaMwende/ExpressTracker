const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByUsername, findUserByEmail, findUserByUsername } = require('../models/user');
// import { createUser, findUserByEmail, findUserByUsername } from '../services/userService.js'; // Import your service functions
const router = express.Router();
const db = require('mysql');

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {

        const users = `SELECT * FROM users WHERE email = ?`
        //check if user exists
        db.query(users, [req.body.email], (err,data) => {
            if(data.length >0) return res.status(400).json("User already exists");

            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(req.body.password, salt)

            const newUser = `INSERT INTO users(username, email, password) VALUES(?)`
            value = [ req.body.email, req.body.username, hashedPassword ]

            db.query(newUser, [value], (err, data) => {
                if(err) return res.status(400).json("something went wrong")

                return res.status(200).json("user created successfully")
            })
        })
        // await createUser(username, email, password);
        // res.status(201).json({ message: 'User created' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await getUserByUsername(username);
//         if (!user) return res.status(400).json({ message: 'Invalid username or password' });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

//         const token = jwt.sign({ id: user.id, username: user.username }, 'secretkey', { expiresIn: '1h' });
//         res.status(200).json({ token, username: user.username });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

router.post('/login', async (req, res) => {
    try {
        const users = `SELECT * FROM users WHERE email =?`
        db.query(users, [req.body.email], (err, data) => {
            if(data.length === 0) return res.status(404).json("User not found!")

            const isPasswordValid = bcrypt.compareSync(req.body.password, data[0].password)

            if(!isPasswordValid) return res.status(400).json("Invalid email or password!")

                return res.status(200).json("Login Successful")
        })
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
})

module.exports = router;
