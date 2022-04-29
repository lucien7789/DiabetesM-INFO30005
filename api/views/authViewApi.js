const express = require("express");
const UserController = require("../../controllers/userController");

const routes = express.Router();

routes.get("/login", async (req, res) => {
    let userID = req.session?.passport?.user;
    if (userID) {
        let user = await UserController.getUserById(userID);
        if (!user) {
            res.render("auth/login.hbs", { title: "Sign In"});
        }
        if (user.accountType === 0) {
            res.redirect("/patient/home");
            res.end();
        } else if (user.accountType === 1) {
            res.redirect("/clinician/dashboard");
            res.end();
        }
    } else {
        res.render("auth/login.hbs", { title: "Sign In"});
    }
    
});

routes.get("/register", (req, res) => {
    res.render("auth/register.hbs", { title: "Registration"});
});

routes.get("/register/success", (req, res) => {
    res.render("auth/registerSuccess.hbs", { title: "Registration"})
})

module.exports = routes;