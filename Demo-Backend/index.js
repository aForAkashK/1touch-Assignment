const express = require('express')
var dotenv = require('dotenv').config()
const UserRouter = require('./Routes/user.routes')

var cors = require('cors')
const  mongoose  = require('mongoose')

const app = express()

app.use(express.static("uploads/"))
app.use(cors())

// middleware
app.use(express.json())

// Routers
app.use('/api/auth', UserRouter)

// console.log("process.env.MONGO_URL", process.env.MONGO_URL)


mongoose.connect(process.env.MONGO_URL, (err, res) => {
    if(err) {
        console.log(err);
    }else{
        console.log("DB is connected....");
    }
});

app.listen(process.env.PORT, function () {
    console.log(`server is running at ${process.env.PORT}`)
})