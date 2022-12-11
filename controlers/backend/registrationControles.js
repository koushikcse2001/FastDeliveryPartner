const { validationResult } = require('express-validator');
const RegistrationModel = require('../../models/registration');
const bcrypt = require('bcryptjs');

module.exports = {
    store: async (req, res, next) => {

        try {
            const password = req.body.password;
            const confrompassword = req.body.confrompassword;
            const email = req.body.email;
            const terms = req.body.terms;
            const UserEmail = await RegistrationModel.findOne({ email: email });

            if (UserEmail.email === email) {
                res.send("This Email has been taken!!!");
            }

            else {
                if (password === confrompassword) {
                    if (terms > 0) {
                        const errors = validationResult(req);
                        if (!errors.isEmpty()) {
                            res.render('/registration', { layout: 'frontend/layout', errors: errors.mapped() });
                            // res.redirect('/registration');
                        }
                        if (!req.files || Object.keys(req.files).length === 0) {
                            res.render('/registration', { layout: 'frontend/layout', errors: errors.mapped() });
                            //res.redirect('/registration');
                        }
                        const registration = new RegistrationModel({
                            email: req.body.email,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            password: req.body.password,
                        });

                        const registered = await registration.save((err, newRegistration) => {
                            if (err) {
                                res.render('/registration');
                                // res.redirect('/registration');
                            }
                            res.redirect('/login');
                        });
                    }
                    else {
                        res.send("Accept all the terms and conditions!!");
                    }
                }
                else {
                    res.send("Password are not matching!!");
                }
            }

        } catch (error) {

            res.status(400).send(error);
        }


    }

}


            // const securePassword = async (password) => {

            //     const passwordHash = await bcrypt.hash(password, 10);
            //     console.log(passwordHash);

            //     // const passwordmatch= await bcrypt.compare(password, passwordHash);
            //     // console.log(passwordHash);

            // }
            // securePassword('gg');