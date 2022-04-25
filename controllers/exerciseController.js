const Exercise = require('../models/exercise');
const findObjectTemplateFunction = require('../util/findObjectTemplateFunction');
const ExerciseController = {

    createExercise: async function(steps, userID) {
        try {
            const exerciseDoc = new Exercise({ steps: steps, userID: userID });

            await exerciseDoc.save();
        } catch (err) {
            console.log(`exerciseController.js - ExerciseController - createExercise() - An error occurred trying to create a new document for exercise: {steps: ${steps}, userID: ${userID}}`);
            return false;
        }
        return true;
    },

    getExerciseById: function(id) {
        let finder = () => {
            return Exercise.findById(id);
        }
        return findObjectTemplateFunction(finder, "getExerciseById()");
    },

    getExerciseByUserID: function(userID) {
        let finder = () => {
            return Exercise.find({userID: userID});
        }
        return findObjectTemplateFunction(finder, "getExerciseByUserID()");
    },

    deleteExerciseById: async function(id) {
        try {
            const { deleteCount } = await Exercise.deleteOne({id: id});
            return deleteCount == 1;
        } catch (err) {
            console.log(`exerciseController.js - ExerciseController - deleteExercise() - An error occurred trying to delete a new document for exercise: {id: ${id}}`);
        }
        return false;
    },

    updateExercise: async function(id, newDoc) {
        try {
            const { updateCount } = await Exercise.updateOne({id: id}, {$set: newDoc});
            return updateCount == 1;
        } catch (err) {
            console.log(`exerciseController.js - ExerciseController - deleteExercise() - An error occurred trying to update a document for exercise: {id: ${id}, ${Object.entries(newDoc).map(e => ", " + e[0] + ": " + e[1])}}`);
        }
        return false;
    }
}

module.exports = ExerciseController;