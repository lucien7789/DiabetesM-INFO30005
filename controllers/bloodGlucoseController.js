const BloodGlucose = require('../models/bloodGlucose');
const mongoose = require("mongoose");
const findObjectTemplateFunction = require('../util/findObjectTemplateFunction');
const BloodGlucoseController = {

    createBloodGlucose: async function(userID, value, comment) {
        try {
            let bloodGlucoseDoc = new BloodGlucose({ userID, value, comment });
            return bloodGlucoseDoc.save();
        } catch (err) {
            console.log(`bloodGlucoseController.js - BloodGlucoseController - createBloodGlucose() - An error occurred trying to create a new document for bloodGlucose: {level: ${level}, userID: ${userID}}`);
            throw err;
        }
    },

    getBloodGlucoseById: function(id) {
        let finder = () => {
            return BloodGlucose.findById(id);
        }
        return findObjectTemplateFunction(finder, "getBloodGlucoseById()");
    },

    getBloodGlucoseByUserId: function(userID) {
        let finder = () => {
            return BloodGlucose.find({userID: userID});
        }
        return findObjectTemplateFunction(finder, "getBloodGlucoseByUserID()");
    },

    deleteBloodGlucoseById: async function(id) {
        let finder = () => {
            return BloodGlucose.findOneAndDelete({_id: id});
        }
        return findObjectTemplateFunction(finder, "deleteBloodGlucoseById()");

    },

    updateBloodGlucoseById: async function(id, newDoc) {
        let finder = () => {
            return BloodGlucose.findOneAndUpdate({_id: id}, newDoc);
        }
        return findObjectTemplateFunction(finder, "updateBloodGlucoseById()");
    },

    getLatestBloodGlucoseMeasure: async function(id) {
        let finder = () => {
            return BloodGlucose.findOne({ userID: id }, {}, { sort: { time: -1} });
        }
        return findObjectTemplateFunction(finder, "getLtestBloodGlucoseMeasure()");
    }
}

module.exports = BloodGlucoseController;