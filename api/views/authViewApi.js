const express = require("express");

const routes = express.Router();

routes.get("/login", (req, res) => {
    res.render("auth/login.hbs", { title: "Sign In"});
});

routes.get("/register", (req, res) => {
    res.render("auth/register.hbs", { title: "Registration"});
});

routes.get("/register/success", (req, res) => {
    res.render("auth/registerSuccess.hbs", { title: "Registration"})
})

module.exports = routes;