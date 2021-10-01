let jwt = require("jsonwebtoken");
let dotenv = require('dotenv')
dotenv.config()

let key = process.env.SECRET


function verifyToken(req, res, next) {
  
    let token = req.header("access-token");
    if (!token) {
      res.send("We need a token");
    } else {
      jwt.verify(token, key, (err, decoded) => {
        if (err) {
          res.send("credentials are not correct");
        } else {
          req._id = decoded._id;
          next();
        }
      });
    }
  }

module.exports = {verifyToken}