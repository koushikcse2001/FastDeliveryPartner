const mongoose = require("mongoose");
const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    designation: {
        type: String,
        require: false
    },
    description: {
        type: String,
        require: false
    },
    image: {
        type: String,
        require: true
    },
    github: {
        type: String,
        require: false
    },
    facebook: {
        type: String,
        require: false
    },
    twitter: {
        type: String,
        require: false
    },
    instagram: {
        type: String,
        require: false
    },
    linkdin: {
        type: String,
        require: false
    }
});
const Team = mongoose.model("Team", TeamSchema);
module.exports = Team;