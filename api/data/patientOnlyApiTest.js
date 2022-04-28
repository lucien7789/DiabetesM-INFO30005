const express = require("express");
const controller = require("../../controllers/sampleController");
const routes = express.Router();

routes.get("/", (req, res) => {
    res.json({message: "LETS GO IT WORKS"});
})

module.exports = routes;