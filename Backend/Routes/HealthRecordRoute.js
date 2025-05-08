const express = require('express');
const router = express.Router();

const {
    createHealthRecord,
    getAllHealthRecords,
    getHealthRecord,
    updateHealthRecord,
    deleteHealthRecord,
} = require('../Controllers/HealthRecordController');

// Routes with auth middleware
router.post('/createrecord', createHealthRecord);
router.get('/getallrecords/user/:id', getAllHealthRecords);
router.get('/getonerecord/:id', getHealthRecord);
router.put('/updaterecord/:id', updateHealthRecord);
router.delete('/deleterecord/:id', deleteHealthRecord);

module.exports = router;
