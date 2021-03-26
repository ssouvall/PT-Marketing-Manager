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
const tasks = [];
const encounters = [];

app.get("/", function(req, res) {
    res.render('dashboard')
});

app.get("/calendar", function(req, res) {
    res.render('calendar')
});

app.get("/contacts", function(req, res) {
        res.render('contacts', {
            contacts: contacts
            }
            
        )

        
});

app.get("/tasks", function(req, res) {
    res.render('tasks', {
        tasks: tasks
    })
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
    res.render('encounters', {
        encounters: encounters
    });
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

app.post("/new-task", function(req, res) {
    let taskNum = 0
    const task = {
        dueDate: req.body.due,
        refSource: req.body.name,
        description: req.body.description
    }

    tasks.push(task);
    res.redirect("/tasks")
    console.log(task)
});

app.post("/new-encounter", function(req, res) {
    let encounter = {
        date: req.body.date,
        refSource: req.body.source,
        type: req.body.type,
        notes: req.body.notes,
        next: req.body.next,
        fuDate: req.body.fudate
    }

    encounters.push(encounter);
    res.redirect("/encounters");
    console.log(encounter)

});

app.get("/tasks/:taskid", function(req, res) {
    let requestedTask = req.params.taskid
    tasks.forEach(function(task) {
        let storedTask = task.dueDate

        if(storedTask == requestedTask) {
            res.render('task', {
                date: task.dueDate,
                refSource: task.refSource,
                description: task.description
            })
        }
    })
})

app.get("/encounters/:encounterid", function(req, res) {
    let requestedEncounter = req.params.encounterid
    encounters.forEach(function(encounter) {
        let storedEncounter = encounter.date

        if(storedEncounter == requestedEncounter) {
            res.render('encounter', {
                date: encounter.date,
                refSource: encounter.refSource,
                type: encounter.type,
                notes: encounter.notes,
                fuDate: encounter.fuDate,
                next: encounter.next
            });
        }
    });
});

app.listen(3001, function() {
    console.log("Server started on port 3001");
});