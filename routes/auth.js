const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken } = require('../middleware/auth');

// Task 6: Register New user
router.post('/register', async (req, res) => {
  try {
    const { username, password, fullName, email } = req.body;

    if (!username || !password || !fullName || !email) {
      return res.status(400).json({ 
        success: false,
        error: 'All fields are required: username, password, fullName, email' 
      });
    }

    const user = await User.register(username, password, fullName, email);
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email
      },
      token: token
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Task 7: Login as a Registered user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Username and password are required' 
      });
    }

    const user = await User.login(username, password);
    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Login successful',
      user: user,
      token: token
    });
  } catch (error) {
    res.status(401).json({ 
      success: false,
      error: error.message 
    });
  }
});

module.exports = router;

