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


// @desc Get all prescriptions
exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.status(200).json(prescriptions);
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


exports.updatePrescription = async (req, res) => {
  try {
    const { medicationName, doctorName, prescriptions, tips } = req.body;
    const updateData = {
      medicationName,
      doctorName,
      prescriptions: JSON.parse(prescriptions),
      tips: JSON.parse(tips),
    };
    if (req.file) updateData.image = req.file.filename;

    const updated = await Prescription.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: 'Update failed' });
  }
};

exports.deletePrescription = async (req, res) => {
  try {
    await Prescription.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: 'Delete failed' });
  }
};
