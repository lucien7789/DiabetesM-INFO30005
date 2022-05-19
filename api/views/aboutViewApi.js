const express = require("express");

const routes = express.Router();

routes.get("/diabetes", (req, res) => {
    res.render("/layouts/about/aboutDiabetes.hbs", { title: "About Diabetes", context: 0, authenticated: false, unauthenticated: true});
})

routes.get("/us", (req, res) => {
    res.render("/layouts/about/aboutUs.hbs", { title: "About Us", context: 0, authenticated: false, unauthenticated: true });
})


module.exports = routes;