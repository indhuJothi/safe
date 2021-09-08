let user = require('../../model/user')
let seatsAvailability = require("../../model/seatAvailability");


async function seats(req, res){
    let {busdetails} = req.body;
    user.findOne({ _id: req._id }).then((response) => {
      if (response) {
        seatsAvailability
          .findOne({
            date: busdetails.date,
            busno: busdetails.busno,
          })
          .then(async (response) => {
            if (response !== null) {
              let bool
              busdetails.reservedSeats.map(elem=>{
                        if(response.bookedSeats.includes(elem))
                        {
                          bool = true
                        }
                        else{
                          bool=false
                        }
              })
              if(bool===false){
              let updateSeats =
                response.noOfSeats + busdetails.seatsCount;
              let bookedseats = busdetails.reservedSeats;
              if (response.noOfSeats != undefined) {
                await seatsAvailability.updateOne(
                  {
                    busno: busdetails.busno,
                    date: busdetails.date,
                  },
                  {
                   $addToSet: { bookedSeats: bookedseats} ,
                   $set:{noOfSeats: updateSeats}
                  }
                );
              }}
          } else {
            
          
              seatsAvailability
                .create({
                  busno: busdetails.busno,
                  noOfSeats:busdetails.seatsCount,
                  date: busdetails.date,
                  bookedSeats: busdetails.reservedSeats,
                })
                .then((result) => {
                  res.send("success");
                });
            }
          });}
    });
  }


  module.exports ={seats}