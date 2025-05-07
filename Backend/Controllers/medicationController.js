const Medication = require('../Models/Medication'); //  correct


exports.addMedication = async (req, res) => {
  try {
    const medication = new Medication(req.body);
    await medication.save();
    res.status(201).json(medication);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add medication', error: err.message });
  }
};

exports.getMedications = async (req, res) => {
  try {
    const medications = await Medication.find();
    res.status(200).json(medications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch medications', error: err.message });
  }
};
