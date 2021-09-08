let user = require('../../model/user')
let bus = require('../../model/bus')

async function updateSeatsCount (req, res){
    let { count, busnum } = req.body;
    let num = parseInt(count);
    user.findOne({ _id: req._id }).then((response) => {
      if (response) {
        bus.findOne({ busno: busnum }).then((response) => {
          if (response) {
            let reduceCount = response.NoOfSeats - num;
            bus.updateOne(
              { busno: busnum },
              { $set: { NoOfSeats: reduceCount } },
              (err) => {
                if (err) {
                  res.send("error");
                } else {
                  res.send("Updated successfully");
                }
              }
            );
          }
        });
      }
    });
  }

  module.exports ={updateSeatsCount}