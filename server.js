const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const port = process.env.PORT || 3000;
const exphbs = require("express-handlebars")
console.log(
    " ______   ___   _______  _______  _______  _______  _______  _______  __   __ \
    |      | |   | |   _   ||  _    ||       ||       ||       ||       ||  |_|  |\
    |  _    ||   | |  |_|  || |_|   ||    ___||_     _||    ___||  _____||       |\
    | | |   ||   | |       ||       ||   |___   |   |  |   |___ | |_____ |       |\
    | |_|   ||   | |       ||  _   | |    ___|  |   |  |    ___||_____  ||       |\
    |       ||   | |   _   || |_|   ||   |___   |   |  |   |___  _____| || ||_|| |\
    |______| |___| |__| |__||_______||_______|  |___|  |_______||_______||_|   |_|\n")

const app = express();

console.log(config.projectDir);
app.engine("hbs", exphbs.engine({
    defaultLayout: "about/main",
    layoutsDir: config.projectDir + "/views",
    partialsDir: config.projectDir + "/views",
    extname: "hbs"
}));
app.use(express.static(config.projectDir + "/public"));

app.set("view engine", "hbs");
/**
 * Set up routing for api endpoints
 */

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



app.listen(port, () => {
    console.log("Server.js - Express application has started listening for request on port 3000")
})