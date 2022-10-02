const jwt = require('jsonwebtoken')

const dontenv = require('dotenv')
dontenv.config()



const fetchUser = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ Success: false, message: 'Action Denied..!!!' })
    }
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY)
        req.user = data.subject
        next()
    } catch (error) {
        res.status(401).send({ Success: false, message: 'Token Not found' })
    }
}

module.exports = fetchUser;