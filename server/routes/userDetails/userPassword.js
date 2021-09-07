let user = require("../../model/user");
let bcrypt = require("bcryptjs");

async function updatePassword (req, res){
    let { password, oldPassword } = req.body;
    let userData = await user.findOne({ _id: req._id });
    if (userData) {
      bcrypt.compare(oldPassword, userData.password).then(async (result) => {
        if (result) {
          let salt = 10;
          let hashPassword = await bcrypt.hash(password, salt);
          let newData = { $set: { password: hashPassword } };
          user.updateOne({ _id: req._id }, newData, (err, respond) => {
            if (err) {
              res.send("error");
            } else {
              res.send("Updated successfully");
            }
          });
        } else {
          res.send("error");
        }
      });
    } else {
      res.send("user not found");
    }
  }


  module.exports={updatePassword}