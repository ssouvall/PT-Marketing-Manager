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
app.use(express.static(__dirname + "/Public"));

const contacts = [];

app.get("/", function(req, res) {
    res.render('dashboard')
});

app.get("/calendar", function(req, res) {
    res.render('calendar')
});

app.get("/contacts", function(req, res) {
        const newContact = contacts.forEach(function(contact) {
                const addContact = {
                fName: contact.firstName,
                lName: contact.lastName,
                company: contact.company,
                contactType: contact.contactType,
                email: contact.email,
                phone: contact.phone,
                address: contact.address,
                address2: contact.address2,
                city: contact.city,
                state: contact.state,
                zip: contact.zip 
                }
                
        })
        res.render('contacts', {
            contacts: contacts,
            newContact: newContact
            }
            
        )

        
});

app.get("/tasks", function(req, res) {
    res.render('tasks')
});

app.get("/contacts/:contactName", function(req, res) {
    let requestedContact = req.params.contactName
    contacts.forEach(function(contact) {
        let storedName = _.lowerCase(contact.lastName)
        
        if(storedName == requestedContact) {
            res.render('contact', {
                title: contact.firstName + " " + contact.lastName,
                company: contact.company,
                contactType: contact.contactType,
                email: contact.email,
                phone: contact.phone,
                address: contact.address,
                address2: contact.address2,
                city: contact.city,
                state: contact.state,
                zip: contact.zip
            });
        }
    });
    
});

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
        phone: req.body.phone,
        address: req.body.address,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    }
    contacts.push(contact);
    res.redirect("/contacts")
});

app.listen(3001, function() {
    console.log("Server started on port 3001");
});