const express = require("express");

const routes = express.Router();

routes.get("/home", (req, res) => {
    res.render("patient/patientHome.hbs", { title: "Home - Patient"});
})

routes.get("/profile", (req, res) => {
    res.render("patient/patientProfile.hbs", { title: "Profile - Patient"});
})

module.exports = routes;