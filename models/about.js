const mongoose = require("mongoose");
const AboutSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    details: {
        type: String,
        require: true
    },
    details2: {
        type: String,
        require: true
    },
    details3: {
        type: String,
        require: true
    },
    details4: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: false,
    },
    link:{
        type:String,
        require:true
    }

});
const About = mongoose.model("About", AboutSchema);
module.exports = About;