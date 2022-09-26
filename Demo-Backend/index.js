const express = require('express')
const mongodb = require('./services/mongo.services')
var dotenv = require('dotenv')
const UserRouter = require('./Routes/user.routes')

var cors = require('cors')

const app = express()

app.use(cors())
dotenv.config()

// middleware
app.use(express.json())                                                                                                                                                                                                                                                                                                                                                                                     

// Routers
app.use('/api/auth',UserRouter)

console.log("process.env.MONGO_URL",process.env.MONGO_URL)

mongodb.connectDb(process.env.MONGO_URL)

app.listen(process.env.PORT, function() {
    console.log(`server is running at ${process.env.PORT}`)
})