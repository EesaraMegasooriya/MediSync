const express = require('express');
const router = express.Router();
const doctorController = require('../Controllers/doctorController');

router.post('/', doctorController.addDoctor);
router.get('/', doctorController.getDoctors);

module.exports = router;
