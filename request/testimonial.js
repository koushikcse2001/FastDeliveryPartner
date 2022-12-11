const { check } = require('express-validator');

exports.store = [
    check('image', "Invalid Image"),
    check('name', "Invalid name").not().isEmpty().trim(),
    check('designation', "Invalid designation").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim()
  
];
exports.update = [
    check('image', "Invalid Image"),
    check('name', "Invalid name").not().isEmpty().trim(),
    check('designation', "Invalid designation").not().isEmpty().trim(),
    check('details', "Invalid details").not().isEmpty().trim()
   
];
