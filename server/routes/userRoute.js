let express = require("express");
let router = express.Router();
let user = require("../model/user");
let bus = require("../model/bus");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let cities = require("../model/cities");
let seatsAvailability = require("../model/seatAvailability");
let {register} = require('./register/registerRoute')
let {login} = require('./login/login')
let {verifyToken} = require('./verifyToken')
let {userDetails} = require('./userDetails/userDetails')
let {updateUser} = require('./userDetails/updateUser')
let {updatePassword} = require('./userDetails/userPassword')


router.post("/register", register);
router.post("/login",login);
router.get("/userdetails", verifyToken,userDetails);
router.put("/updateuser", verifyToken, updateUser);
router.put("/updatepassword", verifyToken,updatePassword);

router.post("/search", async (req, res, next) => {
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
});

router.get("/getcities", verifyToken, (req, res) => {
  user.findOne({ _id: req._id }).then((response) => {
    if (response) {
      cities.find({}, (err, result) => {
        if (err) {
          res.send("error");
        } else {
          res.send(result);
        }
      });
    }
  });
});

router.post("/updatehistory", verifyToken, async (req, res) => {
  let { busdata } = req.body;
  user.findOne({ _id: req._id }).then((response) => {
    if (response) {
      var historyDatas = { $addToSet: { busDetails: busdata } };
      user.updateOne({ _id: req._id }, historyDatas, (err, respond) => {
        if (err) {
          res.send("error");
        } else {
          res.send("Updated successfully");
        }
      });
    }
  });
});

router.put("/updateseatcount", verifyToken, (req, res) => {
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
});

router.get("/getuserhistory", verifyToken, (req, res) => {
  user.findOne({ _id: req._id }).then((response) => {
    res.send(response.busDetails);
  });
});

router.post("/bookedseats", verifyToken, async (req, res) => {
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
            console.log(busdetails)
            let updateSeats =
              response.noOfSeats + parseInt(busdetails.seatsCount);
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
            }
        } else {
            seatsAvailability
              .create({
                busno: busdetails.busno,
                noOfSeats: busdetails.seatsCount,
                date: busdetails.date,
                bookedSeats: busdetails.reservedSeats,
              })
              .then((result) => {
                res.send("success");
              });
          }
        });}
  });
});


module.exports = router;
