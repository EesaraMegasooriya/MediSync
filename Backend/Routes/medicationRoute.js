const express = require('express');
const router = express.Router();
const medicationController = require('../Controllers/medicationController');

router.post('/', medicationController.addMedication);
router.get('/', medicationController.getMedications);

module.exports = router;
