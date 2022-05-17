const PatientMeasures = require("../models/patientMeasures");
const User = require("../models/user");
const BloodGlucoseController = require("./bloodGlucoseController");
const ExerciseController = require("./exerciseController");
const InsulinController = require("./insulinController");
const WeightController = require("./weightController");
const PatientController = {

    getLatestPatientData: async function(patientID) {

        const patient = await User.findById(patientID);

        if (!patient) {
            throw new Error("No patient account found");
        }
        if (patient.accountType !== 0) {
            throw new Error("This account is not a patient account");
        }
        let patientMeasures = await PatientMeasures.findOne({userID: patientID});
        let bloodGlucose, exercise, insulin, weight;
        await Promise.all([
            async () => {
                bloodGlucose = await BloodGlucoseController.getLatestBloodGlucoseMeasure(patient._id);
                return;
            },
            async () => {
                exercise = await ExerciseController.getLatestExerciseMeasure(patient._id);
                return;
            },
            async () => {
                insulin = await InsulinController.getLatestInsulinMeasure(patient._id);
                return;
            },
            async () => {
                weight = await WeightController.getLatestWeightMeasure(patient._id);
                return;
            }
            
        ]);

        return { patient , patientMeasures, bloodGlucose, exercise, insulin, weight };
    },

    getPatientMessage: async function(patientID) {
        const patient = await User.findById(patientID);

        if (!patient) {
            throw new Error("No patient account found");
        }
        if (patient.accountType !== 0) {
            throw new Error("This account is not a patient account");
        }

        return patient.message;
    }
}

module.exports = PatientController;