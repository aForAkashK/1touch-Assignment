var mongoose = require('mongoose')
var Schema = mongoose.Schema


// just for demo  checking uploads is working or not
var uploadSchema = new Schema({
    imgSrc: {
        type: String,
    }
}, { timestamps: true })


module.exports = mongoose.model('profile', uploadSchema);