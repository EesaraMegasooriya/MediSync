const HealthRecord = require('../Models/HealthRecordModel');

// Create new health record
exports.createHealthRecord = async (req, res) => {
    try {
        const newRecord = new HealthRecord({
            ...req.body
        });

        // Validate date
        if (new Date(req.body.diagnosisDate) > new Date()) {
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
      const userId = req.params.id; // Extract userId from URL parameters
  
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      const records = await HealthRecord.find({ userId }); // Fetch records for the user
  
      if (!records || records.length === 0) {
        return res.status(404).json({ message: 'No records found for this user' });
      }
  
      res.status(200).json(records); // Return the records
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Get single health record
exports.getHealthRecord = async (req, res) => {
    try {
        const record = await HealthRecord.findOne({
            _id: req.params.id
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
        // Validate level if it's being updated
        const updatedRecord = await HealthRecord.findOneAndUpdate(
            { _id: req.params.id  },
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
            _id: req.params.id
        });
        if (!deletedRecord) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
