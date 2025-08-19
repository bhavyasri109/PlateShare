const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const signJwt = (payload, secret, expiresIn) => jwt.sign(payload, secret, { expiresIn });

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'User already exists' });

    user = new User({ name, email, password, role, verified: true });
    await user.save();

    res.status(201).json({ message: 'Registration successful. You can now log in.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = signJwt({ id: user._id, role: user.role }, process.env.JWT_SECRET, process.env.JWT_EXPIRE);
    res.status(200).json({ token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, role: 'admin' }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    const token = signJwt({ id: user._id, role: user.role }, process.env.JWT_SECRET, '1h');
    res.status(200).json({ token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createDeliveryPerson = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array()[0].msg });

  const { name, email, password } = req.body;
  try {
    let existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Delivery person already exists' });

    const deliveryPerson = new User({ name, email, password, role: 'delivery', verified: true });
    await deliveryPerson.save();

    res.status(201).json({ message: 'Delivery person created successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
