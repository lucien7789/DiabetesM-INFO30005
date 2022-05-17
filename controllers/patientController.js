const PatientMeasures = require("../models/patientMeasures");
const User = require("../models/user");
const BloodGlucoseController = require("./bloodGlucoseController");

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

        let bloodGlucose = await BloodGlucoseController.getLatestBloodGlucoseMeasure(patient._id);

        return { patient , patientMeasures, bloodGlucose: bloodGlucose };
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