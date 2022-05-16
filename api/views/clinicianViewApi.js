const express = require("express");

const routes = express.Router();

routes.get("/dashboard", (req, res) => {
    res.render("clinician/dashboard.hbs", { title: "Clinician Dashboard", authenticated: true});
});

routes.get("/patientRegistration", (req, res) => {
    res.render("clinician/patientRegistration.hbs", { title: "Patient Registration", authenticated: true });
});

module.exports = routes;