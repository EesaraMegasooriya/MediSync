const Prescription = require('../Models/PresModel');

// @desc Create new prescription
exports.createPrescription = async (req, res) => {
  try {
    const { medicationName, doctorName, prescriptions, tips } = req.body;
    const image = req.file ? req.file.filename : '';

    const newPrescription = new Prescription({
      medicationName,
      image,
      doctorName,
      prescriptions,
      tips,
    });

    await newPrescription.save();
    res.status(201).json({ success: true, message: "Prescription added successfully!" });
  } catch (error) {
    console.error("Error saving prescription:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
