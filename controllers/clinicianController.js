const bcrypt = require("bcryptjs");
const NoteModel = require("../models/note");
const PatientMeasures = require("../models/patientMeasures");
const User = require("../models/user");
const findObjectTemplateFunction = require("../util/findObjectTemplateFunction");
const BloodGlucoseController = require("./bloodGlucoseController");
const ExerciseController = require("./exerciseController");
const InsulinController = require("./insulinController");
const WeightController = require("./weightController");

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
            let patientMeasures = await PatientMeasures.findOne({userID: p._id});

            let [bloodGlucose, exercise, insulin, weight] = await Promise.all([
                BloodGlucoseController.getLatestBloodGlucoseMeasure(p._id), 
                ExerciseController.getLatestExerciseMeasure(p._id), 
                InsulinController.getLatestInsulinMeasure(p._id), 
                WeightController.getLatestWeightMeasure(p._id)
            ]);

            return {p, patientMeasures, bloodGlucose: bloodGlucose, exercise: exercise, insulin: insulin, weight: weight };
        });
        
        return Promise.all(patients);
    },

    updatePatientMessage: async function(clinicianID, patientID, message) {
        let patients = await this.getPatientUsersByClinicianId(clinicianID);

        let p = patients.find(p => p._id == patientID);
        if (p) {
            let { acknowledged } = await User.updateOne({ _id: p._id }, { $set: { message: message} });
            return acknowledged;
        } else {
            throw new Error("The patient id entered does not belong to you");
        }
    },
    getPatientNotes: async function(patientID, text) {
        let finder = () => {
            return NoteModel.find({userID: patientID}, {}, {sort: {time: -1}});
        }
        return findObjectTemplateFunction(finder, "getPatientNotes()");
    },
    createPatientNote: async function(patientID, text) {
        let note = new NoteModel({ userID: patientID, text: text});
        return note.save();
    }
}

module.exports = ClinicianController;