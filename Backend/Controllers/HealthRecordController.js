const HealthRecord = require('../Models/HealthRecordModel');

// Create new health record
exports.createHealthRecord = async (req, res) => {
    try {
        const newRecord = new HealthRecord({
            ...req.body,
            userId: req.user?._id || '507f1f77bcf86cd799439011' // Temporary default ID
        });

        // Validate date
        if (new Date(req.body.diagnosisDate) < new Date().setHours(0,0,0,0)) {
            return res.status(400).json({ 
                message: 'Validation failed',
                errors: { diagnosisDate: 'Diagnosis date cannot be in the past' }
            });
        }

        // Validate level if provided
        if (req.body.level && !/[a-zA-Z]/.test(req.body.level)) {
            return res.status(400).json({ 
                message: 'Validation failed',
                errors: { level: 'Level must contain at least one letter, not just numbers' }
            });
        }

        const savedRecord = await newRecord.save();
        res.status(201).json(savedRecord);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation failed',
                errors: Object.keys(error.errors).reduce((acc, key) => {
                    acc[key] = error.errors[key].message;
                    return acc;
                }, {})
            });
        }
        res.status(400).json({ message: error.message });
    }
};

// Get all health records for a user
exports.getAllHealthRecords = async (req, res) => {
    try {
        const records = await HealthRecord.find({ userId: req.user._id });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single health record
exports.getHealthRecord = async (req, res) => {
    try {
        const record = await HealthRecord.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update health record
exports.updateHealthRecord = async (req, res) => {
    try {
        // Validate date if it's being updated
        if (req.body.diagnosisDate && new Date(req.body.diagnosisDate) < new Date().setHours(0,0,0,0)) {
            return res.status(400).json({ 
                message: 'Validation failed',
                errors: { diagnosisDate: 'Diagnosis date cannot be in the past' }
            });
        }

        // Validate level if it's being updated
        if (req.body.level && !/[a-zA-Z]/.test(req.body.level)) {
            return res.status(400).json({ 
                message: 'Validation failed',
                errors: { level: 'Level must contain at least one letter, not just numbers' }
            });
        }

        const updatedRecord = await HealthRecord.findOneAndUpdate(
            { _id: req.params.id, userId: req.user?._id || '507f1f77bcf86cd799439011' },
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedRecord) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json(updatedRecord);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation failed',
                errors: Object.keys(error.errors).reduce((acc, key) => {
                    acc[key] = error.errors[key].message;
                    return acc;
                }, {})
            });
        }
        res.status(400).json({ message: error.message });
    }
};

// Delete health record
exports.deleteHealthRecord = async (req, res) => {
    try {
        const deletedRecord = await HealthRecord.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!deletedRecord) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
