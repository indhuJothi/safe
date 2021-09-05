const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name : String,
    email:String,
    mobile:Number,
    password:String,
    userId:Number,
    busDetails:[]
    
})

const postUser =mongoose.model('postUser',userSchema)

module.exports=postUser