const express = require("express");

const routes = express.Router();

routes.get("/bloodglucose", (req, res) => {
    res.render("patient/data-entry/bloodGlucose.hbs", { title: "Recording Health Data"});
});

module.exports = routes;