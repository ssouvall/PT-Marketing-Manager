const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const M = require("minimatch");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render('dashboard')
});

app.get("/calendar", function(req, res) {
    res.render('calendar')
});

app.get("/contacts", function(req, res) {
    res.render('contacts')
});

app.get("/tasks", function(req, res) {
    res.render('tasks')
});

app.listen(3001, function() {
    console.log("Server started on port 3001");
});