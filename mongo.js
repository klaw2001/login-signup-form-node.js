const mongoose = require('mongoose')

mongoose
.connect("mongodb://127.0.0.1:27017/form")
.then(()=> console.log("Connected!"))

const loginScehma = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const loginCollection = mongoose.model("data",loginScehma)

module.exports = loginCollection