let user = require('../../model/user')
let cities = require('../../model/cities')


async function getCities(req, res){
    
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
  }

module.exports ={getCities}