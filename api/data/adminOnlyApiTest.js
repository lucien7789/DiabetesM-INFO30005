const express = require("express");
const controller = require("../../controllers/sampleController");
const routes = express.Router();

routes.get("/", (req, res) => {
    res.json({message: "ADMIN: LETS GO IT WORKS WOO"});
})

module.exports = routes;