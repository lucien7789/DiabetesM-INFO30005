const express = require("express");
<<<<<<< HEAD
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../../models/User");
const routes = express.Router();

const SALT_FACTOR = 10;
routes.post("/register", (req, res) => {
    bcrypt.hash(req.body.password, SALT_FACTOR, async (err, hash) => {
        
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            let exists = await User.findOne({ email: req.body.username });
            if (exists) {
                res.status(403).send("An account has already been registered with that email");
            } else {
                new User({ firstName: "John", lastName: "Smith", username: req.body.username, password: hash, accountType: 0 }).save((err) => {
                    if (err) {
                        res.status(403).send(e.toString());
                    } else {
                        res.status(200).send("User successfully registered");
                    }
                });
            }
        }
    })
});
=======
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
>>>>>>> main
routes.post(
    "/login", 
    (req, res, next) => {
        passport.authenticate("login", (err, user, info) => {
            
            if (err) {
<<<<<<< HEAD
                return res.status(400).json({ errors: err });
            }
            if (!user) {
                return res.status(400).json({ errors: "No user found" });
            }
            req.logIn(user, {session: true}, (err) => {
                if (err) {
                    return res.status(400).json({ errors: err });
                } else {
                    return res.status(200).json("User has been logged in");
                }
            })
        })(req, res, next);
});
=======
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
>>>>>>> main
routes.post(
    "/logout",
    (req, res, next) => {
        req.session.destroy(err => {
            res.redirect('/');
        });
    }
)
module.exports = routes;