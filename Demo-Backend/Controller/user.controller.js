const UserModel = require('../Models/User.model');
const dontenv = require('dotenv')
const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");

dontenv.config()

exports.registerUser = async (req, res) => {
    if (req.method == "POST") {
        var user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            if (req.body.email == "" || req.body.email == null || req.body.email == undefined) {
                res.status(400).json({ Success: false, message: "Email is required", status: 400 })
            } else if (req.body.password == "" || req.body.password == null || req.body.password == undefined) {
                res.status(400).json({ Success: false, message: "password is required", status: 400 })
            } else {
                var UserData = new UserModel({
                    name: req.body.name,
                    email: req.body.email,
                    password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
                })
                var savedData = await UserData.save()
                var payload = { subject: savedData._id }
                var token = jwt.sign(payload, process.env.SECRET_KEY);
                res.status(200).json({ Success: true, data: UserData, message: "Successfully Registered", token, status: 200 })
            }
        } else {
            res.status(404).json({ Success: false, message: "User already Exists", status: 404 })
        }
    }
    else {
        res.status(400).json({ Success: false, message: `${req.method} method is not allowed`, status: 400 })
    }
}






// Authenticate User for login 
exports.login = async (req, res) => {
    if (req.method == "POST") {
        if (req.body.email == "" || req.body.email == null || req.body.email == undefined) {
            res.status(400).json({ Success: false, message: "Email is required" })
        } else {
            var user = await UserModel.findOne({ email: req.body.email });
            if (user) {
                if (req.body.password == "" || req.body.password == null || req.body.password == undefined) {
                    res.status(400).json({ Success: false, message: "password is required" })
                } else {
                    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
                    var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8)
                    if (req.body.email == user.email && req.body.password == decryptedPassword) {
                        var payload = { subject: user._id }
                        var token = jwt.sign(payload, process.env.SECRET_KEY);
                        res.status(200).json({ Success: true, message: "Signin Success", token })
                    } else {
                        res.status(200).json({ Success: true, message: "Invalid Credentials" })
                    }
                }
            } else {
                res.status(404).json({ Success: false, message: "Invalid Credentials" })
            }
        }
    }
    else {
        res.status(400).json({ Success: false, message: `${req.method} method is not allowed` })
    }
}


