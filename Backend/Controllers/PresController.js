const Prescription = require('../Models/PresModel');
const PrescriptionHistory = require('../Models/PrescriptionHistory');



exports.createPrescription = async (req, res) => {
  try {
    const { medicationName, doctorName } = req.body;
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    let tips = req.body.tips || [];
    let prescriptions = req.body.prescriptions || [];

    if (typeof tips === 'string') tips = [tips];
    if (typeof prescriptions === 'string') prescriptions = [prescriptions];

    const image = req.file?.filename || ""; // default to empty string if no image

    const newPrescription = new Prescription({
      userId,
      medicationName,
      doctorName,
      prescriptions,
      tips,
      image,
    });

    await newPrescription.save();

    const historyEntry = new PrescriptionHistory({
      userId,
      medicationName,
      doctorName,
      prescriptions,
      tips,
      image,
      action: 'created',
    });

    await historyEntry.save();

    res.status(201).json({ success: true, message: 'Prescription added successfully!' });
  } catch (error) {
    console.error("Internal server error:", error);
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
    const { medicationName, doctorName } = req.body;

    const prescriptions = JSON.parse(req.body.prescriptions || '[]');
    const tips = JSON.parse(req.body.tips || '[]');
    const image = req.file?.filename;

    const updatedData = {
      medicationName,
      doctorName,
      prescriptions,
      tips,
    };

    if (image) updatedData.image = image;

    const updated = await Prescription.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Prescription not found' });

    res.status(200).json({ message: 'Prescription updated successfully' });
  } catch (err) {
    console.error('Update error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
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
