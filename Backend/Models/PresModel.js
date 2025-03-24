const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    medicationName: {
      type: String,
      required: true,
      trim: true,
    },
    doctorName: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: '', // Optional: to handle cases without an uploaded image
    },
    prescriptions: {
      type: [String],
      default: [],
    },
    tips: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Prescription', prescriptionSchema);
