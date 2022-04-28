const express = require("express");

const routes = express.Router();

routes.get("/dashboard", (req, res) => {
    res.render("clinician/dashboard.hbs", { title: "Clinician Dashboard"});
})

module.exports = routes;