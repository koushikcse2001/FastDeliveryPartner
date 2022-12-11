const { validationResult } = require('express-validator');
const ServicesModel = require('../../models/services');
const fs = require("fs");

module.exports = {

    index: (req, res, next) => {
        ServicesModel.find((err, docs) => {
            if (err) {
                return res.json({ error: "Something went wrong!" + err })
            }
            const services = [];
            docs.forEach(element => {
                services.push({
                    image: element.image,
                    title: element.title,
                    details: element.details,
                    link: element.link,
                    id: element._id
                });
            });
            // return res.json({ Team: docs });
            res.render('backend/services/index.hbs', { title: 'Services', layout: 'backend/layout', services: services });
        });
    },
    create: (req, res, next) => {
        res.render('backend/services/create.hbs', { title: 'Create', layout: 'backend/layout' });
    },
    edit: (req, res, next) => {
        ServicesModel.findById(req.params.id)
            .then((services) => {
                const details = {
                    image: services.image,
                    title: services.title,
                    details: services.details,
                    link: services.link,
                    id: services._id
                }
                res.render('backend/services/edit.hbs', { title: 'Edit', layout: 'backend/layout', services: details });
                // res.json({ "blog": blog });
            });
    },
    delete: (req, res, next) => {
        ServicesModel.findByIdAndRemove(req.params.id, (err, team) => {

            if (err) {
                console.log("Could not deleted!!");
            }
            try {
                fs.unlink("public/" + services.image, () => {
                    console.log("File Deleted!!!!");
                });

            } catch (error) {
                console.log("Something went wrong========");
            }

            res.redirect("/admin/services")
        });
    },
    show: (req, res, next) => {
        ServicesModel.findById(req.params.id)
            .then((services) => {

                const details = {
                    image: services.image,
                    title: services.title,
                    details: services.details,
                    link: services.link,
                    id: services._id
                }
                res.render('backend/services/show.hbs', { title: 'Show', layout: 'backend/layout', services: details });
                // res.json({ "blog": blog });
            })
            .catch((err) => {
                res.json({ "error": "Somethiong went wrong!" });
            });
    },
    store: (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('/admin/services/create', { layout: 'backend/layout', errors: errors.mapped() });
        }
        let sampleFile;
        if (!req.files || Object.keys(req.files).length === 0) {
            res.redirect('/admin/services/create');
        }
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.image;
        let rnd = new Date().valueOf();
        let filePath = 'upload/' + rnd + sampleFile.name;
        sampleFile.mv('public/' + filePath, function (err) {
            if (err) {
                res.redirect('/admin/services/create');
            }
        });
        const services = new ServicesModel({
            image: filePath,
            title: req.body.title,
            details: req.body.details,
            link: req.body.link

        });

        services.save((err, newServices) => {
            if (err) {
                res.redirect('/admin/services/create');
            }
            res.redirect('/admin/services');
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
            sampleFile = req.files.image;
            let rnd = new Date().valueOf();
            filePath = 'upload/' + rnd + sampleFile.name;
            // Use the mv() method to place the file somewhere on your server
            sampleFile.mv('public/' + filePath, function (err) {
                if (err)
                    res.redirect("/admin/services/" + req.params.id + "/edit");
            });
        }
        const servicesObj = {
            title: req.body.title,
            details: req.body.details,
            link: req.body.link
        };
        if (filePath) {
            servicesObj.image = filePath;
        }
        ServicesModel.findByIdAndUpdate(req.params.id, servicesObj, (err, blog) => {
            if (err) {
                res.redirect("/admin/services/" + req.params.id + "/edit");
            }
            res.redirect("/admin/services");
        });
    }
}