const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const signupUser = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const user = await User.signup(email, password, role);
        const token = generateToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = generateToken(user._id);
        const role = user.role;
        res.status(200).json({ email, token, role });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { signupUser, loginUser };