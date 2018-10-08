const user_details = require('../models').User_Details;


module.exports = {
	create(req, res) {
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
			//Password : bcrypt.hash(req.body.Password, 10),
		})
		.then(user_details => res.status(200).send(user_details))
		.catch(error => res.status(200).send(error)); 
	},
	retrieve(req, res) {
    return user_details
    .findById(req.params.userid)
    .then(user_details => {
      if (!user_details) {
        return res.status(200).send({
          message: 'User Not Found',
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
          id: req.params.userid,
        },
      })
    .then(user_details => {
      if (!user_details) {
        return res.status(200).send({
          message: 'Todo Not Found',
        });
      }
      return user_details
        .update({
		    FirstName : req.body.FirstName || user_details.FirstName,
			LastName : req.body.LastName || user_details.LastName,
			StreetAddress : req.body.StreetAddress || user_details.StreetAddress,
			City : req.body.City || user_details.City,
			State : req.body.State || user_details.State,
			Zipcode : req.body.Zipcode || user_details.Zipcode,
			UserName : req.body.UserName || user_details.UserName,
			Password : req.body.Password || user_details.Password,
        })
        .then(() => res.status(200).send(user_details))  // Send back the updated todo.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
},
};
		/*.find({
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
}; */
				
				
		
