const { check } = require('express-validator');

exports.store = [
    check('name', "Invalid name").not().isEmpty().trim(),
    check('designation', "Invalid designation").not().isEmpty().trim(),
    check('description', "Invalid description").not().isEmpty().trim(),
    check('image', "Invalid image"),
    check('github', "Invalid github").not().isEmpty().trim(),
    check('facebook', "Invalid facebook").not().isEmpty().trim(),
    check('twitter', "Invalid twitter").not().isEmpty().trim(),
    check('instagram', "Invalid instagram").not().isEmpty().trim(),
    check('linkdin', "Invalid linkdin").not().isEmpty().trim()
];
exports.update = [
    check('name', "Invalid name").not().isEmpty().trim(),
    check('designation', "Invalid designation").not().isEmpty().trim(),
    check('description', "Invalid description").not().isEmpty().trim(),
    check('image', "Invalid image"),
    check('github', "Invalid github").not().isEmpty().trim(),
    check('facebook', "Invalid facebook").not().isEmpty().trim(),
    check('twitter', "Invalid twitter").not().isEmpty().trim(),
    check('instagram', "Invalid instagram").not().isEmpty().trim(),
    check('linkdin', "Invalid linkdin").not().isEmpty().trim()
];
