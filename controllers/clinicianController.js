const bcrypt = require("bcryptjs");
const PatientMeasures = require("../models/patientMeasures");
const User = require("../models/user");
const findObjectTemplateFunction = require("../util/findObjectTemplateFunction");
const BloodGlucoseController = require("./bloodGlucoseController");

const ClinicianController = {

    getPatientUsersByClinicianId: function(id) {
        let finder = () => {
            return User.find({ clinician: id });
        }
        return findObjectTemplateFunction(finder, "getPatientUsersByClinician()");
    },

    getLatestPatientData: async function(clinicianID) {
        let patients = await this.getPatientUsersByClinicianId(clinicianID);

        patients = patients.map(async p => {
            let patientMeasures = await PatientMeasures.findById(p.patientMeasures);

            let bloodGlucose = await BloodGlucoseController.getLatestBloodGlucoseMeasure(p._id);

            return {p, patientMeasures, bloodGlucose: bloodGlucose };
        });
        
        return Promise.all(patients);
    },

    updatePatientMessage: async function(clinicianID, patientID, message) {
        let patients = await this.getPatientUsersByClinicianId(clinicianID);

        let p = patients.find(p => p._id == patientID);
        if (p) {
            let { updateCount } = User.updateOne({ _id: p._id }, {}, { $set: { message: message} });

            return updateCount === 1;
        } else {
            throw new Error("The patient id entered does not belong to you");
        }
    }
}

module.exports = ClinicianController;