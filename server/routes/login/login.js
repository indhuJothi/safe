let express = require("express");
let user = require("../../model/user");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");



const login = async (req,res)=>{
       
        let { mobile, password } = req.body;
        let userAuth = await user.findOne({ mobile: mobile });
        if (userAuth) {
          await bcrypt
            .compare(password, userAuth.password)
            .then((result) => {
              if (result) {
                let token = jwt.sign(
                  { _id: userAuth._id },
                  "secret",
                  (err, token) => {
                    res.json({
                      token: token,
                      user: userAuth.name,
                    });
                    res.status(200);
                  }
                );
              } else {
                res.send("error");
              }
            })
            .catch((error) => {
              res.send("Not found");
            });
        } else {
          res.send("Not found");
        }
      }


module.exports = {login}