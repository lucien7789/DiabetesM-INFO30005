const mongoose = require("mongoose");

const PatientMeasuresSchema = new mongoose.Schema({
    bloodGlucose: {
        type: Boolean,
        required: true
    },
    bloodGlucoseSafetyThresholdBottom: {
        type: Number,
        required: false
    },
    bloodGlucoseSafetyThresholdTop: {
        type: Number,
        required: false
    }
});

const PatientMeasuresModel = mongoose.model("PatientMeasures", PatientMeasuresSchema);

module.exports = PatientMeasuresModel;