const mongoose = require("mongoose");

const Engagement = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const EngagementModel = mongoose.model("Engagement", Engagement);

module.exports = EngagementModel;