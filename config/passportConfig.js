const passport = require("passport");
const passportLocal = require("passport-local");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
passport.use(
    'login',
    new passportLocal.Strategy(
        {
        usernameField: 'username',
        passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const user = await User.findOne({ username });
        
                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }
        
                const validate = await bcrypt.compare(password, user.password);
        
                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }
        
                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);
passport.serializeUser((user, done) => {
    return done(null, user.id);
})
passport.deserializeUser((id, done) => {
    return User.findOne({ id: id }, (error, user) => {
        if (error) {
            done(new Error("Invalid User"), null);
        } else {
            done(null, user);
        }
    })
})

module.exports = passport;