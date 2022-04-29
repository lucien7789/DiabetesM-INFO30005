const express = require("express");
const expressSession = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const config = require("./serverConfig");
const port = process.env.PORT || 8080;
const exphbs = require("express-handlebars");
const passport = require("./config/passportConfig");``
const { MongoClient, ServerApiVersion } = require('mongodb');

const cleanup = () => {
    mongoose.disconnect();
    process.exit(1);
};

// process.on("SIGKILL", cleanup);
// process.on("SIGINT", cleanup);
// process.on("SIGTERM", cleanup);

console.log(
    "     ______   ___   _______  _______  _______  _______  _______  _______  __   __ \n\
    |      | |   | |   _   ||  _    ||       ||       ||       ||       ||  |_|  |\n\
    |  _    ||   | |  |_|  || |_|   ||    ___||_     _||    ___||  _____||       |\n\
    | | |   ||   | |       ||       ||   |___   |   |  |   |___ | |_____ |       |\n\
    | |_|   ||   | |       ||  _   | |    ___|  |   |  |    ___||_____  ||       |\n\
    |       ||   | |   _   || |_|   ||   |___   |   |  |   |___  _____| || ||_|| |\n\
    |______| |___| |__| |__||_______||_______|  |___|  |_______||_______||_|   |_|\n")



const app = express();

/**
 * ===========================================================
 * Mongoose Setup
 * ===========================================================
 */
const uri = "mongodb+srv://admin:bIRICG67hDmA2oOH@cluster0.geibs.mongodb.net/Cluster0?retryWrites=true&w=majority";

const mongooseClient = mongoose.connect(uri).then(m => m.connection.getClient());

/**
 * ===========================================================
 * Handle Bars Config Setup
 * ===========================================================
 */
app.engine("hbs", exphbs.engine({
    defaultLayout: "about/main",
    layoutsDir: config.projectDir + "/views",
    partialsDir: config.projectDir + "/views",
    extname: "hbs"
}));

app.use(
    expressSession({
        secret: process.env.SESSION_SECRET || "INFO30005",
        name: "sid_",
        saveUninitialized: false,
        resave: false,
        cookie: {
            sameSite: "strict",
            httpOnly: true,
            secure: app.get("env") === "production",
            domain: ".info30005-diabetesm.herokuapp.com"
        },
        store: MongoStore.create({ clientPromise: mongooseClient})
    })
)
app.use(passport.authenticate("session"));

app.use(express.static(config.projectDir + "/public"));

app.set("view engine", "hbs");
/**
 * ===========================================================
 * Endpoints and Routing Setup
 * ===========================================================
 */

app.use(bodyParser.json());
app.use(cookieParser());

const middleware = {};

for (let mw of config.authMiddleware) {
    middleware[mw.level] = require(config.projectDir + "/" + mw.path);
}
for (let endpoint of config.apiModules.dataApi) {
    const routes = require(config.projectDir + "/" + endpoint.path);
    if (endpoint.authenticationLevel !== undefined) {
        app.use(endpoint.prefix, middleware[endpoint.authenticationLevel], routes);
    } else {
        app.use(endpoint.prefix, routes);
    }
    console.log(`Server.js - Data API Endpoint for ${endpoint.path} set up at ${endpoint.prefix}`);
}

for (let endpoint of config.apiModules.viewApi) {
    const routes = require(config.projectDir + "/" + endpoint.path);
    if (endpoint.authenticationLevel !== undefined) {
        app.use(endpoint.prefix, middleware[endpoint.authenticationLevel], routes);
    } else {
        app.use(endpoint.prefix, routes);
    }
    app.use(endpoint.prefix, routes);
    console.log(`Server.js - View API Endpoint for ${endpoint.path} set up at ${endpoint.prefix}`);
}

app.use(function(req,res){
    res.status(404).render("error/404.hbs")
});

/**
 * ===========================================================
 * Finish
 * ===========================================================
 */
app.listen(port, () => {
    console.log("Server.js - Express application has started listening for request on port 3000")
})