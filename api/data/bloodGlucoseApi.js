const express = require("express")
const router = express.Router()
const controller = require("../../controllers/bloodGlucoseController")

router.post("/", async (req, res) => {
    if (!await controller.createBloodGlucose(req.body.level, req.body.userID)) {
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

router.get("/:id", async (req, res) => {
    const bloodGlucose = await controller.getBloodGlucoseById(req.params.id);
    if (bloodGlucose) {
        res.status(200);
        res.json(bloodGlucose);
    }
    else {
        res.status(404);
        res.write("Resource not found");
        res.end();
    }
});

router.get("/user/:userID", async (req, res) => {
    const bloodGlucoses = await controller.getBloodGlucoseByUserID(req.params.userID);
    if (bloodGlucoses) {
        res.status(200);
        res.json(bloodGlucoses);
    }
    else {
        res.status(404);
        res.write("Resource not found");
        res.end();
    }
});

router.delete("/:id", async (req, res) => {
    if (await controller.deleteBloodGlucoseById(req.params.id)) {
        res.status(200);
        res.write("Resource has been deleted");
        res.end();
    }
    else {
        res.status(404);
        res.write("Resource not found");
        res.end();
    }
});

router.patch("/:id", async (req, res) => {
    if (await controller.updateBloodGlucose(req.params.id, req.body)) {
        res.status(200);
        res.write("Resource has been updated");
        res.end();
    }
    else {
        res.status(404);
        res.write("Resource not found");
        res.end();
    }
});


module.exports = router