const express = require("express");
const UserController = require("../../controllers/userController");

const routes = express.Router();

routes.get("/login", async (req, res) => {
    let userID = req.session?.passport?.user;
    if (userID) {
        let user = await UserController.getUserById(userID);
        if (!user) {
            return res.render("auth/login.hbs", { title: "Sign In", authenticated: false, unauthenticated: true});
        }
        if (user.accountType === 0) {
            res.redirect("/patient/home");
            res.end();
        } else if (user.accountType === 1) {
            res.redirect("/clinician/dashboard");
            res.end();
        }
    } else {
        res.render("layouts/auth/login.hbs", { title: "Sign In", authenticated: false, unauthenticated: true});
    }
    
});

routes.get("/register", (req, res) => {
    res.render("layouts/auth/register.hbs", { title: "Registration", authenticated: false, unauthenticated: true});
});

routes.get("/register/success", (req, res) => {
    res.render("layouts/auth/registerSuccess.hbs", { title: "Registration", authenticated: false, unauthenticated: true})
})

module.exports = routes;