const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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
      default: '',
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
