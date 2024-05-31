const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Controller method for user registration
exports.createUser = async (req, res) => {
    try {
        const { username, password , email} = req.body;
        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, password: hashedPassword, email:email });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, username: user.username }, "asdfghjkqwertyu", { expiresIn: '10h' });

        // Send token and user ID in the response
        res.json({ token, userId: user._id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Controller method for updating user details
exports.updateUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userId = req.params.id;

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user
        const updatedUser = await User.findByIdAndUpdate(userId, { username, password: hashedPassword }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller method for deleting user
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Delete user
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUser = async (req,res) => {
    try {
        const userId = req.query.id;


        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({message:"User not found!"});
        }
        res.json({message:"user found", name:user.username, email:user.email});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
