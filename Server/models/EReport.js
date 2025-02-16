const mongoose = require('mongoose');

const ereportSchema = new mongoose.Schema({
    appliance: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    reportDate: {
        type: Date,
        default: Date.now,  // Automatically set the report date
    },
    timeReported: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Assuming you have a User model
        required: true,
    },
});

module.exports = mongoose.model('EReport', ereportSchema);
