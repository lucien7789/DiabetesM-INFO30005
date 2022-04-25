const mongoose = require("mongoose");

const WeightSchema = new mongoose.Schema({
    //  Units are stored in kg
    weight: {
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

const WeightModel = mongoose.model("Weight", WeightSchema);

module.exports = WeightModel;