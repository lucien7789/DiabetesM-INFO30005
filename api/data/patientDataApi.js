const express = require("express");
const PatientController = require("../../controllers/patientController");
const routes = express.Router();

routes.get("/latest", async (req, res) => {
    try {
        let userID = req.session?.passport?.user;
        const latestData = await PatientController.getLatestPatientData(userID);

        if (latestData) {
            res.status(200).json(latestData);
        } else {
            res.status(404).json({ message: "Resource does not exist"});
        }
    } catch (err) {
        res.status(500).json({ message: err.toString() });
    }
})

module.exports = routes;