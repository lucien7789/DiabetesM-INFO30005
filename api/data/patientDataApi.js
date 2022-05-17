const express = require("express");
const EngagementController = require("../../controllers/engagementController");
const PatientController = require("../../controllers/patientController");
const UserController = require("../../controllers/userController");
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

routes.get("/message", async (req, res) => {
    try {
        let userID = req.session?.passport?.user;
        const message = await PatientController.getPatientMessage(userID);

        res.status(200).json({ message: message || ""});
    } catch (err) {
        res.status(500).json({ message: err.toString() });
    }
})

routes.get("/engagement", async (req, res) => {
    try {
        let id = req.session?.passport?.user;

        const user = await UserController.getUserById(id);
        if (!user?.registrationDate) {
            return res.status(200).json({ engagement: 0 });
        }
        const engagement = await EngagementController.getEngagement(id);
        return res.status(200).json({ engagement: engagement || 0});
    } catch (err) {
        return res.status(500).json({ message: err.toString() });
    }
})

routes.get("/engagement/top", async (req, res) => {
    try {
        let top = await EngagementController.getTopEngagements();

        res.status(200).json(top);
    } catch (err) {
        res.status(500).json({message: err.toString()});
    }
})
module.exports = routes;