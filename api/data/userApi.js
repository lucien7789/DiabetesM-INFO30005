const express = require("express");
const passport = require("passport");
const UserController = require("../../controllers/userController");
const routes = express.Router();

const SALT_FACTOR = 10;
routes.post(
    "/register", 
    async (req, res) => {
        try {
            await UserController.createUser(req.body.username, req.body.password, req.body.firstName, req.body.lastName);
            res.status(201).redirect("/auth/register/success");
        } catch (err) {
            res.status(500).json({message: err.toString()});
        }
    }
);
routes.post(
    "/login", 
    (req, res, next) => {
        passport.authenticate("login", (err, user, info) => {
            
            if (err) {
                return res.status(400).json({ message: err });
            }
            if (!user) {
                return res.status(400).json({ message: "No user found" });
            }
            req.logIn(user, {session: true}, (err) => {
                if (err) {
                    return res.status(400).json({ message: err });
                } else {
                    return res.status(200).redirect("/patient");
                }
            })
        })(req, res, next);
    }
);
routes.post(
    "/logout",
    (req, res, next) => {
        req.session.destroy(err => {
            res.redirect('/');
        });
    }
)
module.exports = routes;