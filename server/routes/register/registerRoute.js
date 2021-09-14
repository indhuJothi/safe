let user = require('../../model/user')
let bcrypt = require("bcryptjs");

async function register(req,res){

        let { name, email, mobile, password } = req.body;
        let userId;
        let salt = 10;
        let userExsist = await user.findOne({ mobile: mobile });
        let hashPassword = await bcrypt.hash(password, salt);
        if (userExsist) {
          res.send("User alredy exsit..");
        } else {
          await user.find({}).then((res) => {
            userId = res.length + 1;
          });
          let userCreate = await user.create({
            name,
            email,
            mobile,
            userId: userId,
            password: hashPassword,
          });
          if (userCreate) {
            res.status(200);
            res.json({
              _id: userCreate._id,
              name: userCreate.name,
              email: userCreate.email,
              mobile: userCreate.mobile,
              password: userCreate.password,
              userId: userCreate.userId,
            });
          }
        }
      }


module.exports = {register}