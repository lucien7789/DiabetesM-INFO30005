const express = require("express")
const router = express.Router()
const controller = require("../../controllers/exerciseController");
const EngagementController = require("../../controllers/engagementController");

router.post("/", async (req, res) => {
    try {
        let userID = req.session?.passport?.user;
        const exercise = await controller.createExercise(userID, req.body.value, req.body.comment);
        await EngagementController.createEngagement(userID);
        if (exercise) {
            res.status(201).json(exercise);
        } else {
            res.status(500).json({ message: "Failed to create resource"});
        }
    } catch (err) {
        res.status(500).json({ message: err.toString() });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const exercise = await controller.getExerciseByUserId(req.params.id);
        if (exercise) {
            res.status(200).json(exercise);
        }
        else {
            res.status(404).json({ message: "Resource could not be found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.toString() });
    }
});

router.get("/", async (req, res) => {
    try {
        let userID = req.session?.passport?.user;
        const exercise = await controller.getExerciseByUserId(userID);
        if (exercise) {
            res.status(200).json(exercise);
        }
        else {
            res.status(404).json({ message: "No resource could be found for the given user id" });
        }
    } catch (err) {
        res.status(404).json({ message: err.toString() });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await controller.deleteExerciseById(req.params.id);
        if (deleted) {
            res.status(200).json({ message: "Resource has been deleted"});
        } else {
            res.status(404).json({ message: "Resource could not be found"});
        }
    } catch (err) {
        res.status(500).json({ message: err.toString() });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const updated = await controller.updateExerciseById(req.params.id, req.body);
        if (updated) {
            res.status(200).json({ message: "Resource has been updated"});
        } else {
            res.status(404).json({ message: "Resource could not be found"});
        }
    } catch (err) {
        res.status(500).json({ message: err.toString() });
    }
});


module.exports = router