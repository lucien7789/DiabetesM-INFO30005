const Exercise = require('../models/exercise');
const mongoose = require("mongoose");
const findObjectTemplateFunction = require('../util/findObjectTemplateFunction');
const ExerciseController = {

    createExercise: async function(userID, value, comment) {
        try {
            let exerciseDoc = new Exercise({ userID, value, comment });
            return exerciseDoc.save();
        } catch (err) {
            console.log(`exerciseController.js - ExerciseController - createExercise() - An error occurred trying to create a new document for exercise: {level: ${level}, userID: ${userID}}`);
            throw err;
        }
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
        let finder = () => {
            return Exercise.findOne({ userID: id }, {}, { sort: { time: -1} });
        }
        return findObjectTemplateFunction(finder, "getLtestExerciseMeasure()");
    }
}

module.exports = ExerciseController;