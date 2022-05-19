const express = require("express");

const routes = express.Router();

routes.get("/", (req, res) => {
    res.render("layouts/about/home.hbs", { title: "DiabetesM" , unauthenticated: true });
})

module.exports = routes;