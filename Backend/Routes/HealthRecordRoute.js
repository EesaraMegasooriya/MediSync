const express = require('express');
const router = express.Router();
const {
    createHealthRecord,
    getAllHealthRecords,
    getHealthRecord,
    updateHealthRecord,
    deleteHealthRecord
} = require('../Controllers/HealthRecordController');

// Routes
router.post('/createrecord', createHealthRecord);
router.get('/getallrecords', getAllHealthRecords);
router.get('/getrecord/:id', getHealthRecord);
router.put('/update/:id', updateHealthRecord);
router.delete('/deleterecord/:id', deleteHealthRecord);

module.exports = router;
