const PrescriptionHistory = require('../Models/PrescriptionHistory');
const Prescription = require('../Models/PresModel'); // assuming this is also imported

// @desc Create prescription
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

    const image = req.file?.filename || 'default_med_image.jpg';

    const newPrescription = new Prescription({
      userId,
      medicationName,
      doctorName,
      prescriptions,
      tips,
      image
    });

    await newPrescription.save();

    res.status(201).json({ message: 'Prescription created successfully' });
  } catch (error) {
    console.error("Create Error:", error);
    res.status(500).json({ message: 'Failed to create prescription' });
  }
};

// @desc Get all prescriptions
exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.status(200).json(prescriptions);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: 'Failed to fetch prescriptions' });
  }
};

// @desc Update prescription
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
      tips
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

// @desc Delete prescription
exports.deletePrescription = async (req, res) => {
  try {
    await Prescription.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: 'Failed to delete prescription' });
  }
};
