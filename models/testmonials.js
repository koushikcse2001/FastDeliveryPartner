const mongoose = require("mongoose");
const TestmonialsSchema = new mongoose.Schema({
    image: {
        type: String,
        require: false,
    },
    name: {
        type: String,
        require: true
    },
    designation: {
        type: String,
        require: true
    },
    details: {
        type: String,
        require: true
    }

});
const Testmonials = mongoose.model("Testmonials", TestmonialsSchema);
module.exports = Testmonials;