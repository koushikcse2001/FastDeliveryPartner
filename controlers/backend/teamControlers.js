
const { validationResult } = require('express-validator');
const TeamModel = require('../../models/team');
const fs = require("fs");

module.exports = {

    index: (req, res, next) => {
        TeamModel.find((err, docs) => {
            if (err) {
                return res.json({ error: "Something went wrong!" + err })
            }
            const team = [];
            docs.forEach(element => {
                team.push({
                    name: element.name,
                    designation: element.designation,
                    description: element.description,
                    image: element.image,
                    github: element.github,
                    facebook: element.facebook,
                    twitter: element.twitter,
                    instagram: element.instagram,
                    linkdin: element.linkdin,
                    id: element._id
                });
            });
            // return res.json({ Team: docs });
            res.render('backend/team/index.hbs', { title: 'Team', layout: 'backend/layout', team: team });
        });
    },
    create: (req, res, next) => {
        res.render('backend/team/create.hbs', { title: 'team create', layout: 'backend/layout' });
    },
    edit: (req, res, next) => {
        TeamModel.findById(req.params.id)
        .then((team) => {

            const details = {
                name: team.name,                 
                designation: team.designation,
                description: team.description,
                image: team.image,
                github: team.github,
                facebook: team.facebook,
                twitter: team.twitter,
                instagram: team.instagram,
                linkdin: team.linkdin,
                id: team._id
            }
            res.render('backend/team/edit.hbs', { title: 'Edit', layout: 'backend/layout', team: details });
            // res.json({ "blog": blog });
        });
    },
    delete: (req, res, next) => {
        TeamModel.findByIdAndRemove(req.params.id, (err, team) => {

            if (err) {
                console.log("Could not deleted!!");
            }
            try {
                fs.unlink("public/" + team.image, () => {
                    console.log("File Deleted!!!!");
                });

            } catch (error) {
                console.log("Something went wrong========");
            }

            res.redirect("/admin/team")
        });

    },
    show: (req, res, next) => {

        TeamModel.findById(req.params.id)
            .then((team) => {

                const details = {
                    name: team.name,                 
                    designation: team.designation,
                    description: team.description,
                    image: team.image,
                    github: team.github,
                    facebook: team.facebook,
                    twitter: team.twitter,
                    instagram: team.instagram,
                    linkdin: team.linkdin,
                    id: team._id
                }
                res.render('backend/team/show.hbs', { title: 'Show', layout: 'backend/layout', team: details });
                // res.json({ "blog": blog });
            })
            .catch((err) => {
                res.json({ "error": "Somethiong went wrong!" });
            });       
    },
    store: (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('/admin/team/create',{layout: 'backend/layout',errors:errors.mapped()});
        }
        let sampleFile;
        if (!req.files || Object.keys(req.files).length === 0) {
            res.redirect('/admin/team/create');
        }
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.image;
        let rnd = new Date().valueOf();
        let filePath = 'upload/' + rnd + sampleFile.name;
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv('public/' + filePath, function (err) {
            if (err) {
                res.redirect('/admin/team/create');
            }
        });
        const team = new TeamModel({
            name: req.body.name,
            designation: req.body.designation,
            description: req.body.description,
            image: filePath,
            github: req.body.github,
            facebook: req.body.facebook,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
            linkdin: req.body.linkdin
        });
        team.save((err, newTeam) => {
            if (err) {
                res.redirect('/admin/team/create');
            }
            res.redirect('/admin/team');
        });

        //return res.json(element);
        // res.render('index', { title: 'blogs store' ,layout:'backend/layout'});
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
                    res.redirect("/admin/team/"+req.params.id+"/edit");
            });
        }
        const teamObj = {
            name: req.body.name,
            designation: req.body.designation,
            description: req.body.description,
            github: req.body.github,
            facebook: req.body.facebook,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
            linkdin: req.body.linkdin
        };
        if (filePath) {
            teamObj.image = filePath;
        }
        TeamModel.findByIdAndUpdate(req.params.id, teamObj, (err, blog) => {
            if (err) {
                res.redirect("/admin/team/" + req.params.id + "/edit");
            }
            res.redirect("/admin/team");
        });

    }
}