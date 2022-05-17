const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
    value:{
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

const ExerciseModel = mongoose.model("Exercise", ExerciseSchema);

module.exports = ExerciseModel;