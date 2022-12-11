const mongoose = require("mongoose");
const PriceSchema = new mongoose.Schema({
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
        require: false
    },
    details3: {
        type: String,
        require: false
    },
    details4: {
        type: String,
        require: false
    },
    details5: {
        type: String,
        require: false
    },
    details6: {
        type: String,
        require: false
    },

});
const Price = mongoose.model("Price", PriceSchema);
module.exports = Price;