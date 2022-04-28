const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
    stepCount:{
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

const ExerciseModel = mongoose.model("Exercise", ExerciseSchema);

module.exports = ExerciseModel;