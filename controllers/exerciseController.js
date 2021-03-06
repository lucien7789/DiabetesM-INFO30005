const Exercise = require('../models/exercise');
const mongoose = require("mongoose");
const findObjectTemplateFunction = require('../util/findObjectTemplateFunction');
const inputValidator = require('../util/inputValidator');
const ExerciseController = {

    createExercise: async function(userID, value, comment) {
        try {
            inputValidator(value, { isNumber: true, greaterThanZero: true});
            let exerciseDoc = new Exercise({ userID, value, comment });
            return exerciseDoc.save();
        } catch (err) {
            console.log(`exerciseController.js - ExerciseController - createExercise() - An error occurred trying to create a new document for exercise: {level: ${level}, userID: ${userID}}`);
            throw err;
        }
    },

    getAllExerciseByTime() {
        return Exercise.find({}, {}, {sort: { time: -1 }}).lean();
    },

    getExerciseById: function(id) {
        let finder = () => {
            return Exercise.findById(id);
        }
        return findObjectTemplateFunction(finder, "getExerciseById()");
    },

    getExerciseByUserId: function(userID) {
        let finder = () => {
            return Exercise.find({userID: userID}, {}, { sort: { time: -1} });
        }
        return findObjectTemplateFunction(finder, "getExerciseByUserID()");
    },

    deleteExerciseById: async function(id) {
        let finder = () => {
            return Exercise.findOneAndDelete({_id: id});
        }
        return findObjectTemplateFunction(finder, "deleteExerciseById()");

    },

    updateExerciseById: async function(id, newDoc) {
        let finder = () => {
            return Exercise.findOneAndUpdate({_id: id}, newDoc);
        }
        return findObjectTemplateFunction(finder, "updateExerciseById()");
    },

    getLatestExerciseMeasure: async function(id) {
        let today = new Date(new Date().toDateString());
        return Exercise.findOne({ userID: id, time: { $gte: today }});
    }
}

module.exports = ExerciseController;