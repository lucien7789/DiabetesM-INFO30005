const express = require("express");
const PatientMeasuresController = require("../../controllers/patientMeasuresController");
const UserController = require("../../controllers/userController");
const routes = express.Router();

const measures = require("../../serverConfig").measures;

routes.get("/dashboard", (req, res) => {
    res.render("layouts/clinician/dashboard.hbs", { title: "Clinician Dashboard", authenticated: true, clinician: true});
});

routes.get("/patientRegistration", (req, res) => {
    res.render("layouts/clinician/patientRegistration.hbs", { title: "Patient Registration", authenticated: true, clinician: true });
});

routes.get("/patient/:id", async (req, res) => {
    let patient = await UserController.getUserById(req.params.id);
    let patientMeasures = await PatientMeasuresController.getAllPatientMeasures(req.params.id);
    
    res.render("layouts/clinician/patientPage.hbs", { title: patient.firstName + " " + patient.lastName, 
        authenticated: true, clinician: true, id: patient._id, measures: Object.entries(measures).map(m => {
            return {
                ...m[1], 
                endpoint: `${m[1].endpoint}/${patient._id}`
            }
        })
    });

});

routes.get("/about/us", (req, res) => {
    res.render("layouts/about/aboutUs.hbs", { title: "About Us", context: 2, authenticated: true, clinician: true});
})

routes.get("/about/diabetes", (req, res) => {
    res.render("layouts/about/aboutDiabetes.hbs", { title: "About Us", context: 2, authenticated: true, clinician: true});
})

routes.get("/settings", (req, res) => {
    res.render("layouts/settings.hbs", { title: "Account Settings", context: 0, authenticated: true, clinician: true});
})
module.exports = routes;