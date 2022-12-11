
const { validationResult } = require('express-validator');
const AboutModel = require('../../models/about');
const fs = require("fs");

module.exports = {

    index: (req, res, next) => {
        AboutModel.find((err, docs) => {
            if (err) {
                return res.json({ error: "Something went wrong!" + err })
            }
            const about = [];
            docs.forEach(element => {
                about.push({
                    title: element.title,
                    details: element.details,
                    details2: element.details2,
                    details3: element.details3,
                    details4: element.details4,
                    image: element.image,
                    link: element.link,
                    id: element._id
                });
            });
            // return res.json({ blogs: docs });
            res.render('backend/about/index.hbs', { title: 'about', layout: 'backend/layout', about:about });
        });
    },
    create: (req, res, next) => {
        res.render('backend/about/create.hbs', { title: 'Create', layout: 'backend/layout' });
    },
    edit: (req, res, next) => {
        AboutModel.findById(req.params.id)
            .then((about) => {

                const details = {
                    title: about.title,
                    details: about.details,
                    details2: about.details2,
                    details3: about.details3,
                    details4: about.details4,
                    image: about.image,
                    link: about.link,
                    id: about._id
                }
                res.render('backend/about/edit.hbs', { title: 'Edit', layout: 'backend/layout', about: details });
                // res.json({ "blog": blog });
            });
    },
    delete: (req, res, next) => {
        AboutModel.findByIdAndRemove(req.params.id, (err, blog) => {

            if (err) {
                console.log("Could not deleted!!");
            }
            try {
                fs.unlink("public/" + about.image, () => {
                    console.log("File Deleted!!!!");
                });
            } catch (error) {
                console.log("Something went wrong========");
            }

            res.redirect("/admin/about")
        });
    },
    show: (req, res, next) => {
        AboutModel.findById(req.params.id)
        .then((about) => {

            const details = {
                title: about.title,
                details: about.details,
                details2: about.details2,
                details3: about.details3,
                details4: about.details4,
                image: about.image,
                link: about.link,
                id: about._id
            }
            res.render('backend/about/show.hbs', { title: 'Show', layout: 'backend/layout', about: details });
            // res.json({ "blog": blog });
        })
        .catch((err) => {
            res.json({ "error": "Somethiong went wrong!" });
        });
    },
    store: (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.redirect('/admin/about/create');
            //return res.json({errors:errors.mapped()});
        }
        let sampleFile;
        if (!req.files || Object.keys(req.files).length === 0) {
            res.redirect('/admin/about/create');
        }
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.image;
      
        let rnd = new Date().valueOf();
     
        let filePath = 'upload/' + rnd + sampleFile.name;
        
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv('public/' + filePath, function (err) {
            if (err) {
                res.redirect('/admin/about/create');
            }
        });
        const about = new AboutModel({
          
            title: req.body.title,
            details: req.body.details,
            details2: req.body.details2,
            details3: req.body.details3,
            details4: req.body.details4,
            image: filePath,
            link: req.body.link
           
        });
        about.save((err, newBlog) => {
            if (err) {
                res.redirect('/admin/about/create');
            }
            res.redirect('/admin/about');
           
        });
    },
    update: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ errors: errors.mapped()});
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
                    res.redirect("/admin/about/" + req.params.id + "/edit");
            });
        }
        const aboutObj = {
            title: req.body.title,
            details: req.body.details,
            details2: req.body.details2,
            details3: req.body.details3,
            details4: req.body.details4,
            link: req.body.link
        };
        if (filePath) {
            aboutObj.image = filePath;
        }
        AboutModel.findByIdAndUpdate(req.params.id, aboutObj, (err, blog) => {
            if (err) {
                res.redirect("/admin/about/" + req.params.id + "/edit");
            }
            res.redirect("/admin/about");
        });

    }
}