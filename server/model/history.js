const mongoose = require('mongoose')
const historySchema = new mongoose.Schema({

    userId: Number,
    bushistoryId:Number,
    busno:String,
    busname:String,
    totalfare:Number,
    mobile:Number,
    numberofseats:Number,
    date:String,
    from:String,
    to:String,
    bookedDate:String
    
})

const History =mongoose.model('history',historySchema)
module.exports=History