let user = require('../../model/user')

async function updateHistory(req, res){
    
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
  }

  module.exports={updateHistory}