const express = require('express');
const router = express.Router();

const {
    createHealthRecord,
    getAllHealthRecords,
    getHealthRecord,
    updateHealthRecord,
    deleteHealthRecord
} = require('../Controllers/HealthRecordController');

// Routes with auth middleware
router.post('/', createHealthRecord);
router.get('/', getAllHealthRecords);
router.get('/:id', getHealthRecord);
router.put('/:id', updateHealthRecord);
router.delete('/:id', deleteHealthRecord);

module.exports = router;
