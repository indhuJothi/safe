let user = require("../../model/user");

function updateUser(req, res){
    console.log('I am updating..')
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