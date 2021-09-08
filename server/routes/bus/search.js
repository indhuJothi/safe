let bus =require('../../model/bus')
let seatsAvailability = require("../../model/seatAvailability")


async function search(req, res){
    let { from, to, date } = req.body;
    let busExsist = await bus.findOne({ from: from, to: to });
    if (busExsist) {
      seatsAvailability
        .findOne({ date: date, busno: busExsist.busno })
        .then((response) => {
          if (response !== null) {
            busExsist.NoOfSeats = busExsist.NoOfSeats - response.noOfSeats;
            busExsist.bookedSeats = response.bookedSeats;
            res.send(busExsist);
          } else {
            res.status(200);
            res.send(busExsist);
          }
        });
    } else {
      res.send("error");
    }
  }


  module.exports={search}