const express = require("express");
const UserController = require("../../controllers/userController");

const routes = express.Router();

const measures = require("../../serverConfig").measures;

routes.get("/home", (req, res) => {
    res.render("layouts/patient/patientHome.hbs", { title: "Home", authenticated: true, patient: true });
})

routes.get("/profile", (req, res) => {
    res.render("layouts/patient/patientProfile.hbs", { title: "Profile", authenticated: true, patient: true });
})


routes.get("/data", async (req, res) => {
    let patientMeasures = await UserController.getPatientMeasuresByUserId(req.session?.passport?.user);
    let measuresProjection = {};
    for (let m of Object.keys(measures)) {
        if (patientMeasures[m]) {
            measuresProjection[m] = measures[m];
        }
    }
    res.render("layouts/patient/patientViewData.hbs", { title: "View Data" , authenticated: true, patient: true, measures: measuresProjection});
})

routes.get("/leaderboard", (req, res) => {
    res.render("layouts/patient/patientLeaderboard.hbs", { title: "Leaderboard", authenticated: true, patient: true });
}) 

routes.get("/about/us", (req, res) => {
    res.render("layouts/about/aboutUs.hbs", { title: "About Us", context: 1, authenticated: true, patient: true});
})

routes.get("/about/diabetes", (req, res) => {
    res.render("layouts/about/aboutDiabetes.hbs", { title: "About Us", context: 1, authenticated: true, patient: true});
})

routes.get("/settings", (req, res) => {
    res.render("layouts/settings.hbs", { title: "Account Settings", context: 0, authenticated: true, patient: true});
})

module.exports = routes;