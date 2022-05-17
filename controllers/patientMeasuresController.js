const PatientMeasures = require("../models/patientMeasures");
const findObjectTemplateFunction = require("../util/findObjectTemplateFunction");

const measures = ["bloodGlucose", "insulin", "weight", "exercise"];

const PatientMeasuresController = {
    getAssignedPatientMeasures: async (id) => {
        let patientMeasures = await this.getAllPatientMeasures(id);
        let res = {};
        for (let m of measures) {
            if (patientMeasures[m]) {
                res[m] = true;
                for (let key of Object.keys(patientMeasures)) {
                    if (key.includes(m)) {
                        res[key] = patientMeasures[key];
                    }
                }
            }
        }
        return res;
    },
    getAllPatientMeasures: (id) => {
        let finder = () => {
            return PatientMeasures.findOne({ userID: id });
        }
        return findObjectTemplateFunction(finder, "getAssignedPatientMeasures()");
    },

    updatePatientMeasuresByUserId: async (id, newDoc) => {
        const { acknowledged } = await PatientMeasures.updateOne({ userID: id }, {$set:newDoc});

        return acknowledged;
    }
}

module.exports = PatientMeasuresController;