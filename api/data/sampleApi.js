// Use this as a reference!

const express = require("express");

const routes = express.Router();

routes.get("/test", (req, res) => {
    res.write("Hello World");
    res.end();
});

routes.get("/json", (req, res) => {
    res.json({
        "name": "Kevin",
        "occupation": "Gao"
    })
});

routes.get("/givemeanerror", (req, res) => {
    res.status(403);
    res.write(":(");
    res.end();
});

routes.post("/post", (req, res) => {
    console.log("Received POST request with: " + req.body);
    res.status(201);
    res.end();
});

routes.get("/params", (req, res) => {
    // Use this to access query param
    console.log(req.query);
});

module.exports = routes;