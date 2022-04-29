const PatientMeasures = require("../models/patientMeasures");
const User = require("../models/user");
const BloodGlucoseController = require("./bloodGlucoseController");

const PatientController = {

    getLatestPatientData: async function(patientID) {

        const patient = await User.findById(patientID);

        if (patient.accountType !== 0) {
            throw new Error("This account is not a patient account");
        }
        let patientMeasures = await PatientMeasures.findById(patient.patientMeasures);

        let bloodGlucose = await BloodGlucoseController.getLatestBloodGlucoseMeasure(patient._id);

        return { patient , patientMeasures, bloodGlucose: bloodGlucose };
    }
}

module.exports = PatientController;