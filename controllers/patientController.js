const bcrypt = require("bcryptjs");
const PatientMeasures = require("../models/patientMeasures");
const User = require("../models/user");
const findObjectTemplateFunction = require("../util/findObjectTemplateFunction");
const BloodGlucoseController = require("./bloodGlucoseController");

const SALT_FACTOR = 10;
const PatientController = {

    getPatientUsersByClinicianId: function(id) {
        let finder = () => {
            return User.find({ clinician: id });
        }
        return findObjectTemplateFunction(finder, "getPatientUsersByClinician()");
    },

    getLatestPatientData: async function(clinicianID) {
        let patients = await this.getPatientUsersByClinicianId(clinicianID);

        console.log(patients);
        patients = patients.map(async p => {
            let patientMeasures = await PatientMeasures.findById(p.patientMeasures);

            let bloodGlucose = await BloodGlucoseController.getLatestBloodGlucoseMeasure(p._id);
            return {p, patientMeasures, bloodGlucose: bloodGlucose };
        });
        
        return Promise.all(patients);
    }
}

module.exports = PatientController;