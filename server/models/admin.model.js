const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
  password: String
});

module.exports = mongoose.model('Admin', AdminSchema);
