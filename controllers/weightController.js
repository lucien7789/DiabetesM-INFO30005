const Weight = require('../models/weight');
const findObjectTemplateFunction = require('../util/findObjectTemplateFunction');
const WeightController = {

    createWeight: async function(weight, userID) {
        try {
            const weightDoc = new Weight({ weight: weight, userID: userID });

            await weightDoc.save();
        } catch (err) {
            console.log(`weightController.js - WeightController - createWeight() - An error occurred trying to create a new document for weight: {weight: ${weight}, userID: ${userID}}`);
            return false;
        }
        return true;
    },

    getWeightById: function(id) {
        let finder = () => {
            return Weight.findById(id);
        }
        return findObjectTemplateFunction(finder, "getWeightById()");
    },

    getWeightByUserID: function(userID) {
        let finder = () => {
            return Weight.find({userID: userID});
        }
        return findObjectTemplateFunction(finder, "getWeightByUserID()");
    },

    deleteWeightById: async function(id) {
        try {
            const { deleteCount } = await Weight.deleteOne({id: id});
            return deleteCount == 1;
        } catch (err) {
            console.log(`weightController.js - WeightController - deleteWeight() - An error occurred trying to delete a new document for weight: {id: ${id}}`);
        }
        return false;
    },

    updateWeight: async function(id, newDoc) {
        try {
            const { updateCount } = await Weight.updateOne({id: id}, {$set: newDoc});
            return updateCount == 1;
        } catch (err) {
            console.log(`weightController.js - WeightController - deleteWeight() - An error occurred trying to update a document for weight: {id: ${id}, ${Object.entries(newDoc).map(e => ", " + e[0] + ": " + e[1])}}`);
        }
        return false;
    }
}

module.exports = WeightController;