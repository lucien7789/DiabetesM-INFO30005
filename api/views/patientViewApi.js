const express = require("express");

const routes = express.Router();

routes.get("/home", (req, res) => {
    res.render("patient/patientHome.hbs", { title: "Home" });
})

routes.get("/profile", (req, res) => {
    res.render("patient/patientProfile.hbs", { title: "Profile"});
})


routes.get("/data", (req, res) => {
    res.render("patient/patientViewData.hbs", { title: "View Data" , measures: [{ name: "Blood Glucose", endpoint: "/data-entry/blood-glucose", unit: "nmol/L"}]});
})

module.exports = routes;