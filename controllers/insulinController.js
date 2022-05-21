const Insulin = require('../models/insulin');
const mongoose = require("mongoose");
const findObjectTemplateFunction = require('../util/findObjectTemplateFunction');
const inputValidator = require('../util/inputValidator');
const InsulinController = {

    createInsulin: async function(userID, value, comment) {
        try {
            inputValidator(value, { isNumber: true, greaterThanZero: true});
            let insulinDoc = new Insulin({ userID, value, comment });
            return insulinDoc.save();
        } catch (err) {
            console.log(`insulinController.js - InsulinController - createInsulin() - An error occurred trying to create a new document for insulin: {level: ${level}, userID: ${userID}}`);
            throw err;
        }
    },

    getInsulinById: function(id) {
        let finder = () => {
            return Insulin.findById(id);
        }
        return findObjectTemplateFunction(finder, "getInsulinById()");
    },

    getInsulinByUserId: function(userID) {
        let finder = () => {
            return Insulin.find({userID: userID}, {}, { sort: { time: -1} });
        }
        return findObjectTemplateFunction(finder, "getInsulinByUserID()");
    },

    deleteInsulinById: async function(id) {
        let finder = () => {
            return Insulin.findOneAndDelete({_id: id});
        }
        return findObjectTemplateFunction(finder, "deleteInsulinById()");

    },

    updateInsulinById: async function(id, newDoc) {
        let finder = () => {
            return Insulin.findOneAndUpdate({_id: id}, newDoc);
        }
        return findObjectTemplateFunction(finder, "updateInsulinById()");
    },

    getLatestInsulinMeasure: async function(id) {
        let today = new Date(new Date().toDateString());
        return Insulin.findOne({ userID: id, time: { $gte: today }});
    }
}

module.exports = InsulinController;