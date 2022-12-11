const { check } = require('express-validator');

exports.store = [
    check('email', "Invalid email").not().isEmpty().trim(),
    check('firstname', "Invalid firstname").not().isEmpty().trim(),
    check('lastname', "Invalid lastname").not().isEmpty().trim(),
    check('password', "Invalid password").not().isEmpty().trim(),
    
];
exports.update = [
    check('email', "Invalid email").not().isEmpty().trim(),
    check('firstname', "Invalid firstname").not().isEmpty().trim(),
    check('lastname', "Invalid lastname").not().isEmpty().trim(),
    check('password', "Invalid password").not().isEmpty().trim(),
];