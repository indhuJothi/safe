let user = require("../../model/user");

function updateUser(req, res){
  
    let { name, mobile, email } = req.body;
    var newDatas = { $set: { name: name, email: email, mobile: mobile } };
    user.updateMany({ _id: req._id }, newDatas, (err, respond) => {
      if (err) {
        res.send("error");
      } else {
        res.send("Updated successfully");
      }
    });
  }

  module.exports={updateUser}