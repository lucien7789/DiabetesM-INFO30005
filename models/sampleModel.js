const mongoose = require("mongoose");

const SampleDataSchema = new mongoose.Schema({
    name: {
        type: String
    }
});

const SampleDataModel = mongoose.model("SampleData", SampleDataSchema);

module.exports = SampleDataModel;