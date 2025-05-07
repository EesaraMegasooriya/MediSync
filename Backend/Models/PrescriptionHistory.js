const mongoose = require('mongoose');

const prescriptionHistorySchema = new mongoose.Schema({
  username: String,
  medicationName: String,
  doctorName: String,
  image: String,
  prescriptions: [String],
  tips: [String],
  action: String, // "created" or "updated"
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PrescriptionHistory', prescriptionHistorySchema);
