const bcrypt = require("bcryptjs");
const NoteModel = require("../models/note");
const PatientMeasures = require("../models/patientMeasures");
const User = require("../models/user");
const findObjectTemplateFunction = require("../util/findObjectTemplateFunction");
const BloodGlucoseController = require("./bloodGlucoseController");
const ExerciseController = require("./exerciseController");
const InsulinController = require("./insulinController");
const WeightController = require("./weightController");

const maxRecentEntriesWithCommentsLimit = 10;

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
    getAllRecentPatientComments: async function(clinicianID) {
        let patients = await this.getPatientUsersByClinicianId(clinicianID);
        let pIds = {};
        patients.map(p => {
            pIds[p._id.toString()] = p;
        });

        let [bloodGlucose, exercise, insulin, weight] = await Promise.all([
            BloodGlucoseController.getAllBloodGlucoseByTime(), 
            ExerciseController.getAllExerciseByTime(), 
            InsulinController.getAllInsulinByTime(), 
            WeightController.getAllWeightByTime()
        ]);

        let entries = [...bloodGlucose, ...exercise, ...insulin, ...weight];

        // Filter out entries without comments and pIds that are not linked to the requesting clinician
        // Then map each entry so that it includes names
        entries = entries
            .filter(e => e.comment !== undefined && pIds[e.userID.toString()] !== undefined)
            .map(e => ({...e, firstName: pIds[e.userID.toString()].firstName, lastName: pIds[e.userID.toString()].lastName}));
        entries.sort((a, b) => new Date(b.time) - new Date(a.time));

        return entries.slice(0, maxRecentEntriesWithCommentsLimit);
    },
    updatePatientMessage: async function(clinicianID, patientID, message) {
        if (message === undefined) {
            message = "";
        }
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