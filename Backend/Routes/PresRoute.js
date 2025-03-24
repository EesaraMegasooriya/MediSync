const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createPrescription } = require('../Controllers/PresController');

// Image upload setup using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// Route: POST /api/prescriptions
router.post('/', upload.single('image'), createPrescription);

module.exports = router;
