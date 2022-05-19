const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    accountType: {
        type: Number,
        required: true
    },
    clinician: {
        type: mongoose.Schema.Types.ObjectID
    },
    patientMeasures: {
        type: mongoose.Schema.Types.ObjectID
    },
    colortheme: {
        type: String
    },
    message: {
        type: String
    },
    registrationDate: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;