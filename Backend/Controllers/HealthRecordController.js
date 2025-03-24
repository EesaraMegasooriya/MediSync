const HealthRecord = require('../Models/HealthRecordModel');

// Create new health record
exports.createHealthRecord = async (req, res) => {
    try {
        const newRecord = new HealthRecord({
            ...req.body,
            userId: req.user._id // Assuming user is authenticated
        });
        const savedRecord = await newRecord.save();
        res.status(201).json(savedRecord);
    } catch (error) {
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
        const updatedRecord = await HealthRecord.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!updatedRecord) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json(updatedRecord);
    } catch (error) {
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
