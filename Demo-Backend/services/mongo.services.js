var mongoose = require('mongoose');



// console.log(process.env.MONGO_URL)

exports.connectDb = (MONGO_URL) =>{
    mongoose.connect(MONGO_URL,()=>{
        console.log("Database Connected...!!")
    })
}



