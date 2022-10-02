const express = require('express');
const userCtrl = require('../Controller/user.controller');
const userController = require('../Controller/user.controller');
const fetchUser = require('../Middleware/fetchUser');
const UserModel = require('../Models/User.model');
const multer = require('multer');


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + `-${file.originalname}`;
        req.body.imgSrc = fileName;
        cb(null, fileName)
    }

})

const upload = multer({ storage })



router.post('/register', upload.single("img"), userCtrl.register)
router.post('/login', userController.login)
router.get('/logout', userController.logout)


// router.post('/uploadImg', upload.single("img"), userCtrl.upload)
// router.post('/register', userCtrl.register)

router.get('/getuserdetails', fetchUser, async (req, res) => {
    // console.log(req.user)
    try {
        const userId = req.user;
        const user = await UserModel.findById(userId).select("-password").select("-_id").select("-__v")
        user.imgSrc = `${req.protocol}://${req.hostname}:${process.env.PORT}/${user.imgSrc}`
        console.log("user : ", user)
        res.status(200).send({ Success: true, message: 'Getting User details Success', data: user })
    } catch (error) {
        res.status(500).send({ Success: false, message: 'Server Error' })
    }
})

module.exports = router
