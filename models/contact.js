const mongoose = require("mongoose");
const ContactSchema = new mongoose.Schema({
    icon: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    details: {
        type: String,
        require: true,
    }
});
const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;