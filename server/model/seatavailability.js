const mongoose = require('mongoose')
const seatsSchema = mongoose.Schema({
    busno:String,
    noOfSeats:Number,
    date:String,
    bookedSeats:[]
})

const seatsAvailability = mongoose.model('seatsavailabilities',seatsSchema)
module.exports = seatsAvailability

