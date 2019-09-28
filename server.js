//dependencies
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");

//initialize Express app
var express = require("express");
var app = express();

app.use(logger("dev"));
app.use(
    bodyparser.urlencoded({
        extended: false
    })
);



//Require set up handlebars
var exphbs = require("express-handlebars");
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");


const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost/scraper_news";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("Connected to Mongoose!");
});

var routes = require("./controller/controller.js");
console.log(routes);
app.use(routes);

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on PORT" + port);
});