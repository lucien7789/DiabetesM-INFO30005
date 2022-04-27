const express = require("express");

const routes = express.Router();

routes.get("/home", (req, res) => {
    res.render("patient/patientHome.hbs", { title: "Home - Patient"});
})

routes.get("/ViewData", (req, res) => {
    res.render("patient/patientViewData.hbs", { title: "View Data - Patient"});
})

module.exports = routes;