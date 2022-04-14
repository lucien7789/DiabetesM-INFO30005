// Use this as a reference!

const express = require("express");
const controller = require("../../controllers/sampleController");
const routes = express.Router();

/**
 * ===================================================================
 * REST API examples
 */
routes.post("/", async (req, res) => {
    if (!controller.createSampleData(req.body.name)) {
        res.status(500);
        res.write("Failed to create resource");
        res.end();
    } else {
        res.status(201);
        res.write("Resource has been created");
        res.end();
    }
});

routes.get("/:id", async (req, res) => {
    const obj = await controller.getSampleDataById(req.params.id);

    if (!obj) {
        res.status(404) // Not found
        res.end();
    } else {
        res.status(200);
        res.json(obj);
    }
});

routes.delete("/:id", (req, res) => {
    if (!controller.deleteSampleDataById(req.params.id)) {
        res.status(404) // Not found
    } else {
        res.status(200);
        res.end();
    }
});

routes.put("/:id", (req, res) => {
    // In case id is contained, we don't want to update the id
    delete req.body.id;
    
    if (!controller.updateSampleData(req.params.id, req.body)) {
        res.status(404)
        res.end();
    } else {
        res.status(200);
        res.end();
    }
});
/**
 * ===================================================================
 * Random examples
 */
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