const SampleDataModel = require("../models/sampleModel");
const findObjectTemplateFunction = require("../util/findObjectTemplateFunction");
const SampleDataController = {

    createSampleData: async function(name) {
        try {
            const sampleDataDoc = new SampleDataModel({ name: name });

            await sampleDataDoc.save();
        } catch (err) {
            console.log(`sampleController.js - SampleDataController - createSampleData() - An error occurred trying to create a new document for sampleData: {name: ${name}}`);
            return false;
        }
        return true;
    },
    
    getSampleDataById: function(id) {
        let finder = () => {
            return SampleDataModel.findById(id);
        }
        return findObjectTemplateFunction(finder, "getSampleDataById()");
    },

    getSampleDataByName: function(name) {
        let finder = () => {
            return SampleDataModel.findOne({name: name});
        }
        return findObjectTemplateFunction(finder, "getSampleDataByName()");
    },

    deleteSampleDataById: async function(id) {
        try {
            const { deleteCount } = await SampleDataModel.deleteOne({id: id});
            return deleteCount == 1;
        } catch (err) {
            console.log(`sampleController.js - SampleDataController - deleteSampleData() - An error occurred trying to delete a new document for sampleData: {id: ${id}}`);
        }
        return false;
    },

    updateSampleData: async function(id, newDoc) {
        try {
            const { updateCount } = await SampleDataModel.updateOne({id: id}, {$set: newDoc});
            return updateCount == 1;
        } catch (err) {
            console.log(`sampleController.js - SampleDataController - deleteSampleData() - An error occurred trying to update a document for sampleData: {id: ${id}, ${Object.entries(newDoc).map(e => ", " + e[0] + ": " + e[1])}}`);
        }
        return false;
    }
}

module.exports = SampleDataController;