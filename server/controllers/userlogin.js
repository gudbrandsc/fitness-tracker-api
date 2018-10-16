const user_details = require("../models").User_Details;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports = {
  login(req, res) {
    var password = req.body.password;
    var username = req.body.username;

    return user_details
      .findAll({
        where: {
          UserName: username
        }
      })
      .then(data => {
        //var jsonData = JSON.stringify(data);
        //console.log("username = " + data[data.length - 1].UserName);
        //console.log("password = " + data[data.length - 1].Password);
        var passwordIsValid = bcrypt.compareSync(
          password,
          data[data.length - 1].Password
        );

        if (!passwordIsValid)
          return res.status(401).send({ auth: false, token: null });

        var secret = "secret";
        // create the token with the secret and userId
        var token = jwt.sign({ id: data[data.length - 1].Zipcode }, secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
      })
      .catch(err => {
        console.error(err);
        res.status(400).send("Error, user could not log in");
      });
  }
};