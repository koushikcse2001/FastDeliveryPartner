var express = require('express');
var router = express.Router();

const {valid}=require("../middleware/ValidationMiddleware.js");

const DashboardControl=require('../controlers/backend/dashboardControler');

const AboutController=require('../controlers/backend/aboutController');
const BlogController=require('../controlers/backend/blogControlers.js');
const TeamController=require('../controlers/backend/teamControlers.js');
const TestmonialController=require('../controlers/backend/testmonialControlers.js');
const ContactController=require('../controlers/backend/contactControlers.js');
const ServicesController=require('../controlers/backend/servicesControler.js');
const PriceController=require('../controlers/backend/priceControler.js');

const BlogRequest =require('../request/blog');
const TeamRequest =require('../request/team');
const TestimonialRequest =require('../request/testimonial');
const ContactRequest =require('../request/contact');
const AboutRequest =require('../request/about');
const ServicesRequest =require('../request/Services');
const PriceRequest =require('../request/price');

// router.use(valid);

/* GET Admin page. */
router.get('/',  DashboardControl.index );

//admin profile
router.get('/profile',DashboardControl.profile );

// blogs list
router.get('/blog',BlogController.index );
router.get('/blog/create',BlogController.create);
router.get('/blog/:id/edit',BlogController.edit );
router.get('/blog/:id/delete',BlogController.delete );
router.get('/blog/:id/show',BlogController.show );
router.post('/blog/store',BlogRequest.store,BlogController.store );
router.post('/blog/:id/update',BlogRequest.update,BlogController.update );

// team list
router.get('/team',TeamController.index );
router.get('/team/create',TeamController.create);
router.get('/team/:id/edit',TeamController.edit );
router.get('/team/:id/delete',TeamController.delete );
router.get('/team/:id/show',TeamController.show );
router.post('/team/store',TeamRequest.store,TeamController.store );
router.post('/team/:id/update',TeamRequest.update,TeamController.update );

//testmonial
router.get('/testimonial',TestmonialController.index );
router.get('/testimonial/create',TestmonialController.create);
router.get('/testimonial/:id/edit',TestmonialController.edit );
router.get('/testimonial/:id/delete',TestmonialController.delete );
router.get('/testimonial/:id/show',TestmonialController.show );
router.post('/testimonial/store',TestimonialRequest.store,TestmonialController.store );
router.post('/testimonial/:id/update',TestimonialRequest.update,TestmonialController.update );

//contact
router.get('/contact',ContactController.index );
router.get('/contact/create',ContactController.create);
router.get('/contact/:id/edit',ContactController.edit );
router.get('/contact/:id/delete',ContactController.delete );
router.get('/contact/:id/show',ContactController.show );
router.post('/contact/store',ContactRequest.store,ContactController.store );
router.post('/contact/:id/update',ContactRequest.update,ContactController.update );

//about
router.get('/about',AboutController.index );
router.get('/about/create',AboutController.create);
router.get('/about/:id/edit',AboutController.edit );
router.get('/about/:id/delete',AboutController.delete );
router.get('/about/:id/show',AboutController.show );
router.post('/about/store',AboutRequest.store,AboutController.store );
router.post('/about/:id/update',AboutRequest.update,AboutController.update );

//services
router.get('/services',ServicesController.index );
router.get('/services/create',ServicesController.create);
router.get('/services/:id/edit',ServicesController.edit );
router.get('/services/:id/delete',ServicesController.delete );
router.get('/services/:id/show',ServicesController.show );
router.post('/services/store',ServicesRequest.store,ServicesController.store );
router.post('/services/:id/update',ServicesRequest.update,ServicesController.update );

//price
router.get('/price',PriceController.index );
router.get('/price/create',PriceController.create);
router.get('/price/:id/edit',PriceController.edit );
router.get('/price/:id/delete',PriceController.delete );
router.get('/price/:id/show',PriceController.show );
router.post('/price/store',PriceRequest.store, PriceController.store );
router.post('/price/:id/update',PriceRequest.update, PriceController.update );

module.exports = router;  
