const { check } = require('express-validator');

exports.store = [
    check('title', "Invalid title").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim(),
    check('details2', "Invalid details2").not().isEmpty().trim(),
    check('details3', "Invalid details3").not().isEmpty().trim(),
    check('details4', "Invalid details4").not().isEmpty().trim(),
    check('details5', "Invalid details5").not().isEmpty().trim(),
    check('details6', "Invalid details6").not().isEmpty().trim(),
    check('image', "Invalid Image"),
];
exports.update = [
    check('title', "Invalid title").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim(),
    check('details2', "Invalid details2").not().isEmpty().trim(),
    check('details3', "Invalid details3").not().isEmpty().trim(),
    check('details4', "Invalid details4").not().isEmpty().trim(),
    check('details5', "Invalid details5").not().isEmpty().trim(),
    check('details6', "Invalid details6").not().isEmpty().trim(),
    check('image', "Invalid Image"),
];
