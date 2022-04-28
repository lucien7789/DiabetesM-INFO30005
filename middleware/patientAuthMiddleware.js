const User = require("../models/user");


const USER_TYPE = 0; // Hard-coded, need to set this in env
const patientAuthMiddleware = async (req, res, next) => {
    const session = req.session;
    if (session?.passport?.user) {
        let user = await User.findById(session.passport.user);
        if (!user) {
            return res.redirect("/auth/login");
        }
        if (user.accountType !== USER_TYPE) {
            return res.redirect("/auth/login");
        }
        next();
    } else {
        return res.redirect("/auth/login");
    }
}

module.exports = patientAuthMiddleware;