
const { validationResult } = require('express-validator');
const PriceModel = require('../../models/price');
const fs = require("fs");

module.exports = {

    index: (req, res, next) => {
        PriceModel.find((err, docs) => {
            if (err) {
                return res.json({ error: "Something went wrong!" + err })
            }
            const price = [];
            docs.forEach(element => {
                price.push({
                    title: element.title,
                    details: element.details,
                    details2: element.details2,
                    details3: element.details3,
                    details4: element.details4,
                    details5: element.details5,
                    details6: element.details6,
                    id: element._id
                });
            });
            // return res.json({ blogs: docs });
            res.render('backend/price/index.hbs', { title: 'Price', layout: 'backend/layout', price: price });
        });
    },
    create: (req, res, next) => {
        res.render('backend/price/create.hbs', { title: 'Create', layout: 'backend/layout' });
    },
    edit: (req, res, next) => {
        PriceModel.findById(req.params.id)
            .then((price) => {

                const details = {
                    title: price.title,
                    details: price.details,
                    details2: price.details2,
                    details3: price.details3,
                    details4: price.details4,
                    details5: price.details5,
                    details6: price.details6,
                    id: price._id
                }
                res.render('backend/price/edit.hbs', { title: 'Edit', layout: 'backend/layout', price: details });
                // res.json({ "blog": blog });
            });
    },
    delete: (req, res, next) => {
        PriceModel.findByIdAndRemove(req.params.id, (err, blog) => {

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

            res.redirect("/admin/price")
        });
    },
    show: (req, res, next) => {
        PriceModel.findById(req.params.id)
            .then((price) => {

                const details = {
                    title: price.title,
                    details: price.details,
                    details2: price.details2,
                    details3: price.details3,
                    details4: price.details4,
                    details5: price.details5,
                    details6: price.details6,
                    id: price._id
                }
                res.render('backend/price/show.hbs', { title: 'Show', layout: 'backend/layout', price: details });
                // res.json({ "blog": blog });
            })
            .catch((err) => {
                res.json({ "error": "Somethiong went wrong!" });
            });
    },
    store: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('/admin/price/create',{layout: 'backend/layout',errors:errors.mapped()});
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            //return res.status(400).send('No files were uploaded.');
            res.redirect('/admin/price/create');
        }
        const price = new PriceModel({
            title: req.body.title,
            details: req.body.details,
            details2: req.body.details2,
            details3: req.body.details3,
            details4: req.body.details4,
            details5: req.body.details5,
            details6: req.body.details6,
        });
        price.save((err, newTeam) => {
            if (err) {
                //res.json({error:"Something went wrong!"+err});
                res.redirect('/admin/price/create');
            }
            res.redirect('/admin/price');
        });

    },
    update: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ errors: errors.mapped() });
        }

        const priceObj = {
            title: req.body.title,
            details: req.body.details,
            details2: req.body.details2,
            details3: req.body.details3,
            details4: req.body.details4,
            details5: req.body.details5,
            details6: req.body.details6,
            // link: req.body.link
        };
        PriceModel.findByIdAndUpdate(req.params.id, priceObj, (err, blog) => {
            if (err) {
                res.redirect("/admin/price/" + req.params.id + "/edit");
            }
            res.redirect("/admin/price");
        });
    }
}