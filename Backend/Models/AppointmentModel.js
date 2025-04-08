const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Provide email"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Please provide a valid email",
      ],
    },
    doctorName: {
      type: String,
      required: [true, "Provide doctor name"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Provide appointment date"],
      validate: {
        validator: function (value) {
          return value >= new Date(); // Ensures date is in the future
        },
        message: "Appointment date must be in the future",
      },
    },
    day: {
      type: String,
      required: [true, "Provide appointment day"],
      enum: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    time: {
      type: String,
      required: [true, "Provide appointment time"],
    },
    location: {
      type: String,
      required: [true, "Provide location"],
      trim: true,
    },
    note: {
      type: String,
      default: "",
      trim: true,
    },
    reminder_sent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
