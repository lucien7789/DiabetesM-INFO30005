const express = require("express");

const routes = express.Router();

const measures = require("../../serverConfig").measures;

routes.get("/home", (req, res) => {
    res.render("patient/patientHome.hbs", { title: "Home", authenticated: true });
})

routes.get("/profile", (req, res) => {
    res.render("patient/patientProfile.hbs", { title: "Profile", authenticated: true });
})


routes.get("/data", (req, res) => {
    res.render("patient/patientViewData.hbs", { title: "View Data" , authenticated: true, measures});
})

module.exports = routes;