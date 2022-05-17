const express = require("express");
const UserController = require("../../controllers/userController");

const routes = express.Router();

const measures = require("../../serverConfig").measures;

routes.get("/home", (req, res) => {
    res.render("patient/patientHome.hbs", { title: "Home", authenticated: true });
})

routes.get("/profile", (req, res) => {
    res.render("patient/patientProfile.hbs", { title: "Profile", authenticated: true });
})


routes.get("/data", async (req, res) => {
    let patientMeasures = await UserController.getPatientMeasuresByUserId(req.session?.passport?.user);
    let measuresProjection = {};
    for (let m of Object.keys(measures)) {
        if (patientMeasures[m]) {
            measuresProjection[m] = measures[m];
        }
    }
    res.render("patient/patientViewData.hbs", { title: "View Data" , authenticated: true, measures: measuresProjection});
})

routes.get("/leaderboard", (req, res) => {
    res.render("patient/patientLeaderboard.hbs", { title: "Leaderboard", authenticated: true });
}) 

module.exports = routes;