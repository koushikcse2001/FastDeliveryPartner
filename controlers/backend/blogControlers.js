// const request = require('../../request/blog.js')
const { validationResult } = require('express-validator');
const BlogModel = require('../../models/blog');
const fs = require("fs");
module.exports = {

    index: (req, res, next) => {
        BlogModel.find((err, docs) => {
            if (err) {
                return res.json({ error: "Something went wrong!" + err })
            }
            const blog = [];
            docs.forEach(element => {
                blog.push({
                    image: element.image,
                    title: element.title,
                    details: element.details,
                    name: element.name,
                    date: element.date,
                    profileimage: element.profileimage,
                    id: element._id
                });
            });
            // return res.json({ blogs: docs });
            res.render('backend/blog/index.hbs', { title: 'Blogs', layout: 'backend/layout', blog: blog });
        });
    },

    create: (req, res, next) => {
        res.render('backend/blog/create.hbs', { title: 'Blogs create', layout: 'backend/layout' });
    },

    edit: (req, res, next) => {
        //json
        // res.json({'id':req.params.id});
        BlogModel.findById(req.params.id)
            .then((blog) => {

                const details = {
                    image: blog.image,
                    title: blog.title,
                    details: blog.details,
                    name: blog.name,
                    date: blog.date,
                    profileimage: blog.profileimage,
                    id: blog._id
                }
                res.render('backend/blog/edit.hbs', { title: 'Edit', layout: 'backend/layout', blog: details });
                // res.json({ "blog": blog });
            });
    },


    delete: (req, res, next) => {
        BlogModel.findByIdAndRemove(req.params.id, (err, blog) => {

            if (err) {
                console.log("Could not deleted!!");
            }
            try {
                fs.unlink("public/" + blog.image, () => {
                    console.log("File Deleted!!!!");
                });
                fs.unlink("public/" + blog.profileimage, () => {
                    console.log("File Deleted!!!!");
                });

            } catch (error) {
                console.log("Something went wrong========");
            }

            res.redirect("/admin/blog")
        });
    },

    show: (req, res, next) => {
        BlogModel.findById(req.params.id)
            .then((blog) => {
                const details = {
                    image: blog.image,
                    title: blog.title,
                    details: blog.details,
                    name: blog.name,
                    date: blog.date,
                    profileimage: blog.profileimage,
                    id: blog._id
                }
                res.render('backend/blog/show.hbs', { title: 'Show', layout: 'backend/layout', blog: details });
            })
            .catch((err) => {
                res.json({ "error": "Somethiong went wrong!" });
            });

    },
    store: (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('/admin/blog/create',{layout: 'backend/layout',errors:errors.mapped()});
            //return res.json({errors:errors.mapped()});
        }
        let sampleFile;
        let sampleFile2;
        if (!req.files || Object.keys(req.files).length === 0) {
            res.redirect('/admin/blog/create',{layout: 'backend/layout',errors:errors.mapped()});
        }
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.image;
        sampleFile2 = req.files.profileimage;
        let rnd = new Date().valueOf();
        let rnd2 = new Date().valueOf();
        let filePath = 'upload/' + rnd + sampleFile.name;
        let filePath2 = 'upload/' + rnd2 + sampleFile2.name;

        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv('public/' + filePath, function (err) {
            if (err) {
                res.redirect('/admin/blog/create',{layout: 'backend/layout',errors:errors.mapped()});
            }
        });
        sampleFile2.mv('public/' + filePath2, function (err) {
            if (err) {
                res.redirect('/admin/blog/create',{layout: 'backend/layout',errors:errors.mapped()});
            }
        });

        const blog = new BlogModel({
            image: filePath,
            title: req.body.title,
            details: req.body.details,
            name: req.body.name,
            date: req.body.date,   //problam!!!!!
            profileimage: filePath2

        });
        blog.save((err, newBlog) => {
            if (err) {
                res.redirect('/admin/blog/create',{layout: 'backend/layout',errors:errors.mapped()});
            }
            res.redirect('/admin/blog');
            // return res.json({ blog: newBlog });
        });

        //return res.json(req.body);
        // res.render('index', { title: 'blogs store' ,layout:'backend/layout'});
    },
    update: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //res.redirect('/admin/blog/edit',{layout: 'backend/layout',errors:errors.mapped()});
            res.json({ errors: errors.mapped() });
        }
        let sampleFile, filePath, sampleFile2, filePath2;
        if (req.files) {
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            sampleFile = req.files.image;
            sampleFile2 = req.files.profileimage;
            let rnd = new Date().valueOf();
            let rnd2 = new Date().valueOf();
            filePath = 'upload/' + rnd + sampleFile.name;
            filePath2 = 'upload/' + rnd2 + sampleFile2.name;
            // Use the mv() method to place the file somewhere on your server
            sampleFile.mv('public/' + filePath, function (err) {
                if (err)
                    res.redirect("/admin/blog/" + req.params.id + "/edit");
            });
            sampleFile2.mv('public/' + filePath2, function (err) {
                if (err) {
                    res.redirect("/admin/blog/" + req.params.id + "/edit");
                }
            });
        }
        const blogObj = {
            title: req.body.title,
            details: req.body.details,
            name: req.body.name,
            date: req.body.date
        };
        if (filePath || filePath2) {
            blogObj.image = filePath;
            blogObj.profileimage = filePath2;
        }
        // if (filePath2) {
        //     blogObj.profileimage = filePath2;
        // }
        BlogModel.findByIdAndUpdate(req.params.id, blogObj, (err, blog) => {
            if (err) {
                res.redirect("/admin/blog/" + req.params.id + "/edit");
            }
            res.redirect("/admin/blog");
        });

    }
}
