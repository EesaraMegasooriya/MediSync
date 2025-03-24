const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed password

  // New profile fields
  name: { type: String, default: '' },
  dateOfBirth: { type: String, default: '' },
  age: { type: String, default: '' },
  address: { type: String, default: '' },
  weight: { type: String, default: '' },
  height: { type: String, default: '' },
  emergencyContacts: [{ type: String }], // Array of contact numbers
  profilePicUrl: { type: String, default: '' } // URL or path to profile picture

}, { timestamps: true });

// Export User model
const User = mongoose.model('User', userSchema);

module.exports = User;
