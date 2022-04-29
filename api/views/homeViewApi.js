const express = require("express");

const routes = express.Router();

routes.get("/", (req, res) => {
    res.render("about/home.hbs", { title: "DiabetesM" });
})

module.exports = routes;