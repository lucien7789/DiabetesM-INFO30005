const express = require("express");

const routes = express.Router();

routes.get("/home", (req, res) => {
    res.render("patient/patientHome.hbs", { title: "Home - Patient"});
})

module.exports = routes;