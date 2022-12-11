const mongoose = require("mongoose");
const ServicesSchema = new mongoose.Schema({
    image: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    details: {
        type: String,
        require: true,
    },
    link: {
        type: String,
        require: true,
    }
});
const Services = mongoose.model("Services", ServicesSchema);
module.exports = Services;