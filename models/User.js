const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    accountType: {
        type: Number
    }
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;