let user = require("../../model/user");

function userDetails(req,res)
{
   
      
      return user.findOne({ _id: req._id }).then((response) => {
          let password = response.password;
          res.send(response);
        })
    
      
}

module.exports = {userDetails}