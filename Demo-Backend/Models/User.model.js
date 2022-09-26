var mongoose= require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true 

    },
    password:{
        type:String,
        required:true,
        minlength:8  
    },
})


module.exports = mongoose.model('OneTouchDataBase',userSchema);