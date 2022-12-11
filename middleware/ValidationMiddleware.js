
module.exports = {
    valid: (req, res, next) => {
        // res.locals.menu = "Something";
        res.render('frontend/login', { title: 'Login', layout: 'frontend/layout'});
        next();
    }
} 