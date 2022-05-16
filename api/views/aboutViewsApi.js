const express = require("express");

const routes = express.Router();

routes.get("/diabetes", (req, res) => {
    res.render("about/aboutDiabetes.hbs", { title: "About Diabetes", authenticated: false});
})

routes.get("/us", (req, res) => {
    res.render("about/aboutUs.hbs", { title: "About Us", authenticated: false});
})

module.exports = routes;