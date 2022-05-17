const mongoose = require("mongoose");

const InsulinSchema = new mongoose.Schema({
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

const InsulinModel = mongoose.model("Insulin", InsulinSchema);

module.exports = InsulinModel;