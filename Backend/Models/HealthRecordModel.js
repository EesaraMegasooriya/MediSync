const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
    diseaseName: {
        type: String,
        required: true
    },
    diagnosisDate: {
        type: Date,
        required: true
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
    level: String,
    labTestResult: String,
    additionalNote: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
