let express = require("express");
let router = express.Router();
let {register} = require('./register/registerRoute')
let {login} = require('./login/login')
let {verifyToken} = require('./tokenVerification/verifyToken')
let {userDetails} = require('./userDetails/userDetails')
let {updateUser} = require('./userDetails/updateUser')
let {updatePassword} = require('./userDetails/userPassword')
let {search} = require('./bus/search')
let {getCities} = require('./bus/getCitites')
let {updateHistory} = require('./userDetails/updateHistory')
let {updateSeatsCount} = require('./bus/updateSeatcount')
let {getuserHistory} = require('./userDetails/getUserHistory')
let {seats} = require('./bus/bookedSeats')



router.post("/register",register);
router.post("/login",login);
router.get("/userdetails", verifyToken,userDetails);
router.put("/updateuser", verifyToken, updateUser);
router.put("/updatepassword", verifyToken,updatePassword);
router.post("/search",search);
router.get("/getcities", verifyToken,getCities);
router.post("/updatehistory", verifyToken,updateHistory);
router.put("/updateseatcount", verifyToken,updateSeatsCount);
router.get("/getuserhistory", verifyToken,getuserHistory);
router.post("/bookedseats", verifyToken, seats);



module.exports = router;
