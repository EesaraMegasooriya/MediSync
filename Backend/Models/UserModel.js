const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: '' },

  // ✅ Add these fields to support profile updates
  name: { type: String, default: '' },
  dob: { type: String, default: '' },
  age: { type: String, default: '' },
  address: { type: String, default: '' },
  weight: { type: String, default: '' },
  height: { type: String, default: '' },
  emergencyContacts: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
