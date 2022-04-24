const express = require("express");

const routes = express.Router();

routes.get("/signIn", (req, res) => {
    res.render("about/signIn.hbs", { title: "Sign In"});
})

module.exports = routes;