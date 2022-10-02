var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name should be more than 2 characters"]
    },
    email: {
        type: String,
        unique: [true, "Email should be Unique"],
        required: [true, "Email is required"],
        validate: {
            validator: (value) => {
                return /[a-zA-Z][a-zA-Z0-9_\-\.]+[a-zA-Z0-9]+[@][a-z]+[\.][a-z]+/.test(value);
            },
            message: (props) => {
                return `${props.value} is invalid format`
            }
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password should be more than 8 characters"],
    },
    imgSrc: {
        type: String,
    }
}, { timestamps: true })


module.exports = mongoose.model('OneTouchUsers', userSchema);