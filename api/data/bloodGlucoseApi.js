const express = require("express")
const router = express.Router()
const controller = require("../../controllers/bloodGlucoseController")

router.post("/", async (req, res) => {
    if (!controller.createBloodGlucose(req.body.level, req.body.userID)) {
        res.status(500);
        res.write("Failed to create resource");
        res.end();
    }
    else {
        res.status(201);
        res.write("Resource has been created");
        res.end();
    }
});

module.exports = router