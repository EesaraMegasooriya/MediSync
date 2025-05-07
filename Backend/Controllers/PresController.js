const Prescription = require('../Models/PresModel');
const PrescriptionHistory = require('../Models/PrescriptionHistory');



exports.createPrescription = async (req, res) => {
  try {
    const { medicationName, doctorName, userId } = req.body;

    let tips = req.body.tips || [];
    let prescriptions = req.body.prescriptions || [];

    if (typeof tips === 'string') tips = [tips];
    if (typeof prescriptions === 'string') prescriptions = [prescriptions];

    const image = req.file ? req.file.filename : 'default_med_image.jpg';

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
    const { medicationName, doctorName, prescriptions, tips } = req.body;
    const updateData = {
      medicationName,
      doctorName,
      prescriptions: JSON.parse(prescriptions),
      tips: JSON.parse(tips),
    };
    if (req.file) updateData.image = req.file.filename;

    const updated = await Prescription.findByIdAndUpdate(req.params.id, updateData, { new: true });

    //  Save update history
    const historyEntry = new PrescriptionHistory({
      username: updated.username,
      medicationName: updated.medicationName,
      doctorName: updated.doctorName,
      image: updated.image,
      prescriptions: updated.prescriptions,
      tips: updated.tips,
      action: 'updated',
    });
    await historyEntry.save();

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
