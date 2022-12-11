const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    
    image: {
        type: String,
        require: false,
    },
    title: {
        type: String,
        require: true
    },
    details: {
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    date:{
        type: String,
        require: true
    },
    profileimage: {
        type: String,
        require: false,
    }

});

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;