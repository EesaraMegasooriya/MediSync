const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const PrescriptionHistory = require('../Models/PrescriptionHistory');


const {
  createPrescription,
  getAllPrescriptions,
  updatePrescription,
  deletePrescription,
} = require('../Controllers/PresController');

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// POST route to add a prescription
router.post('/', upload.single('image'), createPrescription);

// ✅ GET route to fetch all prescriptions
router.get('/', getAllPrescriptions);

// In routes/prescriptions.js or similar
router.get('/history', async (req, res) => {
  try {
    const history = await PrescriptionHistory.find().sort({ timestamp: -1 });
    res.status(200).json(history);
  } catch (err) {
    console.error("Fetch History Error:", err);
    res.status(500).json({ message: "Failed to fetch history" });
  }
});



router.put('/:id', upload.single('image'), updatePrescription);
router.delete('/:id', deletePrescription);


module.exports = router;
