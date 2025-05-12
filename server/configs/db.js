const mongoose = require("mongoose");

const connectDb = mongoose.connect("mongodb://localhost:27017/proj").then(()=>{
    console.log("MongoDb connected")
}).catch((error)=>{
    console.log(error.message)
})

module.exports = connectDb;