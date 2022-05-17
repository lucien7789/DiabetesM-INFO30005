const express = require("express");
const passport = require("passport");
const UserController = require("../../controllers/userController");
const routes = express.Router();

const SALT_FACTOR = 10;
routes.post(
    "/register", 
    async (req, res) => {
        try {
            let params = [req.body.username, req.body.password, req.body.firstName, req.body.lastName, req.body.accountType];
            if (req.session?.passport?.user) {
                params.push(req.session?.passport.user);
            }
            await UserController.createUser(...params);
            if (req.body.redirect === undefined || req.body.redirect === true) {
                res.status(201).redirect("/auth/register/success");
            } else {
                res.status(201).json({ message: "User has been successfully registered"});
            }
            
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
                return res.status(400).json({ message: "User details are incorrect" });
            }
            req.logIn(user, {session: true}, (err) => {
                if (err) {
                    return res.status(400).json({ message: err });
                } else {
                    if (user.accountType === 0) {
                        return res.status(200).redirect("/patient/home");
                    } else {
                        return res.status(200).redirect("/clinician/dashboard");
                    }
                    
                }
            })
        })(req, res, next);
    }
);
routes.post(
    "/logout",
    (req, res, next) => {
        req.session.destroy(err => {
            res.clearCookie("sid_");
            res.redirect('/');
        });
    }
);

routes.get(
    "/colortheme",
    async (req, res, next) => {
        let id = req.session?.passport?.user;
        if (id === undefined) {
            return res.status(200).json({ mode: "none"});
        }
        let mode = req.query.mode;
        try {
            const user = await UserController.getUserById(id);
            return res.status(200).json({ mode: user.colortheme });
        } catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
        
    }
)
routes.post(
    "/colortheme/:mode",
    async (req, res, next) => {
        let id = req.session?.passport?.user;
        if (!id) {
            return res.status(204).json({ message: "This request had no effect"});
        }
        let mode = req.params.mode;
        try {
            let result = await UserController.updateUser(id, { colortheme: mode });
            if (result) {
                return res.status(200).json({ message: "User color theme has been switched"});
            } else {
                return res.status(500).json({ message: "Failed to update user color theme"});
            }
            
        } catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
        
    }
)
module.exports = routes;