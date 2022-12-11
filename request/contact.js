const { check } = require('express-validator');

exports.store = [
    check('icon', "Invalid icon"),
    check('address', "Invalid address").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim()

];
exports.update = [
    check('icon', "Invalid icon"),
    check('address', "Invalid address").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim()
];
