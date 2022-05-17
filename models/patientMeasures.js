const mongoose = require("mongoose");

const PatientMeasuresSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: "User"
    },
    bloodGlucose: {
        type: Boolean,
        required: true,
        default: false
    },
    bloodGlucoseSafetyThresholdBottom: {
        type: Number,
        required: false,
        default: 6
    },
    bloodGlucoseSafetyThresholdTop: {
        type: Number,
        required: false,
        default: 9
    },
    exercise: {
        type: Boolean,
        required: true,
        default: false,
    },
    exerciseSafetyThresholdBottom: {
        type: Number,
        required: false,
        default: 1000
    },
    exerciseSafetyThresholdTop: {
        type: Number,
        required: false,
        default: 20000
    },
    insulin: {
        type: Boolean,
        required: true,
        default: false
    },
    insulinSafetyThresholdBottom: {
        type: Number,
        required: false,
        default: 1
    },
    insulinSafetyThresholdTop: {
        type: Number,
        required: false,
        default: 5
    },
    weight: {
        type: Boolean,
        required: true,
        default: false
    },
    weightSafetyThresholdBottom: {
        type: Number,
        required: false,
        default: 50
    },
    weightSafetyThresholdTop: {
        type: Number,
        required: false,
        default: 100
    },
});

const PatientMeasuresModel = mongoose.model("PatientMeasures", PatientMeasuresSchema);

module.exports = PatientMeasuresModel;