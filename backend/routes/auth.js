const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register (for user/ngo/delivery)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!['ngo', 'user', 'delivery'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role for registration' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashed,
      role,
      verified: true // can set false if you need manual verification
    });

    await newUser.save();
    res.json({ message: 'Registration successful', user: newUser });

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login for user/ngo/delivery
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, role: { $in: ['ngo', 'user', 'delivery'] } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', user });

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
