const express = require("express");
const BloodGlucoseController = require("../../controllers/bloodGlucoseController");
const ClinicianController = require("../../controllers/clinicianController");
const UserController = require("../../controllers/userController");
const routes = express.Router();

routes.get("/", async (req, res) => {
    try {
        let userID = req.session?.passport?.user;
        const patients = await ClinicianController.getLatestPatientData(userID);
        if (patients) {
            res.status(200).json(patients);
        } else {
            res.status(204).end();
        }
    } catch (err) {
        res.status(500).json({ message: err.toString() });
    }
});

routes.get("/bloodGlucose/latest/:id", async (req, res) => {
    try {
        let userID = req.query.id;
        const bloodGlucose = await BloodGlucoseController.getLatestBloodGlucoseMeasure(userID);
        if (bloodGlucose) {
            res.status(200).json(bloodGlucose);
        } else {
            res.status(204).end();
        }
    } catch (err) {
        res.status(500).json({ message: err.toString() });
    }
});

routes.get("/bloodGlucose/:id", async (req, res) => {
    try {
        let userID = req.query.id;
        const bloodGlucose = await UserController.getBloodGlucoseByUserId(userID);
        if (bloodGlucose) {
            res.status(200).json(bloodGlucose);
        }
        else {
            res.status(204).end();
        }
    } catch (err) {
        res.status(404).json({ message: err.toString() });
    }
});

routes.get("/patientMeasures/:id", async(req, res) => {
    try {
        let userID = req.query.id;
        const patientMeasures = await UserController.getPatientMeasuresByUserId(userID);

        if (patientMeasures) {
            res.status(200).json(patientMeasures);
        }
        else {
            res.status(204).end();
        }
    } catch (err) {
        res.status(404).json({ message: err.toString() });
    }
})
module.exports = routes;