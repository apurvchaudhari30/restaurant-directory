const Admin = require('../models/admin.model');
const jwt = require('jsonwebtoken');
const secretKey = 'Marvellous:RestaurantInfo'; 
const bcrypt = require("bcrypt");


exports.getAllUsers = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
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









