// const UserModel = require('../Models/User.model');
const bcrypt = require('bcrypt');
const dontenv = require('dotenv')
const jwt = require('jsonwebtoken');
// var CryptoJS = require("crypto-js");
const userService = require('../services/user.service');
const errorHandlerService = require('../services/errors.service');




const userCtrl = {
    register: async (req, res) => {
        try {
            email = req.body.email.toLowerCase()
            const user = await userService.getByEmail(email)
            if (user) {
                res.status(404);
                res.json({ error: true, message: "Email already exists." })
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(req.body.password, salt);
                req.body.password = hashedPassword;
                req.body.email = req.body.email.toLowerCase()
                // const body = JSON.parse(req.body)
                const user = await userService.create(req.body);
                var payload = { subject: user._id }
                var token = jwt.sign(payload, process.env.SECRET_KEY);
                res.status(200)
                res.json({ error: false, message: "Successfully Registered", token })
            }
        } catch (error) {
            const errors = errorHandlerService.userErrorHandler(error)
            if (errors.length > 0) {
                res.status(500)
                res.json({ error: true, message: "Validation Error", errorDescription: errors })
            } else {
                res.status(500)
                res.json({ error: true, message: "Server Error", errorDescription: error })
            }
        }
    },

    login: async (req, res) => {
        try {
            email = req.body.email.toLowerCase()
            const user = await userService.getByEmail(email)
            if (user) {
                const isSame = await bcrypt.compare(req.body.password, user.password)
                if (isSame) {
                    var payload = { subject: user._id }
                    var token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1h'});
                    res.status(200)
                    res.json({ error: false, message: "SignIn Success", token })
                } else {
                    res.status(409);
                    res.json({ error: true, message: "Password is incorrect" })
                }
            } else {
                res.status(404);
                res.json({ error: true, message: "Email doesn't exists." })
            }
        } catch (error) {
            res.status(500)
            res.json({ error: true, message: "Server Error", errorDescription: error })
        }
    },

    // trying for seperate file

    upload: async (req, res) => {
        try {
            const createdProduct = await userService.uploadImg(req.body);
            res.status(200);
            res.send({ status: 'success', data: createdProduct });
        } catch (error) {
            res.status(500);
            res.send({ status: 'success', errorDescription: "Server Error" });
        }
    },


    logout: (req, res) => {
        const token = req.header('auth-token')
        console.log("token: ", token);
        if (!token) {
            res.status(401).send({ Success: false, message: 'Action Denied..!!!'})
        } else {
            res.clearCookie("token")
            res.status(401).send({ Success: true, message: 'Logout Success' })
        }
    }
}


module.exports = userCtrl;





































dontenv.config()

// exports.registerUser = async (req, res) => {
//     if (req.method == "POST") {
//         var user = await UserModel.findOne({ email: req.body.email });
//         if (!user) {
//             if (req.body.email == "" || req.body.email == null || req.body.email == undefined) {
//                 res.status(400).json({ Success: false, message: "Email is required", status: 400 })
//             } else if (req.body.password == "" || req.body.password == null || req.body.password == undefined) {
//                 res.status(400).json({ Success: false, message: "password is required", status: 400 })
//             } else {
//                 var UserData = new UserModel({
//                     name: req.body.name,
//                     email: req.body.email,
//                     password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
//                 })
//                 var savedData = await UserData.save()
//                 var payload = { subject: savedData._id }
//                 var token = jwt.sign(payload, process.env.SECRET_KEY);
//                 res.status(200).json({ Success: true, data: UserData, message: "Successfully Registered", token, status: 200 })
//             }
//         } else {
//             res.status(404).json({ Success: false, message: "User already Exists", status: 404 })
//         }
//     }
//     else {
//         res.status(400).json({ Success: false, message: `${req.method} method is not allowed`, status: 400 })
//     }
// }









// Authenticate User for login
// exports.login = async (req, res) => {
//     if (req.method == "POST") {
//         if (req.body.email == "" || req.body.email == null || req.body.email == undefined) {
//             res.status(400).json({ Success: false, message: "Email is required" })
//         } else {
//             var user = await UserModel.findOne({ email: req.body.email });
//             if (user) {
//                 if (req.body.password == "" || req.body.password == null || req.body.password == undefined) {
//                     res.status(400).json({ Success: false, message: "password is required" })
//                 } else {
//                     const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
//                     var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8)
//                     if (req.body.email == user.email && req.body.password == decryptedPassword) {
//                         var payload = { subject: user._id }
//                         var token = jwt.sign(payload, process.env.SECRET_KEY);
//                         res.status(200).json({ Success: true, message: "Signin Success", token })
//                     } else {
//                         res.status(400).json({ Success: true, message: "Invalid Credentials" })
//                     }
//                 }
//             } else {
//                 res.status(404).json({ Success: false, message: "Invalid Credentials" })
//             }
//         }
//     }
//     else {
//         res.status(400).json({ Success: false, message: `${req.method} method is not allowed` })
//     }
// }


