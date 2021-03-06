const user_details = require("../models").User_Details;
const Exercise_Table = require("../models").Exercise_Table;
const Journal = require("../models").Journal;
const follower_table = require("../models").follower_table;
const weight = require("../models").Weight;
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const pg = require("pg");
var pool = new pg.Pool();
const path = require("path");
const connectionString =
  process.env.DATABASE_URL ||
  "postgres://aaqnyekm:L4GFLLi9YRDJXcNBjKDdpvXWH1zFOdtg@pellefant.db.elephantsql.com:5432/aaqnyekm";
const Op = Sequelize.Op;
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "fitnesstracker",
  api_key: "639324582679378",
  api_secret: "q9I0Fe5f2kACdUNHbDHvfe7giME"
});
const fs = require("fs");

module.exports = {
  create(req, res) 
  {
     user_details.create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        StreetAddress: req.body.StreetAddress,
        City: req.body.City,
        State: req.body.State,
        Zipcode: req.body.Zipcode,
        UserName: req.body.UserName,
        Password: bcrypt.hashSync(req.body.Password, 8),
        ImageUrl: req.body.ImageUrl
        // var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      })
      .then(function(user_details)
      {
        weight.create({
          UserId: user_details.id,
          Weight: req.body.Weight 
        })
        res.status(201).send(user_details);
      })
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return user_details
      .findById(req.params.userid, {
        include: [
          {
            model: weight
          }
        ]
      })
      .then(user_details => {
        if (!user_details) {
          return res.status(200).send({
            message: "User Not Found"
          });
        }
        return res.status(200).send(user_details);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return user_details
      .find({
        where: {
          id: req.params.userid
        }
      })
      .then(user_details => {
        if (!user_details) {
          return res.status(200).send({
            message: "User Not found"
          });
        }
        return user_details
          .update({
            FirstName: req.body.FirstName || user_details.FirstName,
            LastName: req.body.LastName || user_details.LastName,
            StreetAddress: req.body.StreetAddress || user_details.StreetAddress,
            City: req.body.City || user_details.City,
            State: req.body.State || user_details.State,
            Zipcode: req.body.Zipcode || user_details.Zipcode,
            UserName: req.body.UserName || user_details.UserName,
            Password:
              bcrypt.hashSync(req.body.Password, 8) || user_details.Password,
            ImageUrl: req.body.ImageUrl || user_details.ImageUrl
          })
          .then(() => res.status(200).send(user_details)) // Send back the updated todo.
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  
   updateweight(req, res)
   {
    weight.create({
      UserId: req.body.UserId,
      Weight: req.body.Weight 
    })
    .then(weight_details => res.status(200).send(weight_details))
    .catch(error => res.status(400).send(error));
  },

  getweight(req, res)
  {
    weight.findAll({
      where: {
        UserId: req.params.userid
      }
      
    })
    .then(weight_details => res.status(200).send(weight_details))
    .catch(error => res.status(400).send(error));
  },

  listexerciseforuser(req, res) {
    return user_details
      .findById(req.params.userid, {
        include: [
          {
            model: Exercise_Table
          }
        ]
      })
      .then(user_details => res.status(200).send(user_details))
      .catch(error => res.status(400).send(error));
  }, 

  
listuserbyname(req, res) {
    return user_details
      .findAll({
        where: {
          [Op.or]: [
            { FirstName: { $like: req.params.name + "%" } },
            { LastName: { $like: req.params.name + "%" } }
          ],
          id: { [Op.ne]: req.params.userid }
        },
        include: [
          {
            model: follower_table,
            where: { FollowerId: req.params.userid },
            attributes: [
              [
                Sequelize.literal(
                  "CASE WHEN \"FollowerId\" is not null THEN 'True' ELSE 'False' END"
                ),
                "followsNew"
              ]
            ],
            paranoid: false,
            required: false
          }
        ]
      })
      .then(user_details => res.status(200).send(user_details))
      .catch(error => res.status(400).send(error));
  },
  uploadimage(req, res, next) {
    var buf = new Buffer(req.body.data, "base64");
    const filename = req.body.filename;
    fs.writeFileSync(req.body.filename, buf);
    console.log("file saved!");
    cloudinary.v2.uploader.upload(req.body.filename, function(error, result) {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      }
      //console.log(result);
      res.status(200).send(result.url);
    });
    fs.unlink(filename);
  },
  testreg(req, res)
  {
    find({
			where: {
				UserName: req.body.UserName
			}
		})
		.then(user_details => {
			if(user_details.length != 0){
				return res.status(200).send({
                message: 'UserName already exists',
                });
			}
			return user_details
			.create({
			FirstName : req.body.FirstName,
			LastName : req.body.LastName,
			StreetAddress : req.body.StreetAddress,
			City : req.body.City,
			State : req.body.State,
			Zipcode : req.body.Zipcode,
			UserName : req.body.UserName,
			Password : req.body.Password,
		    })
		   .then(user_details => res.status(200).send(user_details))
		   .catch(error => res.status(200).send(error));
		})
		.catch(error => res.status(200).send(error));
	 },
};

