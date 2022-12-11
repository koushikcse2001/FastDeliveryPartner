const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const RegistrationSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }


})

RegistrationSchema.pre("save", async function (next) {
    if (this.isModified("password")) {

        console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`the current password is ${this.password}`);
    }
    next();
})


const Registration = mongoose.model("Registration", RegistrationSchema);
module.exports = Registration;