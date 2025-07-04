const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secretKey = 'Marvellous:RestaurantInfo'; 
const User = require("../models/user.model");

exports.signup = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ user: newUser });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: err.message || 'Internal Server Error' });
  }
};


exports.getAllSignupUsers = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);  

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const tokenPayload = { subject: user._id };
    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
