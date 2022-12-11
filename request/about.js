const { check } = require('express-validator');

exports.store = [
    check('title', "Invalid title").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim(),
    check('details2', "Invalid details2").not().isEmpty().trim(),
    check('details3', "Invalid details3").not().isEmpty().trim(),
    check('details4', "Invalid details4").not().isEmpty().trim(),
    check('image', "Invalid Image"),
    check('link', "Invalid link").not().isEmpty().trim()
];
exports.update = [
    check('title', "Invalid title").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim(),
    check('details2', "Invalid details2").not().isEmpty().trim(),
    check('details3', "Invalid details3").not().isEmpty().trim(),
    check('details4', "Invalid details4").not().isEmpty().trim(),
    check('image', "Invalid Image"),
    check('link', "Invalid link").not().isEmpty().trim()
];
