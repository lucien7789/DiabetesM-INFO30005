const mongoose = require("mongoose");

const WeightSchema = new mongoose.Schema({
    //  Units are stored in kg
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

const WeightModel = mongoose.model("Weight", WeightSchema);

module.exports = WeightModel;