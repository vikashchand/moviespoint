const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const authenticateUser = async (req, res, next) => {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, "asdfghjkqwertyu");

        // Check if user exists in the database
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Attach the user object to the request for further processing
        req.user = user;
        next(); // Call next middleware or route handler
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateUser;
