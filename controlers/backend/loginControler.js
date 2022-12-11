const { validationResult } = require('express-validator');
const RegistrationModel = require('../../models/registration');

module.exports = {

    identify: async (req, res, next) => {

        try {
            const email = req.body.email;
            const password = req.body.password;
            
            const UserEmail = await RegistrationModel.findOne({ email: email });
            if (UserEmail.password === password){
                res.redirect("/admin")
            }
            else{
                res.send("email or password are not matching!!!")
            }

        } catch (error) {
            res.send("Invalid Login Details!!")
        }
    }

}