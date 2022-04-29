const express = require("express");

const routes = express.Router();

routes.get("/dashboard", (req, res) => {
    res.render("clinician/dashboard.hbs", { title: "Clinician Dashboard"});
});

routes.get("/patientRegistration", (req, res) => {
    res.render("clinician/patientRegistration.hbs", { title: "Patient Registration"});
});

module.exports = routes;