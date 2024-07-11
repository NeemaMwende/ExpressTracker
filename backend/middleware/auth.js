const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token.split(' ')[1], 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Failed to authenticate token' });

        req.user = decoded;
        next();
    });
};
