
const { validationResult } = require('express-validator');
const TestimonialModel = require('../../models/testmonials');
const fs = require("fs");

module.exports = {

    index: (req, res, next) => {
        TestimonialModel.find((err, docs) => {
            if (err) {
                return res.json({ error: "Something went wrong!" + err })
            }
            const testimonial = [];
            docs.forEach(element => {
                testimonial.push({
                    image: element.image,
                    name: element.name,
                    designation: element.designation,
                    details: element.details,
                    id: element._id
                });
            });
            // return res.json({ Team: docs });
            res.render('backend/testimonial/index.hbs', { title: 'Testimonial', layout: 'backend/layout', testimonial: testimonial });
        });
    },
    create: (req, res, next) => {
        res.render('backend/testimonial/create.hbs', { title: 'testimonial create', layout: 'backend/layout' });
    },
    edit: (req, res, next) => {
        TestimonialModel.findById(req.params.id)
            .then((testimonial) => {
                const details = {
                    image: testimonial.image,
                    name: testimonial.name,
                    designation: testimonial.designation,
                    details: testimonial.details,
                    id: testimonial._id
                }
                res.render('backend/testimonial/edit.hbs', { title: 'Edit', layout: 'backend/layout', testimonial: details });
                // res.json({ "blog": blog });
            });
    },
    delete: (req, res, next) => {
        TestimonialModel.findByIdAndRemove(req.params.id, (err, team) => {

            if (err) {
                console.log("Could not deleted!!");
            }
            try {
                fs.unlink("public/" + testimonial.image, () => {
                    console.log("File Deleted!!!!");
                });

            } catch (error) {
                console.log("Something went wrong========");
            }

            res.redirect("/admin/testimonial")
        });

    },
    show: (req, res, next) => {
        TestimonialModel.findById(req.params.id)
        .then((testimonial) => {

            const details = {
                image: testimonial.image,
                name: testimonial.name,
                designation: testimonial.designation,
                details: testimonial.details,
                id: testimonial._id
            }
            res.render('backend/testimonial/show.hbs', { title: 'Show', layout: 'backend/layout', testimonial: details });
            // res.json({ "blog": blog });
        })
        .catch((err) => {
            res.json({ "error": "Somethiong went wrong!" });
        });       
    },
    store: (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('/admin/testimonial/create',{layout: 'backend/layout',errors:errors.mapped()});

        }
        let sampleFile;
        if (!req.files || Object.keys(req.files).length === 0) {
            res.redirect('/admin/testimonial/create');
        }
         // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
         sampleFile = req.files.image;
         let rnd = new Date().valueOf();
         let filePath = 'upload/' + rnd + sampleFile.name;
         sampleFile.mv('public/' + filePath, function (err) {
            if (err) {
                res.redirect('/admin/testimonial/create');
            }
        });
        const testimonial = new TestimonialModel({
            image: filePath,
            name: req.body.name,
            designation: req.body.designation,
            details: req.body.details
       
        });

        testimonial.save((err, newTestimonial) => {
            if (err) {
                res.redirect('/admin/testimonial/create');
            }
            res.redirect('/admin/testimonial');
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
                    res.redirect("/admin/testimonial/"+req.params.id+"/edit");
            });
        }
        const testimonialObj = {
            name: req.body.name,
            designation: req.body.designation,
            details: req.body.details
        };
        if (filePath) {
            testimonialObj.image = filePath;
        }
        TestimonialModel.findByIdAndUpdate(req.params.id, testimonialObj, (err, blog) => {
            if (err) {
                res.redirect("/admin/testimonial/" + req.params.id + "/edit");
            }
            res.redirect("/admin/testimonial");
        });
    }
}