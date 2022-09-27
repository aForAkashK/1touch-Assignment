const express = require('express')
const userController = require('../Controller/user.controller');
const fetchUser = require('../Middleware/fetchUser');
const UserModel = require('../Models/User.model');


const router = express.Router();



router.post('/register', userController.registerUser)
router.post('/login', userController.login)

router.get('/getuserdetails', fetchUser, async (req, res) => {
    // console.log(req.user)
    try {
        const userId = req.user;
        const user = await UserModel.findById(userId).select("-password").select("-_id").select("-__v")
        console.log("user : ", user)
        res.status(200).send({ Success: true, message: 'Getting User details Success', data: user })
    } catch (error) {
        res.status(500).send({ Success: false, message: 'Server Error' })
    }
})

module.exports = router
