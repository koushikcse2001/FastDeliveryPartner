var express = require('express');
var router = express.Router();
const PageControler = require('../controlers/pageControler.js');
const RegistrationControler = require('../controlers/backend/registrationControles');
const LoginControler =require('../controlers/backend/loginControler')

// const {valid}=require("../middleware/ValidationMiddleware");
// router.use(valid);
// valid,

/* GET home page. */
router.get('/', PageControler.index);
router.get('/services', PageControler. services);
router.get('/price', PageControler. price);
router.get('/about', PageControler.about);
router.get('/testimonial', PageControler.testimonial);
router.get('/team', PageControler.team);
router.get('/blog', PageControler.blog);
router.get('/contact', PageControler.contact);

//login & registration page call
router.get('/registration', PageControler.registration);
router.get('/login', PageControler.login);

//login & registration page modify
router.post('/registration/store', RegistrationControler.store);
router.post('/login/identify', LoginControler.identify);

module.exports = router;
