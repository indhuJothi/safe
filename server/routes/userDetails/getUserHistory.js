let user = require('../../model/user')

async function getuserHistory(req, res){
    
    user.findOne({ _id: req._id }).then((response) => {
      res.send(response.busDetails);
    });
  }

module.exports ={getuserHistory}