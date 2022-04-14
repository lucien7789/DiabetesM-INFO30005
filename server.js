const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const port = process.env.PORT || 3000;
const exphbs = require("express-handlebars");
const { MongoClient, ServerApiVersion } = require('mongodb');

const cleanup = () => {
    mongoose.disconnect();
    process.exit(1);
};

process.on("SIGKILL", cleanup);
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

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
const uri = "mongodb+srv://admin:b4V1vX4HQQPXPQDm@cluster0.geibs.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose.connect(uri);

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

app.use(express.static(config.projectDir + "/public"));

app.set("view engine", "hbs");
/**
 * ===========================================================
 * Endpoints and Routing Setup
 * ===========================================================
 */
 const bodyParser = require('body-parser');

app.use(bodyParser.json());
for (let endpoint of config.apiModules.dataApi) {
    const routes = require(config.projectDir + "/" + endpoint.path);
    app.use(endpoint.prefix, routes);
    console.log(`Server.js - Data API Endpoint for ${endpoint.path} set up at ${endpoint.prefix}`);
}

for (let endpoint of config.apiModules.viewApi) {
    const routes = require(config.projectDir + "/" + endpoint.path);
    app.use(endpoint.prefix, routes);
    console.log(`Server.js - View API Endpoint for ${endpoint.path} set up at ${endpoint.prefix}`);
}

/**
 * ===========================================================
 * Finish
 * ===========================================================
 */
app.listen(port, () => {
    console.log("Server.js - Express application has started listening for request on port 3000")
})