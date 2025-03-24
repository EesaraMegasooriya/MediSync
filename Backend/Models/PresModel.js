const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  medicationName: { type: String, required: true },
  doctorName: { type: String, required: true },
  image: { type: String },
  prescriptions: [{ type: String }],
  tips: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
