const mongoose = require('mongoose');

const prescriptionHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String, 
    default: null
  },
  medicationName: String,
  doctorName: String,
  image: String,
  prescriptions: [String],
  tips: [String],
  action: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PrescriptionHistory', prescriptionHistorySchema);
