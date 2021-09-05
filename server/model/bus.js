const mongoose = require('mongoose')
const busSchema = new mongoose.Schema({
    from : String,
    to:String,
    busno:String,
    busname:String,
    fare:Number,
    type:String,
    totalSeats:Number,
    NoOfSeats:Number,
    bookedSeats:[],
    button:Boolean
    
})

const Buses =mongoose.model('buses',busSchema)

module.exports=Buses