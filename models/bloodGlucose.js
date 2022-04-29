const mongoose = require("mongoose")

const BloodGlucoseSchema = new mongoose.Schema({
    //  Units are stored in mmol/L
    value: {
        type: Number,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User",
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    time: {
        type: Date,
        default: Date.now
    }
});

const BloodGlucoseModel = mongoose.model("BloodGlucose", BloodGlucoseSchema);

module.exports = BloodGlucoseModel;