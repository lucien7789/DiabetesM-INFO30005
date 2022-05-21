const Weight = require('../models/weight');
const mongoose = require("mongoose");
const findObjectTemplateFunction = require('../util/findObjectTemplateFunction');
const inputValidator = require('../util/inputValidator');
const WeightController = {

    createWeight: async function(userID, value, comment) {
        try {
            inputValidator(value, { isNumber: true, greaterThanZero: true});
            let weightDoc = new Weight({ userID, value, comment });
            return weightDoc.save();
        } catch (err) {
            console.log(`weightController.js - WeightController - createWeight() - An error occurred trying to create a new document for weight: {level: ${level}, userID: ${userID}}`);
            throw err;
        }
    },

    getWeightById: function(id) {
        let finder = () => {
            return Weight.findById(id);
        }
        return findObjectTemplateFunction(finder, "getWeightById()");
    },

    getWeightByUserId: function(userID) {
        let finder = () => {
            return Weight.find({userID: userID}, {}, { sort: { time: -1} });
        }
        return findObjectTemplateFunction(finder, "getWeightByUserID()");
    },

    deleteWeightById: async function(id) {
        let finder = () => {
            return Weight.findOneAndDelete({_id: id});
        }
        return findObjectTemplateFunction(finder, "deleteWeightById()");

    },

    updateWeightById: async function(id, newDoc) {
        let finder = () => {
            return Weight.findOneAndUpdate({_id: id}, newDoc);
        }
        return findObjectTemplateFunction(finder, "updateWeightById()");
    },

    getLatestWeightMeasure: async function(id) {
        let today = new Date(new Date().toDateString());
        return Weight.findOne({ userID: id, time: { $gte: today }});
    }
}

module.exports = WeightController;