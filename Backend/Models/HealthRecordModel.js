const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
    diseaseName: {
        type: String,
        required: true
    },
    diagnosisDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value >= new Date().setHours(0,0,0,0);
            },
            message: 'Diagnosis date cannot be in the past'
        }
    },
    symptoms: {
        type: String,
        required: true
    },
    diagnosedBy: {
        type: String,
        required: true
    },
    doctorsNote: String,
    hospitalName: {
        type: String,
        required: true
    },
    level: {
        type: String,
        validate: {
            validator: function(value) {
                return /[a-zA-Z]/.test(value);
            },
            message: 'Level must contain at least one letter, not just numbers'
        }
    },
    labTestResult: String,
    additionalNote: String,
    userId: {
        type: String,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
