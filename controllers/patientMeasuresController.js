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
        if (newDoc === undefined) {
            throw new Error("Update document is undefined");
        }
        for (let m of measures) {
            if (newDoc[m] !== undefined) {
                let bot = newDoc[m.concat("SafetyThresholdBottom")];
                let top = newDoc[m.concat("SafetyThresholdTop")];
                if (bot === undefined || isNaN(bot) || parseFloat(bot) < 0) {
                    throw new Error(`${m.concat("SafetyThresholdBottom")} is invalid`);
                }
                if (top === undefined || isNaN(top) || parseFloat(top) < 0) {
                    throw new Error(`${m.concat("SafetyThresholdTop")} is invalid`);
                }
                if (top < bot) {
                    throw new Error(`${m.concat("SafetyThresholdBottom")} is larger than ${m.concat("SafetyThresholdTop")}`);
                }
            }
        }
        const { modifiedCount } = await PatientMeasures.updateOne({ userID: id }, {$set:newDoc});

        return modifiedCount === 1;
    }
}

module.exports = PatientMeasuresController;