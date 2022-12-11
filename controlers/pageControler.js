const BlogModel = require('../models/blog');
const TeamModel = require('../models/team');
const TestimonialModel = require('../models/testmonials');
const AboutModel = require('../models/about');
const ServicesModel = require('../models/services');
const PriceModel = require('../models/price');
const RegistrationModel = require('../models/registration');

module.exports = {
    index: (req, res, next) => {
        res.render('frontend/index', { title: 'home sent successfull!!' });
    },

    services: (req, res, next) => {
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
            res.render('frontend/servis', { title: 'Services', layout: 'frontend/layout', services: services });
        });
    },

    price: (req, res, next) => {

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
            res.render('frontend/price', { title: 'Price', layout: 'frontend/layout', price: price });
        });
    },

    team: (req, res, next) => {
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
            res.render('frontend/team', { title: 'Team', layout: 'frontend/layout', team: team });
        });
    },

    blog: (req, res, next) => {

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
            res.render('frontend/blog', { title: 'Blogs', layout: 'frontend/layout', blog: blog });
        });
    },

    contact: (req, res, next) => {
        res.render('frontend/contact', { title: 'blog sent successfull!!' });
    },

    about: (req, res, next) => {
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
            res.render('frontend/about', { title: 'about', layout: 'frontend/layout', about: about });
        });
    },

    testimonial: (req, res, next) => {

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
            res.render('frontend/testimonial', { title: 'Testimonial', layout: 'frontend/layout', testimonial: testimonial });
        });
    },


    registration: (req, res, next) => {
        res.render('frontend/registration', { title: 'registration sent successfull!!' });
    },
    login: async (req, res, next) => {
        RegistrationModel.find((err, docs) => {
            if (err) {
                return res.json({ error: "Something went wrong!" + err })
            }
            const login = [];
            docs.forEach(element => {
                login.push({
                    email: element.email,
                    id: element._id
                });
            });
            // return res.json({ blogs: docs });
            res.render('frontend/login', { title: 'Login', layout: 'frontend/layout' ,login: login});
           
        });
    },
};