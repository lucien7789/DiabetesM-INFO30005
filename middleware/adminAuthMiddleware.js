const User = require("../models/user");


const ADMIN_TYPE = 1; // Hard-coded, need to set this in env
const adminAuthMiddleware = (req, res, next) => {
    const session = req.session;
    if (session?.passport?.user) {
        let user = User.findById(session.passport.user);
        if (!user) {
            return res.redirect("/auth/login");
        }
        if (user.accountType !== ADMIN_TYPE) {
            return res.redirect("/auth/login");
        }
        next();
    } else {
        return res.redirect("/auth/login");
    }
}

module.exports = adminAuthMiddleware;