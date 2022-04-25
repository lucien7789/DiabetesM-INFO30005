const mongoose = require("mongoose")

const BloodGlucoseSchema = new mongoose.Schema({
    //  Units are stored in nmol/L
    level: {
        type: Number,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User",
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
});

const BloodGlucoseModel = mongoose.model("BloodGlucose", BloodGlucoseSchema);

module.exports = BloodGlucoseModel;