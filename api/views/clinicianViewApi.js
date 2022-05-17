const express = require("express");
const PatientMeasuresController = require("../../controllers/patientMeasuresController");
const UserController = require("../../controllers/userController");
const routes = express.Router();

const measures = require("../../serverConfig").measures;

routes.get("/dashboard", (req, res) => {
    res.render("clinician/dashboard.hbs", { title: "Clinician Dashboard", authenticated: true});
});

routes.get("/patientRegistration", (req, res) => {
    res.render("clinician/patientRegistration.hbs", { title: "Patient Registration", authenticated: true });
});

routes.get("/patient/:id", async (req, res) => {
    let patient = await UserController.getUserById(req.params.id);
    let patientMeasures = await PatientMeasuresController.getAllPatientMeasures(req.params.id);
    
    res.render("clinician/patientPage.hbs", { title: patient.firstName + " " + patient.lastName, 
        authenticated: true, id: patient._id, measures: Object.entries(measures).map(m => {
            return {
                ...m[1], 
                endpoint: `${m[1].endpoint}/${patient._id}`
            }
        })
    });

});
module.exports = routes;