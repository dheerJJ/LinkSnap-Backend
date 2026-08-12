const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'linksnap_super_secret_jwt_key_change_in_production';

// Register API
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ Message: 'Username, email and password are required' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ Message: 'User with this email already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashPassword,
    });

    const token = jwt.sign(
      { userID: newUser._id, id: newUser._id, email: newUser.email, username: newUser.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      Message: 'Registeration Success',
      token,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ Message: 'Registration failed', error: error.message });
  }
};

// Login API
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ Message: 'Email and password are required' });
    }

    const user = await User.findOne({
      $or: [{ email: email.toLowerCase().trim() }, { username: email.trim() }],
    });

    if (!user) {
      return res.status(400).json({ Message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ Message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userID: user._id, id: user._id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      Message: 'Login Success',
      token,
      username: user.username,
      email: user.email,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ Message: 'Login failed', error: error.message });
  }
};

// Delete Account API
const deleteAccount = async (req, res) => {
  try {
    const { id } = req.user;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ Message: 'User not found' });
    }

    return res.status(200).json({ Message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    return res.status(500).json({ Message: 'Failed to delete account', error: error.message });
  }
};

module.exports = {
  register,
  login,
  deleteAccount,
  registerApi: register,
  loginApi: login,
};
