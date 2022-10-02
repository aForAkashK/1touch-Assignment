const userSchema = require("../Models/User.model")
const uploadSchema = require("../Models/upload.model")

const userService = {
    create: (data) => {
        const user = new userSchema(data)
        return user.save()
    },
    getByEmail: (email) => {
        return userSchema.findOne({ email })
    },
    uploadImg: (data) => {
        const user = new uploadSchema(data)
        return user.save()
    }
}

module.exports = userService;