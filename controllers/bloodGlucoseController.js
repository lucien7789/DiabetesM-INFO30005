const BloodGlucose = require('../models/bloodGlucose');
const mongoose = require("mongoose");
const findObjectTemplateFunction = require('../util/findObjectTemplateFunction');
const BloodGlucoseController = {

    createBloodGlucose: async function(level, userID) {
        try {
            const bloodGlucoseDoc = new BloodGlucose({ level: level, userID: userID });

            await bloodGlucoseDoc.save();
        } catch (err) {
            console.log(`bloodGlucoseController.js - BloodGlucoseController - createBloodGlucose() - An error occurred trying to create a new document for bloodGlucose: {level: ${level}, userID: ${userID}}`);
            return false;
        }
        return true;
    },

    getBloodGlucoseById: function(id) {
        let finder = () => {
            return BloodGlucose.findById(id);
        }
        return findObjectTemplateFunction(finder, "getBloodGlucoseById()");
    },

    getBloodGlucoseByUserID: function(userID) {
        let finder = () => {
            return BloodGlucose.find({userID: userID});
        }
        return findObjectTemplateFunction(finder, "getBloodGlucoseByUserID()");
    },

    deleteBloodGlucoseById: async function(id) {
        try {
            result = await BloodGlucose.findOneAndDelete({_id: id});

            if (result) {
                return true;
            }
        } catch (err) {
            console.log(`bloodGlucoseController.js - BloodGlucoseController - deleteBloodGlucose() - An error occurred trying to delete a new document for bloodGlucose: {id: ${id}}`);
        }
        return false;
    },

    updateBloodGlucose: async function(id, newDoc) {
        try {
            result = await BloodGlucose.findOneAndUpdate({_id: id}, newDoc);
            
            if(result) {
                return true;
            }
        } catch (err) {
            console.log(`bloodGlucoseController.js - BloodGlucoseController - deleteBloodGlucose() - An error occurred trying to update a document for bloodGlucose: {id: ${id}, ${Object.entries(newDoc).map(e => ", " + e[0] + ": " + e[1])}}`);
        }
        return false;
    }
}

module.exports = BloodGlucoseController;