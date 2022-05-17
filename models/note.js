const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: false
    },
    time: {
        type: Date,
        default: Date.now
    }
});

const NoteModel = mongoose.model("Note", NoteSchema);

module.exports = NoteModel;