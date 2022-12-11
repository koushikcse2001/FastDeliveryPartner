
const { validationResult } = require('express-validator');
const ContactModel = require('../../models/contact');
const fs = require("fs");

module.exports = {

    index: (req, res, next) => {
        ContactModel.find((err, docs) => {
            if (err) {
                return res.json({ error: "Something went wrong!" + err })
            }
            const contact = [];
            docs.forEach(element => {
                contact.push({
                    icon: element.icon,
                    address: element.address,
                    details: element.details,
                    id: element._id
                });
            });
            // return res.json({ Team: docs });
            res.render('backend/contact/index.hbs', { title: 'Contact', layout: 'backend/layout', contact: contact });
        });
    },
    create: (req, res, next) => {
        res.render('backend/contact/create.hbs', { title: 'Create', layout: 'backend/layout' });
    },
    edit: (req, res, next) => {
        ContactModel.findById(req.params.id)
        .then((contact) => {
            const details = {
                icon: contact.icon,
                address: contact.address,
                details: contact.details,
                id: contact._id
            }
            res.render('backend/contact/edit.hbs', { title: 'Edit', layout: 'backend/layout', contact: details });
            // res.json({ "blog": blog });
        });
    },
    delete: (req, res, next) => {
        ContactModel.findByIdAndRemove(req.params.id, (err, team) => {

            if (err) {
                console.log("Could not deleted!!");
            }
            try {
                fs.unlink("public/" + contact.icon, () => {
                    console.log("File Deleted!!!!");
                });

            } catch (error) {
                console.log("Something went wrong========");
            }

            res.redirect("/admin/contact")
        });
    },
    show: (req, res, next) => {
        ContactModel.findById(req.params.id)
        .then((contact) => {

            const details = {
                icon: contact.icon,
                address: contact.address,
                details: contact.details,
                id: contact._id
            }
            res.render('backend/contact/show.hbs', { title: 'Show', layout: 'backend/layout', contact: details });
            // res.json({ "blog": blog });
        })
        .catch((err) => {
            res.json({ "error": "Somethiong went wrong!" });
        });       
    },
    store: (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('/admin/contact/create',{layout: 'backend/layout',errors:errors.mapped()});
        }
        let sampleFile;
        if (!req.files || Object.keys(req.files).length === 0) {
            res.redirect('/admin/contact/create');
        }
         // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
         sampleFile = req.files.icon;
         let rnd = new Date().valueOf();
         let filePath = 'upload/' + rnd + sampleFile.name;
         sampleFile.mv('public/' + filePath, function (err) {
            if (err) {
                res.redirect('/admin/contact/create');
            }
        });
        const contact = new ContactModel({
            icon: filePath,
            address: req.body.address,
            details: req.body.details
       
        });

        contact.save((err, newTestimonial) => {
            if (err) {
                res.redirect('/admin/contact/create');
            }
            res.redirect('/admin/contact');
        });

    },
    update: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
             res.json({ errors: errors.mapped() });
        }
        let sampleFile, filePath;
        if (req.files) {
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            sampleFile = req.files.icon;          
            let rnd = new Date().valueOf();        
            filePath = 'upload/' + rnd + sampleFile.name;
            // Use the mv() method to place the file somewhere on your server
            sampleFile.mv('public/' + filePath, function (err) {
                if (err)
                    res.redirect("/admin/contact/"+req.params.id+"/edit");
            });
        }
        const contactObj = {
            address: req.body.address,
            details: req.body.details
        };
        if (filePath) {
            contactObj.icon = filePath;
        }
        ContactModel.findByIdAndUpdate(req.params.id, contactObj, (err, blog) => {
            if (err) {
                res.redirect("/admin/contact/" + req.params.id + "/edit");
            }
            res.redirect("/admin/contact");
        });
    }
}