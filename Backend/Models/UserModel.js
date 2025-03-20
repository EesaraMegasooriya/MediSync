const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed password
}, { timestamps: true });

// Export User model
const User = mongoose.model('User', userSchema);

module.exports = User;
