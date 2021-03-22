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

const contacts = [];

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

app.get("/eheiden", function(req, res) {
    res.render('eheiden')
})

app.get("/encounter", function(req, res) {
    res.render('encounter')
});

app.get("/encounters", function(req, res) {
    res.render('encounters')
});

app.get("/new-encounter", function(req, res) {
    res.render('new-encounter')
})

app.get("/new-contact", function(req, res) {
    res.render('new-contact')
})

app.get("/task", function(req, res) {
    res.render('task')
})

app.get("/new-task", function(req, res) {
    res.render('new-task')
})

app.post("/new-contact", function(req, res) {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        company: req.body.company,
        contactType: req.body.type,
        email: req.body.email,
        address: req.body.address,
        address2: req.body.address2,
        country: req.body.country,
        state: req.body.state,
        zip: req.body.zip
    }
    contacts.push(contact);
    res.redirect("/contacts")
    console.log(contacts)
});

app.listen(3001, function() {
    console.log("Server started on port 3001");
});