const { check } = require('express-validator');

exports.store = [
    check('image', "Invalid image"),
    check('title', "Invalid title").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim(),
    check('name', "Invalid name").not().isEmpty().trim(),
    check('date', "Invalid date").not().isEmpty().trim(),
    check('profileimage', "Invalid profileimage")
];
exports.update = [
    check('image', "Invalid image"),
    check('title', "Invalid title").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim(),
    check('name', "Invalid name").not().isEmpty().trim(),
    check('date', "Invalid date").not().isEmpty().trim(),
    check('profileimage', "Invalid profileimage")
];